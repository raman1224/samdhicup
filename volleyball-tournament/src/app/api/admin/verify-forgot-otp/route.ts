import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()
    if (!email || !otp) {
      return NextResponse.json({ success: false, error: 'Email and OTP required' }, { status: 400 })
    }

    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email,
        code: otp,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!otpRecord) {
      return NextResponse.json({ success: false, error: 'Invalid or expired OTP' }, { status: 401 })
    }

    return NextResponse.json({ success: true, message: 'OTP verified' })
  } catch {
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 })
  }
}