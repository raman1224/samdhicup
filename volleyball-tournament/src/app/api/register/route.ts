import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { registrationSchema } from '@/schemas/registration'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30 // 30 seconds timeout

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const dataStr = formData.get('data') as string

    if (!dataStr) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    const data = JSON.parse(dataStr)
    const validated = registrationSchema.parse(data)

    // Find or create active tournament (no transaction needed)
    let tournament = await prisma.tournament.findFirst({
      where: { isActive: true, year: 2026 },
    })

    if (!tournament) {
      tournament = await prisma.tournament.create({
        data: {
          year: 2026,
          name: 'Volleyball Championship 2026',
          registrationFee: 8000,
          maxPlayers: 10,
          isActive: true,
          venue: 'National Stadium, Kathmandu',
          startDate: new Date('2026-06-15'),
          endDate: new Date('2026-06-20'),
        },
      })
    }

    // Generate registration ID
    const teamCount = await prisma.team.count({
      where: { tournamentId: tournament.id },
    })
    const registrationId = `VOL2026-${String(teamCount + 1).padStart(4, '0')}`

    // Create team
    const team = await prisma.team.create({
      data: {
        registrationId,
        teamName: validated.team.teamName,
        teamLogo: validated.team.teamLogo || null,
        captainName: validated.team.captainName,
        captainPhone: validated.team.captainPhone,
        captainEmail: validated.team.captainEmail,
        district: validated.team.district,
        municipality: validated.team.municipality,
        address: validated.team.address,
        tournamentId: tournament.id,
        status: 'pending',
      },
    })

    // Create payment
    await prisma.payment.create({
      data: {
        transactionId: validated.payment.transactionId,
        paymentMethod: validated.payment.paymentMethod,
        amount: validated.payment.amount,
        screenshot: validated.payment.screenshot || null,
        status: 'pending',
        teamId: team.id,
      },
    })

    // Create players
    if (validated.players?.length > 0) {
      const playersData = validated.players
        .filter((p) => p.fullName && p.position)
        .map((player) => ({
          fullName: player.fullName,
          dateOfBirth: new Date(player.dateOfBirth),
          age: player.age || 0,
          phoneNumber: player.phoneNumber,
          address: player.address,
          position: player.position,
          jerseyName: player.jerseyName || null,
          jerseyNumber: player.jerseyNumber || null,
          jerseySize: player.jerseySize || null,
          passportPhoto: player.passportPhoto || null,
          citizenshipFront: player.citizenshipFront || null,
          citizenshipBack: player.citizenshipBack || null,
          teamId: team.id,
        }))

      // Create players in batches of 5 to avoid timeout
      for (let i = 0; i < playersData.length; i += 5) {
        const batch = playersData.slice(i, i + 5)
        await prisma.player.createMany({
          data: batch,
        })
      }
    }

    return NextResponse.json({
      success: true,
      registrationId: registrationId,
      message: 'Registration submitted successfully! Check your email for confirmation.',
    })
  } catch (error) {
    console.error('Registration error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}