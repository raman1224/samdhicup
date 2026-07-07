'use client'

import { memo, useState, useEffect } from 'react'
import Image from 'next/image'
import { getOptimizedImageUrl } from '@/lib/cloudinary'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  onLoad?: () => void
  onError?: () => void
}

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 400,
  className = '',
  priority = false,
  objectFit = 'cover',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    if (!src) {
      setError(true)
      return
    }

    // Optimize Cloudinary URLs
    const optimizedSrc = src.includes('cloudinary.com') 
      ? getOptimizedImageUrl(src, { width, height })
      : src

    setImgSrc(optimizedSrc)
    setError(false)
  }, [src, width, height])

  if (error || !imgSrc) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">No Image</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {loading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        } ${objectFit === 'cover' ? 'object-cover' : `object-${objectFit}`}`}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        onLoad={() => {
          setLoading(false)
          onLoad?.()
        }}
        onError={() => {
          setError(true)
          setLoading(false)
          onError?.()
        }}
      />
    </div>
  )
})

export default OptimizedImage