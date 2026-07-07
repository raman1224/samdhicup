import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { jwtVerify } from 'jose'

export async function GET(
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

    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        payment: true,
        players: { orderBy: { createdAt: 'asc' } },
      },
    })

    if (!team) {
      return NextResponse.json({ success: false, error: 'Team not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, team })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch team' }, { status: 500 })
  }
}