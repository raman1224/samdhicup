import { memo } from 'react'

interface LoadingSkeletonProps {
  height?: string
  className?: string
}

export const LoadingSkeleton = memo(function LoadingSkeleton({ 
  height = '400px',
  className = ''
}: LoadingSkeletonProps) {
  return (
    <div 
      className={`w-full bg-gray-800/50 animate-pulse rounded-lg ${className}`}
      style={{ height }}
    >
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    </div>
  )
})