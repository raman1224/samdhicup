// // import { NextRequest, NextResponse } from 'next/server'
// // import { uploadToCloudinary } from '@/lib/cloudinary-server'
// // import { rateLimit } from '@/lib/rate-limit'

// // export const runtime = 'nodejs'
// // export const dynamic = 'force-dynamic'

// // export async function POST(request: NextRequest) {
// //   try {
// //     // Rate limiting
// //     const ip = request.headers.get('x-forwarded-for') || 'unknown'
// //     const { success } = await rateLimit(`upload:${ip}`, 10, 60)

// //     if (!success) {
// //       return NextResponse.json(
// //         { success: false, error: 'Too many uploads. Please try again later.' },
// //         { status: 429 }
// //       )
// //     }

// //     const formData = await request.formData()
// //     const file = formData.get('file') as File

// //     if (!file) {
// //       return NextResponse.json(
// //         { success: false, error: 'No file provided' },
// //         { status: 400 }
// //       )
// //     }

// //     // Validate file size (5MB max)
// //     if (file.size > 5 * 1024 * 1024) {
// //       return NextResponse.json(
// //         { success: false, error: 'File size must be less than 5MB' },
// //         { status: 400 }
// //       )
// //     }

// //     // Validate file type
// //     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
// //     if (!allowedTypes.includes(file.type)) {
// //       return NextResponse.json(
// //         { success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
// //         { status: 400 }
// //       )
// //     }

// //     // Convert File to Buffer for server-side Cloudinary upload
// //     const bytes = await file.arrayBuffer()
// //     const buffer = Buffer.from(bytes)

// //     // Upload to Cloudinary
// //     const result = await uploadToCloudinary(buffer, 'registrations', {
// //       publicId: `upload-${Date.now()}`,
// //     })

// //     return NextResponse.json({
// //       success: true,
// //       url: result.url,
// //       publicId: result.publicId,
// //     })
// //   } catch (error) {
// //     console.error('Upload error:', error)
// //     return NextResponse.json(
// //       { success: false, error: 'Upload failed. Please try again.' },
// //       { status: 500 }
// //     )
// //   }
// // }



// import { NextRequest, NextResponse } from 'next/server'
// import { uploadToCloudinary } from '@/lib/cloudinary-server'

// export const runtime = 'nodejs'
// export const dynamic = 'force-dynamic'

// // Increase body size limit for larger images
// export const maxDuration = 60 // 60 seconds timeout

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData()
//     const file = formData.get('file') as File

//     if (!file) {
//       return NextResponse.json(
//         { success: false, error: 'No file provided' },
//         { status: 400 }
//       )
//     }

//     // Validate file size (10MB max for better flexibility)
//     if (file.size > 10 * 1024 * 1024) {
//       return NextResponse.json(
//         { success: false, error: 'File size must be less than 10MB' },
//         { status: 400 }
//       )
//     }

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
//     if (!allowedTypes.includes(file.type)) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid file type. Only JPEG, PNG, WebP, and HEIC are allowed.' },
//         { status: 400 }
//       )
//     }

//     // Compress image before upload for faster processing
//     const bytes = await file.arrayBuffer()
//     const buffer = Buffer.from(bytes)

//     // Upload to Cloudinary with optimization
//     const result = await uploadToCloudinary(buffer, 'registrations', {
//       publicId: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
//     })

//     return NextResponse.json({
//       success: true,
//       url: result.url,
//       publicId: result.publicId,
//     })
//   } catch (error) {
//     console.error('Upload error:', error)
//     return NextResponse.json(
//       { success: false, error: 'Upload failed. Please try again.' },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
      'image/heic', 'image/heif', 'image/avif',
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Use JPEG, PNG, WebP, or HEIC.' },
        { status: 400 }
      )
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, 'registrations', {
      publicId: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    })

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Upload failed. Please try again.' },
      { status: 500 }
    )
  }
}