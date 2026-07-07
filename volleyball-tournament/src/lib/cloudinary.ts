import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadToCloudinary(
  file: Buffer | File,
  folder: string,
  options: {
    publicId?: string
    transformation?: string
  } = {}
): Promise<{ url: string; publicId: string }> {
  try {
    const bytes = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file
    
    // Create base64 string for upload
    const base64 = bytes.toString('base64')
    const dataURI = `data:image/jpeg;base64,${base64}`

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: `volleyball-tournament/${folder}`,
      public_id: options.publicId,
      transformation: [
        { quality: 'auto:good', fetch_format: 'auto' },
        { width: 800, height: 800, crop: 'limit' },
        ...(options.transformation ? [{ raw_transformation: options.transformation }] : []),
      ],
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      max_file_size: 5000000, // 5MB
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

// Generate optimized image URL with transformations
export function getOptimizedImageUrl(url: string, options: {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'avif'
} = {}): string {
  if (!url.includes('cloudinary.com')) return url

  const { width = 800, height = 800, quality = 80, format = 'auto' } = options
  
  const transformations = [
    `q_${quality}`,
    `f_${format}`,
    width && `w_${width}`,
    height && `h_${height}`,
    'c_limit',
  ].filter(Boolean).join(',')

  return url.replace('/upload/', `/upload/${transformations}/`)
}