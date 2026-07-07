import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, newPassword, otp } = await request.json()
    if (!email || !newPassword || !otp) {
      return NextResponse.json({ success: false, error: 'All fields required' }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Verify OTP again
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email,
        code: otp,
        used: false,
        expiresAt: { gt: new Date() },
      },
    })

    if (!otpRecord) {
      return NextResponse.json({ success: false, error: 'Invalid or expired OTP' }, { status: 401 })
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { used: true },
    })

    // Update password
    await prisma.admin.update({
      where: { email },
      data: { password: newPassword },
    })

    return NextResponse.json({ success: true, message: 'Password reset successfully' })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to reset password' }, { status: 500 })
  }
}