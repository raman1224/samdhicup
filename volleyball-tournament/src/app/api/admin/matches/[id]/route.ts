import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { jwtVerify } from 'jose'

async function authenticate(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '') || request.cookies.get('admin_token')?.value
  if (!token) throw new Error('Unauthorized')
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret')
  await jwtVerify(token, secret)
}

// PATCH - Update match
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await authenticate(request)

    const { id } = await params
    const body = await request.json()
    const { matchNumber, round, date, time, teamAName, teamBName, teamAScore, teamBScore, winner, venue, status, notes } = body

    const match = await prisma.match.update({
      where: { id },
      data: {
        matchNumber,
        round,
        date: new Date(date),
        time,
        teamAName,
        teamBName,
        teamAScore: teamAScore ?? null,
        teamBScore: teamBScore ?? null,
        winner: winner || null,
        venue,
        status,
        notes: notes || null,
      },
    })

    return NextResponse.json({ success: true, match })
  } catch (error) {
    console.error('Update match error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE - Delete match
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await authenticate(request)

    const { id } = await params
    await prisma.match.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete match error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}