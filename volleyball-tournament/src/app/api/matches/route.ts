import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const revalidate = 60 // Cache for 60 seconds

export async function GET() {
  try {
    const tournament = await prisma.tournament.findFirst({
      where: { isActive: true, year: 2026 },
      include: {
        results: true,
      },
    })

    if (!tournament) {
      return NextResponse.json({ success: true, matches: [], results: [] })
    }

    const [matches, results] = await Promise.all([
      prisma.match.findMany({
        where: { tournamentId: tournament.id },
        orderBy: [{ matchNumber: 'asc' }],
      }),
      prisma.tournamentResult.findMany({
        where: { tournamentId: tournament.id },
        orderBy: { position: 'asc' },
      }),
    ])

    return NextResponse.json({ success: true, matches, results })
  } catch (error) {
    console.error('Get matches error:', error)
    return NextResponse.json({ success: false, error: 'Failed to load' }, { status: 500 })
  }
}