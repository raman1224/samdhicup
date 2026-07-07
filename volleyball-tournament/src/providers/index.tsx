

// 'use client'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ThemeProvider, useTheme } from 'next-themes'
// import { useState, useEffect, type ReactNode } from 'react'

// function ThemeWatcher({ children }: { children: ReactNode }) {
//   const { setTheme } = useTheme()

//   useEffect(() => {
//     const media = window.matchMedia('(prefers-color-scheme: dark)')
//     const handleChange = () => {
//       const storedTheme = localStorage.getItem('theme') // next-themes default key
//       if (!storedTheme) {
//         setTheme(media.matches ? 'dark' : 'light')
//       }
//     }
//     media.addEventListener('change', handleChange)
//     return () => media.removeEventListener('change', handleChange)
//   }, [setTheme])

//   return <>{children}</>
// }

// export function Providers({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             staleTime: 60 * 1000,
//             gcTime: 5 * 60 * 1000,
//             retry: 2,
//             refetchOnWindowFocus: false,
//           },
//         },
//       })
//   )

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider
//         attribute="class"
//         defaultTheme="dark"
//         enableSystem
//         storageKey="theme"
//       >
//         <ThemeWatcher>
//           {children}
//         </ThemeWatcher>
//       </ThemeProvider>
//     </QueryClientProvider>
//   )
// }


'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useState, useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          gcTime: 5 * 60 * 1000,
          retry: 1,
          refetchOnWindowFocus: false,
        },
      },
    })
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
        storageKey="vb-theme"
      >
        {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
      </NextThemesProvider>
    </QueryClientProvider>
  )
}