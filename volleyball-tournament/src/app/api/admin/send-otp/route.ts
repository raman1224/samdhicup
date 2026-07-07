import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { sendOTPEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const { success } = await rateLimit(`admin-login:${ip}`, 5, 900)
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Too many attempts. Try again in 15 minutes.' },
        { status: 429 }
      )
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password required' },
        { status: 400 }
      )
    }

    const admin = await prisma.admin.findUnique({ where: { email } })
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check account lock
    if (admin.lockedUntil && admin.lockedUntil > new Date()) {
      const minutes = Math.ceil((admin.lockedUntil.getTime() - Date.now()) / 60000)
      return NextResponse.json(
        { success: false, error: `Account locked. Try again in ${minutes} minutes.` },
        { status: 423 }
      )
    }

    // Verify password
    if (admin.password !== password) {
      const newFailedCount = admin.failedLogins + 1
      
      if (newFailedCount >= 5) {
        await prisma.admin.update({
          where: { id: admin.id },
          data: {
            failedLogins: newFailedCount,
            lockedUntil: new Date(Date.now() + 30 * 60000),
          },
        })
        return NextResponse.json(
          { success: false, error: 'Account locked for 30 minutes due to too many failed attempts.' },
          { status: 423 }
        )
      }

      await prisma.admin.update({
        where: { id: admin.id },
        data: { failedLogins: newFailedCount },
      })

      return NextResponse.json(
        { success: false, error: `Invalid password. ${5 - newFailedCount} attempts remaining.` },
        { status: 401 }
      )
    }

    // Reset failed logins
    await prisma.admin.update({
      where: { id: admin.id },
      data: { failedLogins: 0, lockedUntil: null },
    })

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000))
    
    // Save OTP to database
    await prisma.oTP.create({
      data: {
        email: admin.email,
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60000),
        adminId: admin.id,
      },
    })

    // Send OTP via Resend email
    const emailSent = await sendOTPEmail(admin.email, otp)

    if (!emailSent) {
      // If email fails, still log the OTP for development
      console.log(`🔑 OTP for ${email}: ${otp}`)
      return NextResponse.json({
        success: true,
        message: 'OTP displayed in console (email service unavailable)',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent to your email address',
    })
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP. Please try again.' },
      { status: 500 }
    )
  }
}


