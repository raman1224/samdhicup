import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { sendOTPEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const { success } = await rateLimit(`forgot-password:${ip}`, 3, 900)
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Try again in 15 minutes.' },
        { status: 429 }
      )
    }

    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 })
    }

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Email not found' }, { status: 404 })
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    
    await prisma.oTP.create({
      data: {
        email: admin.email,
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60000),
        adminId: admin.id,
      },
    })

    await sendOTPEmail(admin.email, otp)

    return NextResponse.json({ success: true, message: 'OTP sent' })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 })
  }
}