import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Providers } from "@/providers"
import { Toaster } from "sonner"
import ConditionalLayout from "@/components/layout/conditional-layout"
import { NextIntlClientProvider } from 'next-intl'
import { cookies } from 'next/headers'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "नयाँ बस्ती खुल्ला भलिबल प्रतियोगिता-२०८३ | Register Now",
    template: "%s | नयाँ बस्ती भलिबल प्रतियोगिता-२०८३",
  },
  description: "नयाँ बस्ती खुल्ला भलिबल प्रतियोगिता-२०८३ को लागि आफ्नो टिम दर्ता गर्नुहोस्। पुरस्कार रू १,४०,०००+",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('preferred-locale')?.value
  const locale = (localeCookie === 'en' || localeCookie === 'ne') ? localeCookie : 'en'

  let messages
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default
  } catch {
    messages = (await import(`@/i18n/messages/en.json`)).default
  }

  return (
    <html lang={locale === 'ne' ? 'ne' : 'en'} suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning  className="font-sans antialiased bg-gray-900 text-white">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers locale={locale}>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <Toaster 
              position="top-center" 
              richColors 
              closeButton
              toastOptions={{ duration: 3000 }}
            />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}