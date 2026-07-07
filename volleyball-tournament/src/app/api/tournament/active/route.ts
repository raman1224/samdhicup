import { NextResponse } from 'next/server'

// Static tournament data (no database query needed for now)
const tournamentData = {
  id: '1',
  name: 'Volleyball Championship 2026',
  year: 2026,
  registrationFee: 8000,
  prizePool: 900000,
  winnerPrize: 500000,
  runnerUpPrize: 300000,
  thirdPrize: 100000,
  startDate: '2026-06-15',
  endDate: '2026-06-20',
  registrationDeadline: '2026-06-10',
  venue: 'National Sports Stadium, Kathmandu',
  maxTeams: 32,
  maxPlayers: 10,
  minPlayers: 10,
  isActive: true,
  rules: [
    'Best of 5 sets format',
    'Rally point scoring',
    'FIVB official rules apply',
    'Team must arrive 30 minutes before match',
  ],
  contacts: {
    phone: '9803977546',
    email: 'www.bishaltolami049@gmail.com',
  },
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: tournamentData,
  })
}