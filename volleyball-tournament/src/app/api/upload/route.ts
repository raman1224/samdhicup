
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