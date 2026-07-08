import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton'
const RegistrationWizard = dynamic(
  () => import("@/components/registration/registration-wizard"),
  { loading: () => <LoadingSkeleton height="400px" /> }
);

export const metadata: Metadata = {
  title: 'Register Your Team',
  description: 'Register your team for the Volleyball Tournament 2026. Simple 5-step process.',
  openGraph: {
    title: 'Register Your Team | Volleyball Tournament 2026',
    description: 'Complete your team registration in 5 easy steps',
  },
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-16">
      <Suspense fallback={
        <div className="container mx-auto px-4 py-20">
          <LoadingSkeleton height="600px" />
        </div>
      }>
        <RegistrationWizard />
      </Suspense>
    </div>
  )
}