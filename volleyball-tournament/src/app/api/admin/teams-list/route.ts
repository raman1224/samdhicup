import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { jwtVerify } from 'jose'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('admin_token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret')
    await jwtVerify(token, secret)

    const teams = await prisma.team.findMany({
      where: {
        captainEmail: { not: '' },
      },
      select: {
        id: true,
        teamName: true,
        captainEmail: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, teams })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}