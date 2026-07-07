
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { jwtVerify } from 'jose'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret')
    await jwtVerify(token, secret)

    const { id } = await params
    const body = await request.json().catch(() => ({ reason: 'No reason provided' }))
    const reason = body.reason || 'No reason provided'

    const team = await prisma.team.update({
      where: { id },
      data: { 
        status: 'rejected',
        rejectionReason: reason,
      },
      select: { teamName: true, captainEmail: true },
    })

    // Update payment status
    await prisma.payment.updateMany({
      where: { teamId: id },
      data: { 
        status: 'rejected',
        rejectionReason: reason,
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: `Team "${team.teamName}" rejected` 
    })
  } catch (error) {
    console.error('Reject error:', error)
    return NextResponse.json({ success: false, error: 'Failed to reject' }, { status: 500 })
  }
}