// import { NextRequest, NextResponse } from 'next/server'
// import { jwtVerify } from 'jose'

// export async function GET(request: NextRequest) {
//   try {
//     const token = request.cookies.get('admin_token')?.value

//     if (!token) {
//       return NextResponse.json({ authenticated: false }, { status: 401 })
//     }

//     const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-key-at-least-32-chars')
//     await jwtVerify(token, secret)

//     return NextResponse.json({ authenticated: true })
//   } catch {
//     return NextResponse.json({ authenticated: false }, { status: 401 })
//   }
// }


import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function GET(request: NextRequest) {
  try {
    // Check Authorization header first (sessionStorage)
    const authHeader = request.headers.get('Authorization')
    let token = authHeader?.replace('Bearer ', '')
    
    // Fallback to cookie
    if (!token) {
      token = request.cookies.get('admin_token')?.value
    }

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-key-at-least-32-chars')
    await jwtVerify(token, secret)

    return NextResponse.json({ authenticated: true })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}