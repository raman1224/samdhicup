

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