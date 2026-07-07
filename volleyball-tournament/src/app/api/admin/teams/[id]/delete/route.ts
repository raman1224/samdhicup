import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { jwtVerify } from 'jose'

export async function DELETE(
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

    // Delete payment first
    await prisma.payment.deleteMany({ where: { teamId: id } })
    // Delete players
    await prisma.player.deleteMany({ where: { teamId: id } })
    // Delete team
    await prisma.team.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Team deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}