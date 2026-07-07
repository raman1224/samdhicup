import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { jwtVerify } from 'jose'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret')
    const { payload } = await jwtVerify(token, secret)
    const email = payload.email as string

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: 'All fields required' }, { status: 400 })
    }

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin || admin.password !== currentPassword) {
      return NextResponse.json({ success: false, error: 'Current password is incorrect' }, { status: 400 })
    }

    await prisma.admin.update({
      where: { email },
      data: { password: newPassword },
    })

    return NextResponse.json({ success: true, message: 'Password updated successfully' })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update password' }, { status: 500 })
  }
}