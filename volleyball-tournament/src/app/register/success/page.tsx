import { Suspense } from 'react'
import { Metadata } from 'next'
import SuccessContent from './success-content'

export const metadata: Metadata = {
  title: 'Registration Successful',
  description: 'Your team has been successfully registered for the Volleyball Tournament 2026.',
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 pt-20">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}