'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'
import { LanguageProvider } from './language-provider'
import { type ReactNode } from 'react'

export function Providers({ children, locale }: { children: ReactNode; locale?: string }) {
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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="vb-theme"
      >
        <LanguageProvider initialLocale={locale || 'en'}>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}