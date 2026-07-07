// 'use client'

// import { useState, useCallback } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useDropzone } from 'react-dropzone'
// import Image from 'next/image'
// import { getOptimizedImageUrl } from '@/lib/cloudinary-client'
// import { Upload, X, Check, Loader2, ImageIcon } from 'lucide-react'
// import { toast } from 'sonner'

// interface ImageUploadProps {
//   label: string
//   onUpload: (url: string) => void
//   preview?: string | null
//   required?: boolean
// }

// export function ImageUpload({ label, onUpload, preview, required = false }: ImageUploadProps) {
//   const [uploading, setUploading] = useState(false)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null)
//   const [error, setError] = useState<string | null>(null)

//   const onDrop = useCallback(
//     async (acceptedFiles: File[]) => {
//       const file = acceptedFiles[0]
//       if (!file) return

//       // Reset error
//       setError(null)

//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setError('File must be less than 5MB')
//         toast.error('File size must be less than 5MB')
//         return
//       }

//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
//       if (!allowedTypes.includes(file.type)) {
//         setError('Please upload JPEG, PNG, or WebP')
//         toast.error('Please upload JPEG, PNG, or WebP image')
//         return
//       }

//       setUploading(true)

//       try {
//         const formData = new FormData()
//         formData.append('file', file)

//         const response = await fetch('/api/upload', {
//           method: 'POST',
//           body: formData,
//         })

//         const data = await response.json()

//         if (data.success && data.url) {
//           setPreviewUrl(data.url)
//           onUpload(data.url)
//           toast.success(`${label} uploaded successfully`)
//         } else {
//           throw new Error(data.error || 'Upload failed')
//         }
//       } catch (err) {
//         const message = err instanceof Error ? err.message : 'Upload failed'
//         setError(message)
//         toast.error(message)
//       } finally {
//         setUploading(false)
//       }
//     },
//     [label, onUpload]
//   )

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
//     },
//     maxFiles: 1,
//     disabled: uploading,
//     maxSize: 5 * 1024 * 1024,
//   })

//   const handleRemove = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     setPreviewUrl(null)
//     setError(null)
//     onUpload('')
//   }

//   return (
//     <div className="space-y-1">
//       <label className="text-xs text-gray-400 block">
//         {label}
//         {required && <span className="text-red-400 ml-1">*</span>}
//       </label>
      
//       <div
//         {...getRootProps()}
//         className={`relative rounded-lg border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
//           isDragActive
//             ? 'border-orange-500 bg-orange-500/10'
//             : error
//             ? 'border-red-500 bg-red-500/10'
//             : 'border-gray-600 hover:border-gray-500 bg-gray-900/50 hover:bg-gray-900/70'
//         } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
//       >
//         <input {...getInputProps()} />

//         <AnimatePresence mode="wait">
//           {previewUrl ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="relative aspect-square"
//             >
//               <Image
//                 src={getOptimizedImageUrl(previewUrl, { width: 400, height: 400 })}
//                 alt={label}
//                 fill
//                 className="object-cover"
//                 sizes="(max-width: 768px) 100vw, 400px"
//               />
              
//               {/* Success badge */}
//               <div className="absolute top-2 left-2">
//                 <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
//                   <Check className="w-3 h-3 text-white" />
//                 </div>
//               </div>

//               {/* Remove button */}
//               <button
//                 onClick={handleRemove}
//                 className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
//                 type="button"
//               >
//                 <X className="w-3 h-3 text-white" />
//               </button>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex flex-col items-center justify-center p-4 aspect-square"
//             >
//               {uploading ? (
//                 <div className="text-center space-y-2">
//                   <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
//                   <span className="text-xs text-gray-400 block">Uploading...</span>
//                 </div>
//               ) : isDragActive ? (
//                 <div className="text-center space-y-2">
//                   <Upload className="w-8 h-8 text-orange-400 mx-auto" />
//                   <span className="text-xs text-orange-400">Drop here</span>
//                 </div>
//               ) : (
//                 <div className="text-center space-y-2">
//                   <ImageIcon className="w-8 h-8 text-gray-500 mx-auto" />
//                   <span className="text-xs text-gray-500">Tap to upload</span>
//                   <span className="text-[10px] text-gray-600">
//                     JPEG, PNG, WebP (max 5MB)
//                   </span>
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {error && (
//         <p className="text-red-400 text-xs">{error}</p>
//       )}
//     </div>
//   )
// }



'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { getOptimizedImageUrl } from '@/lib/cloudinary-client'
import { Upload, X, Check, Loader2, ImageIcon, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadProps {
  label: string
  onUpload: (url: string) => void
  preview?: string | null
  required?: boolean
}

export function ImageUpload({ label, onUpload, preview, required = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setError(null)
      setProgress(0)

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setError('File must be less than 10MB')
        toast.error('File size must be less than 10MB')
        return
      }

      // Show preview immediately
      const localPreview = URL.createObjectURL(file)
      setPreviewUrl(localPreview)
      setUploading(true)
      setProgress(10)

      try {
        const formData = new FormData()
        formData.append('file', file)

        setProgress(30)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        setProgress(70)

        const data = await response.json()

        if (data.success && data.url) {
          setProgress(100)
          setPreviewUrl(data.url)
          onUpload(data.url)
          toast.success(`${label} uploaded successfully`)
          
          // Clean up local preview
          URL.revokeObjectURL(localPreview)
        } else if (response.status === 429) {
          // Rate limit - wait and retry once
          toast.error('Server busy, retrying...')
          await new Promise(resolve => setTimeout(resolve, 2000))
          
          // Retry once
          const retryResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
          const retryData = await retryResponse.json()
          
          if (retryData.success && retryData.url) {
            setPreviewUrl(retryData.url)
            onUpload(retryData.url)
            toast.success(`${label} uploaded successfully`)
          } else {
            throw new Error(retryData.error || 'Upload failed after retry')
          }
        } else {
          throw new Error(data.error || 'Upload failed')
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload failed'
        setError(message)
        // Revert preview on error
        setPreviewUrl(preview || null)
        toast.error(message)
      } finally {
        setUploading(false)
        setProgress(0)
      }
    },
    [label, onUpload, preview]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic', '.heif'],
    },
    maxFiles: 1,
    disabled: uploading,
    maxSize: 10 * 1024 * 1024,
  })

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreviewUrl(null)
    setError(null)
    setProgress(0)
    onUpload('')
  }

  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-400 block">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div
        {...getRootProps()}
        className={`relative rounded-lg border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
          isDragActive
            ? 'border-orange-500 bg-orange-500/10'
            : error
            ? 'border-red-500 bg-red-500/10'
            : uploading
            ? 'border-yellow-500 bg-yellow-500/10'
            : 'border-gray-600 hover:border-gray-500 bg-gray-900/50 hover:bg-gray-900/70'
        } ${uploading ? 'pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {previewUrl ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-square"
            >
              <Image
                src={previewUrl.startsWith('blob:') ? previewUrl : getOptimizedImageUrl(previewUrl, { width: 400, height: 400 })}
                alt={label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                unoptimized={previewUrl.startsWith('blob:')}
              />
              
              {/* Uploading overlay */}
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-orange-400 animate-spin mx-auto mb-2" />
                    <div className="w-32 h-1 bg-gray-700 rounded-full mx-auto">
                      <div 
                        className="h-full bg-orange-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-white mt-1 block">Uploading...</span>
                  </div>
                </div>
              )}

              {/* Success badge */}
              {!uploading && !error && (
                <div className="absolute top-2 left-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              {/* Remove button */}
              {!uploading && (
                <button
                  onClick={handleRemove}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors shadow-lg"
                  type="button"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-4 aspect-square"
            >
              {uploading ? (
                <div className="text-center space-y-2">
                  <Loader2 className="w-8 h-8 text-orange-400 animate-spin mx-auto" />
                  <span className="text-xs text-gray-400 block">Uploading...</span>
                </div>
              ) : isDragActive ? (
                <div className="text-center space-y-2">
                  <Upload className="w-8 h-8 text-orange-400 mx-auto" />
                  <span className="text-xs text-orange-400">Drop here</span>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <ImageIcon className="w-8 h-8 text-gray-500 mx-auto" />
                  <span className="text-xs text-gray-500">Tap to upload</span>
                  <span className="text-[10px] text-gray-600">
                    JPEG, PNG, WebP (max 10MB)
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  )
}