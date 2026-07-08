import { NextResponse } from 'next/server'

// Static tournament data (no database query needed for now)
const tournamentData = {
  id: '1',
  name: 'Volleyball Championship 2083',
  year: 2083,
  registrationFee: 7000,
  prizePool: 140000,
  winnerPrize: 80000,
  runnerUpPrize: 40000,
  thirdPrize: 20000,
  startDate: '2083-05-29',
  endDate: '2083-06-02',
  registrationDeadline: '2083-05-25',
  venue: 'चउरी देउराली गा.पा, देउराली -०६, नयाँ बस्ती, काभ्रपलाञ्चोक',
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