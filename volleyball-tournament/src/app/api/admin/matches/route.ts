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

// GET - List all matches
export async function GET(request: NextRequest) {
  try {
    await authenticate(request)

    const tournament = await prisma.tournament.findFirst({
      where: { isActive: true, year: 2026 },
    })

    if (!tournament) {
      return NextResponse.json({ success: true, matches: [] })
    }

    const matches = await prisma.match.findMany({
      where: { tournamentId: tournament.id },
      orderBy: [{ matchNumber: 'asc' }],
    })

    return NextResponse.json({ success: true, matches })
  } catch {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
}

// POST - Create new match
export async function POST(request: NextRequest) {
  try {
    await authenticate(request)

    const body = await request.json()
    const { matchNumber: requestedMatchNumber, round, date, time, teamAName, teamBName, teamAScore, teamBScore, winner, venue, status, notes } = body
    let matchNumber = requestedMatchNumber

    if (!teamAName || !teamBName || !date) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Find tournament
    let tournament = await prisma.tournament.findFirst({
      where: { isActive: true, year: 2026 },
    })

    if (!tournament) {
      tournament = await prisma.tournament.create({
        data: {
          year: 2026,
          name: 'नयाँ बस्ती खुल्ला भलिबल प्रतियोगिता-२०८३',
          registrationFee: 7000,
          maxPlayers: 10,
          isActive: true,
          venue: 'चउरी देउराली गा.पा, देउराली -०६, नयाँ बस्ती, काभ्रपलाञ्चोक',
          startDate: new Date('2026-10-16'),
          endDate: new Date('2026-10-19'),
          prizePool: 140000,
        },
      })
    }

    // Check duplicate match number
    const existing = await prisma.match.findFirst({
      where: { matchNumber, tournamentId: tournament.id },
    })

    if (existing) {
      // Auto-increment if duplicate
      const maxMatch = await prisma.match.findFirst({
        where: { tournamentId: tournament.id },
        orderBy: { matchNumber: 'desc' },
      })
      matchNumber = (maxMatch?.matchNumber || 0) + 1
    }

    const match = await prisma.match.create({
      data: {
        matchNumber,
        round: round || 'Group Stage',
        date: new Date(date),
        time: time || '9:00 AM',
        teamAName,
        teamBName,
        teamAScore: teamAScore ?? null,
        teamBScore: teamBScore ?? null,
        winner: winner || null,
        venue: venue || 'चउरी देउराली, नयाँ बस्ती',
        status: status || 'upcoming',
        notes: notes || null,
        tournamentId: tournament.id,
      },
    })

    return NextResponse.json({ success: true, match })
  } catch (error) {
    console.error('Create match error:', error)
    return NextResponse.json({ success: false, error: 'Failed to create match' }, { status: 500 })
  }
}