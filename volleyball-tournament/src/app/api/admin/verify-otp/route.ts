// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '@/lib/prisma'
// import { SignJWT } from 'jose'

// export async function POST(request: NextRequest) {
//   try {
//     const { email, otp } = await request.json()

//     if (!email || !otp) {
//       return NextResponse.json({ success: false, error: 'Email and OTP required' }, { status: 400 })
//     }

//     const otpRecord = await prisma.oTP.findFirst({
//       where: {
//         email,
//         code: otp,
//         used: false,
//         expiresAt: { gt: new Date() }
//       },
//       orderBy: { createdAt: 'desc' }
//     })

//     if (!otpRecord) {
//       return NextResponse.json({ success: false, error: 'Invalid or expired OTP' }, { status: 401 })
//     }

//     // Mark OTP as used
//     await prisma.oTP.update({
//       where: { id: otpRecord.id },
//       data: { used: true }
//     })

//     // Create JWT token
//     const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-key-at-least-32-chars')
//     const token = await new SignJWT({ email, role: 'admin' })
//       .setProtectedHeader({ alg: 'HS256' })
//       .setExpirationTime('24h')
//       .sign(secret)

//     return NextResponse.json({ success: true, token })
//   } catch (error) {
//     console.error('Verify OTP error:', error)
//     return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 })
//   }
// }


import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { SignJWT } from 'jose'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ success: false, error: 'Email and OTP required' }, { status: 400 })
    }

    const otpRecord = await prisma.oTP.findFirst({
      where: {
        email,
        code: otp,
        used: false,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    })

    if (!otpRecord) {
      return NextResponse.json({ success: false, error: 'Invalid or expired OTP' }, { status: 401 })
    }

    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { used: true }
    })

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-key-at-least-32-chars')
    const token = await new SignJWT({ email, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret)

    // Create response with cookie
    const response = NextResponse.json({ success: true, token })
    
    // Set cookie with mobile-friendly options
    response.cookies.set('admin_token', token, {
      httpOnly: false, // Allow JS access for sessionStorage fallback
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // 'lax' works better on mobile than 'strict'
      maxAge: 86400, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 })
  }
}