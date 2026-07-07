'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar'
import Footer from './footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if current path is admin
  const isAdmin = pathname?.startsWith('/admin')

  // Admin pages - no public navbar, no public footer
  if (isAdmin) {
    return <>{children}</>
  }

  // Public pages - show navbar and footer
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}