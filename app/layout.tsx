import type { Metadata } from 'next'
import { Inter, Yellowtail } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ConfettiProvider } from '@/components/providers/ConfettiProvider'
import { siteConfig } from '@/config/site'
import { localization } from '@/lib/auth'
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png"
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="ja">
        <body className={inter.className}>
          <ConfettiProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
