import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { jwtVerify } from 'jose'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check auth
    const token = request.cookies.get('admin_token')?.value
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret')
    await jwtVerify(token, secret)

    const { id } = await params

    // Update team status
    const team = await prisma.team.update({
      where: { id },
      data: { status: 'approved' },
      select: { teamName: true, captainEmail: true, registrationId: true },
    })

    // Also approve payment if exists
    await prisma.payment.updateMany({
      where: { teamId: id },
      data: { status: 'approved' },
    })

    return NextResponse.json({ 
      success: true, 
      message: `Team "${team.teamName}" approved successfully` 
    })
  } catch (error) {
    console.error('Approve error:', error)
    return NextResponse.json({ success: false, error: 'Failed to approve' }, { status: 500 })
  }
}