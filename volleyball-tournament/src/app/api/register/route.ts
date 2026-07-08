// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '@/lib/prisma'
// import { registrationSchema } from '@/schemas/registration'

// export const runtime = 'nodejs'
// export const dynamic = 'force-dynamic'
// export const maxDuration = 30 // 30 seconds timeout

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData()
//     const dataStr = formData.get('data') as string

//     if (!dataStr) {
//       return NextResponse.json(
//         { success: false, error: 'No data provided' },
//         { status: 400 }
//       )
//     }

//     const data = JSON.parse(dataStr)
//     const validated = registrationSchema.parse(data)

//     // Find or create active tournament (no transaction needed)
//     let tournament = await prisma.tournament.findFirst({
//       where: { isActive: true, year: 2026 },
//     })

//     if (!tournament) {
//       tournament = await prisma.tournament.create({
//         data: {
//           year: 2026,
//           name: 'नयाँ बस्ती खुल्ला भलिबल प्रतियोगिता-२०८३',
//           registrationFee: 7000,
//           maxPlayers: 10,
//           isActive: true,
//           venue: 'Kavrepalanchok, Nepal',
//           startDate: new Date('2026-06-26'),
//           endDate: new Date('2026-10-30'),
//         },
//       })
//     }

//     // Generate registration ID
//     const teamCount = await prisma.team.count({
//       where: { tournamentId: tournament.id },
//     })
//     const registrationId = `VOL2026-${String(teamCount + 1).padStart(4, '0')}`

//     // Create team
//     const team = await prisma.team.create({
//       data: {
//         registrationId,
//         teamName: validated.team.teamName,
//         teamLogo: validated.team.teamLogo || null,
//         captainName: validated.team.captainName,
//         captainPhone: validated.team.captainPhone,
//         captainEmail: validated.team.captainEmail,
//         district: validated.team.district,
//         municipality: validated.team.municipality,
//         address: validated.team.address,
//         tournamentId: tournament.id,
//         status: 'pending',
//       },
//     })

//     // Create payment
//     await prisma.payment.create({
//       data: {
//         transactionId: validated.payment.transactionId,
//         paymentMethod: validated.payment.paymentMethod,
//         amount: validated.payment.amount,
//         screenshot: validated.payment.screenshot || null,
//         status: 'pending',
//         teamId: team.id,
//       },
//     })

//     // Create players
//     if (validated.players?.length > 0) {
//       const playersData = validated.players
//         .filter((p) => p.fullName && p.position)
//         .map((player) => ({
//           fullName: player.fullName,
//           dateOfBirth: new Date(player.dateOfBirth),
//           age: player.age || 0,
//           phoneNumber: player.phoneNumber,
//           address: player.address,
//           position: player.position,
//           jerseyName: player.jerseyName || null,
//           jerseyNumber: player.jerseyNumber || null,
//           jerseySize: player.jerseySize || null,
//           passportPhoto: player.passportPhoto || null,
//           citizenshipFront: player.citizenshipFront || null,
//           citizenshipBack: player.citizenshipBack || null,
//           teamId: team.id,
//         }))

//       // Create players in batches of 5 to avoid timeout
//       for (let i = 0; i < playersData.length; i += 5) {
//         const batch = playersData.slice(i, i + 5)
//         await prisma.player.createMany({
//           data: batch,
//         })
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       registrationId: registrationId,
//       message: 'Registration submitted successfully! Check your email for confirmation.',
//     })
//   } catch (error) {
//     console.error('Registration error:', error)

//     if (error instanceof Error) {
//       return NextResponse.json(
//         { success: false, error: error.message },
//         { status: 400 }
//       )
//     }

//     return NextResponse.json(
//       { success: false, error: 'Registration failed. Please try again.' },
//       { status: 500 }
//     )
//   }
// }



import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { registrationSchema } from '@/schemas/registration'
import { sendRegistrationEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

// Generate unique registration ID
async function generateUniqueId(tournamentId: string): Promise<string> {
  let isUnique = false
  let registrationId = ''
  let attempts = 0
  
  while (!isUnique && attempts < 10) {
    attempts++
    
    // Use timestamp + random for uniqueness
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    registrationId = `VOL2026-${timestamp}${random}`
    
    // Check if this ID already exists
    const existing = await prisma.team.findUnique({
      where: { registrationId },
      select: { id: true },
    })
    
    if (!existing) {
      isUnique = true
    }
  }
  
  if (!isUnique) {
    // Fallback: use UUID
    const uuid = crypto.randomUUID().split('-')[0].toUpperCase()
    registrationId = `VOL2026-${uuid}`
  }
  
  return registrationId
}

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

    // Check if email already registered
    const existingTeam = await prisma.team.findFirst({
      where: { captainEmail: validated.team.captainEmail },
      select: { id: true, registrationId: true },
    })

    if (existingTeam) {
      return NextResponse.json(
        { 
          success: false, 
          error: `This email has already registered a team (${existingTeam.registrationId}). Please use a different email.` 
        },
        { status: 409 }
      )
    }

    // Find or create active tournament
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

    // Generate unique registration ID
    const registrationId = await generateUniqueId(tournament.id)

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

    // Create players in batches
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

    if (playersData.length > 0) {
      for (let i = 0; i < playersData.length; i += 5) {
        await prisma.player.createMany({
          data: playersData.slice(i, i + 5),
        })
      }
    }

    // Send confirmation email
    try {
      await sendRegistrationEmail(
        validated.team.captainEmail,
        validated.team.teamName,
        registrationId
      )
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
    }

    return NextResponse.json({
      success: true,
      registrationId,
      message: 'Registration submitted successfully! Check your email for confirmation.',
    })
  } catch (error) {
    console.error('Registration error:', error)

    // Handle Prisma unique constraint error
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'This team or email has already been registered. Please use a different email.' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}