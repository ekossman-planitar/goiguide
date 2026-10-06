import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  // Makes relative canonical and Open Graph URLs absolute
  metadataBase: new URL('https://goiguide.com'),
  title: 'iGUIDE',
  description: 'Accurate floor plans and 3D virtual tours from a single scan.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  )
}
