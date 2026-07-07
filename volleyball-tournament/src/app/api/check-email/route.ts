import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ exists: false })
    }

    const existing = await prisma.team.findFirst({
      where: { captainEmail: email },
      select: { id: true },
    })

    return NextResponse.json({ exists: !!existing })
  } catch {
    return NextResponse.json({ exists: false })
  }
}