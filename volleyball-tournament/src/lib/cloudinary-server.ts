
import 'server-only'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  options: {
    publicId?: string
  } = {}
): Promise<{ url: string; publicId: string }> {
  try {
    // Convert buffer to base64
    const base64 = buffer.toString('base64')
    const dataURI = `data:image/jpeg;base64,${base64}`

    // Upload with optimization for faster processing
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: `volleyball-tournament/${folder}`,
      public_id: options.publicId,
      // Optimize for faster upload
      transformation: [
        { quality: 'auto:good', fetch_format: 'auto' },
        { width: 800, height: 800, crop: 'limit' },
      ],
      resource_type: 'image',
      // Smaller chunk size for faster uploads
      chunk_size: 6000000, // 6MB chunks
      timeout: 30000, // 30 second timeout
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    console.error('Cloudinary upload failed:', error)
    throw new Error('Failed to upload image')
  }
}


export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error)
  }
}

export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'avif'
  } = {}
): string {
  if (!url || !url.includes('cloudinary.com')) return url || ''

  const { width = 800, height = 800, quality = 80, format = 'auto' } = options

  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    width && `w_${width}`,
    height && `h_${height}`,
    'c_limit',
  ]
    .filter(Boolean)
    .join(',')

  return url.replace('/upload/', `/upload/${transformations}/`)
}