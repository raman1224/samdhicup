
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

export function getCloudinaryPublicId(url: string): string | null {
  if (!url || !url.includes('cloudinary.com')) return null
  
  try {
    const parts = url.split('/')
    const filename = parts[parts.length - 1]
    return filename.split('.')[0]
  } catch {
    return null
  }
}