


import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Providers } from "@/providers"
import { Toaster } from "sonner"
import ConditionalLayout from "@/components/layout/conditional-layout"

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
    default: "Volleyball Tournament 2026 | Register Your Team Now",
    template: "%s | Volleyball Tournament 2026",
  },
  description: "Register your team for the biggest volleyball tournament in Nepal.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('vb-theme');
                  if (!theme) {
                    theme = 'dark';
                    localStorage.setItem('vb-theme', 'dark');
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-gray-900 text-white">
        <Providers>
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
      </body>
    </html>
  )
}