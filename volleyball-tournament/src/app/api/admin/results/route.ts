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

export async function GET(request: NextRequest) {
  try {
    await authenticate(request)
    const tournament = await prisma.tournament.findFirst({
      where: { isActive: true, year: 2026 },
    })
    if (!tournament) return NextResponse.json({ success: true, results: [] })

    const results = await prisma.tournamentResult.findMany({
      where: { tournamentId: tournament.id },
      orderBy: { position: 'asc' },
    })
    return NextResponse.json({ success: true, results })
  } catch {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
}
export async function POST(request: NextRequest) {
  try {
    await authenticate(request)
    const { results } = await request.json()

    let tournament = await prisma.tournament.findFirst({
      where: { isActive: true, year: 2026 },
    })

    if (!tournament) {
      tournament = await prisma.tournament.create({
        data: {
          year: 2026,
          name: 'नयाँ बस्ती खुल्ला भलिबल प्रतियोगिता-२०८३',
          registrationFee: 8000,
          maxPlayers: 10,
          isActive: true,
          venue: 'चउरी देउराली',
          startDate: new Date('2026-10-16'),
          endDate: new Date('2026-10-19'),
          prizePool: 160000,
        },
      })
    }

    // Delete old results
    await prisma.tournamentResult.deleteMany({
      where: { tournamentId: tournament.id },
    })

    // Create results one by one (safer than createMany)
    const cleanResults = (results || []).filter((r: any) => r.teamName?.trim())

    for (let i = 0; i < cleanResults.length; i++) {
      const r = cleanResults[i]
      await prisma.tournamentResult.create({
        data: {
          position: i + 1,
          positionLabel: r.positionLabel || ['Champion', 'Runner Up', 'Third Place'][i],
          teamName: r.teamName.trim(),
          medalType: r.medalType || ['gold', 'silver', 'bronze'][i],
          prizeAmount: r.prizeAmount ? parseInt(r.prizeAmount.toString()) : null,
          notes: r.notes?.trim() || null,
          tournamentId: tournament.id,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save results error:', error)
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 })
  }
}