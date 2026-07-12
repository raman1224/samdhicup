// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter, usePathname } from 'next/navigation'
// import Sidebar from '@/components/admin/sidebar'
// import Header from '@/components/admin/header'
// import { Loader2 } from 'lucide-react'

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const [authenticated, setAuthenticated] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const router = useRouter()
//   const pathname = usePathname()

//   useEffect(() => {
//     // Don't check auth for login page
//     if (pathname === '/admin/login') {
//       setLoading(false)
//       return
//     }

//     // const checkAuth = async () => {
//     //   try {
//     //     const token = document.cookie.includes('admin_token')
//     //     if (!token) {
//     //       router.push('/admin/login')
//     //       return
//     //     }

//     //     const res = await fetch('/api/admin/check-auth')
//     //     const data = await res.json()
        
//     //     if (data.authenticated) {
//     //       setAuthenticated(true)
//     //     } else {
//     //       document.cookie = 'admin_token=; path=/; max-age=0'
//     //       router.push('/admin/login')
//     //     }
//     //   } catch {
//     //     router.push('/admin/login')
//     //   } finally {
//     //     setLoading(false)
//     //   }
//     // }
// const checkAuth = async () => {
//   try {
//     // Check both cookie and sessionStorage
//     const sessionToken = sessionStorage.getItem('admin_token')
//     const cookieToken = document.cookie.includes('admin_token')
    
//     if (!sessionToken && !cookieToken) {
//       router.push('/admin/login')
//       return
//     }

//     // Use session token first, fallback to cookie
//     const token = sessionToken || ''

//     const res = await fetch('/api/admin/check-auth', {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       credentials: 'include',
//     })
//     const data = await res.json()
    
//     if (data.authenticated) {
//       setAuthenticated(true)
//     } else {
//       sessionStorage.removeItem('admin_token')
//       document.cookie = 'admin_token=; path=/; max-age=0'
//       router.push('/admin/login')
//     }
//   } catch {
//     router.push('/admin/login')
//   } finally {
//     setLoading(false)
//   }
// }
//     checkAuth()
//   }, [router, pathname])

//   // Close sidebar on route change (mobile)
//   useEffect(() => {
//     setSidebarOpen(false)
//   }, [pathname])

//   if (loading && pathname !== '/admin/login') {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-10 h-10 text-orange-500 animate-spin mx-auto mb-4" />
//           <p className="text-gray-400">Loading admin panel...</p>
//         </div>
//       </div>
//     )
//   }

//   // Login page - no sidebar
//   if (pathname === '/admin/login') {
//     return <>{children}</>
//   }

//   if (!authenticated) {
//     return null
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-900">
//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed lg:sticky top-0 left-0 z-50 h-screen
//         transform transition-transform duration-200
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//         lg:translate-x-0
//       `}>
//         <Sidebar onClose={() => setSidebarOpen(false)} />
//       </div>

//       {/* Main */}
//       <div className="flex-1 flex flex-col min-h-screen min-w-0">
//         <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
//         <main className="flex-1 p-4 md:p-6 overflow-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/sidebar'
import Header from '@/components/admin/header'
import { Loader2 } from 'lucide-react'

const AUTH_CACHE_KEY = 'admin_auth_cache'
const AUTH_CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const checkAuth = useCallback(async () => {
    // Login page - no check needed
    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }

    try {
      // 1. Check cached auth first (fast, survives app switching)
      const cached = sessionStorage.getItem(AUTH_CACHE_KEY)
      if (cached) {
        const { authenticated: isAuth, timestamp } = JSON.parse(cached)
        if (isAuth && (Date.now() - timestamp) < AUTH_CACHE_DURATION) {
          setAuthenticated(true)
          setLoading(false)
          return
        }
      }

      // 2. Get token from multiple sources
      let token = sessionStorage.getItem('admin_token')
      if (!token) {
        // Try cookie
        const cookieMatch = document.cookie.match(/admin_token=([^;]+)/)
        token = cookieMatch ? cookieMatch[1] : null
      }
      
      if (!token) {
        // Try localStorage as last resort
        token = localStorage.getItem('admin_token')
      }

      if (!token) {
        // No token found anywhere
        sessionStorage.removeItem(AUTH_CACHE_KEY)
        localStorage.removeItem('admin_token')
        sessionStorage.removeItem('admin_token')
        document.cookie = 'admin_token=; path=/; max-age=0'
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
        setLoading(false)
        return
      }

      // 3. Verify token with server
      const res = await fetch('/api/admin/check-auth', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
        credentials: 'include',
      })
      
      const data = await res.json()

      if (data.authenticated) {
        // Cache the auth state
        sessionStorage.setItem(AUTH_CACHE_KEY, JSON.stringify({
          authenticated: true,
          timestamp: Date.now(),
        }))
        // Ensure token is in all storage places
        sessionStorage.setItem('admin_token', token)
        localStorage.setItem('admin_token', token)
        setAuthenticated(true)
      } else {
        // Clear everything on failed auth
        sessionStorage.removeItem(AUTH_CACHE_KEY)
        sessionStorage.removeItem('admin_token')
        localStorage.removeItem('admin_token')
        document.cookie = 'admin_token=; path=/; max-age=0'
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
      }
    } catch (err) {
      // Network error - use cached auth if available
      const cached = sessionStorage.getItem(AUTH_CACHE_KEY)
      if (cached) {
        const { authenticated: isAuth } = JSON.parse(cached)
        if (isAuth) {
          setAuthenticated(true)
        }
      }
    } finally {
      setLoading(false)
    }
  }, [router, pathname])

  // Check auth on mount and when pathname changes
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Only re-check auth when coming back from another app (visibility change)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && authenticated) {
        // Refresh auth cache timestamp
        sessionStorage.setItem(AUTH_CACHE_KEY, JSON.stringify({
          authenticated: true,
          timestamp: Date.now(),
        }))
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [authenticated])

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Loading state
  if (loading && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  // Login page - no sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Not authenticated
  if (authenticated === false) {
    return null
  }

  // Still loading
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    )
  }

  // Authenticated - show dashboard
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}