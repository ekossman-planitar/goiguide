import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

// REA Pangea (REA Group brand typeface) for headlines, as on customer.realestate.com.au
const pangea = localFont({
  src: [
    {path: './fonts/REAPangea-Medium.woff2', weight: '500'},
    {path: './fonts/REAPangea-SemiBold.woff2', weight: '600'},
    {path: './fonts/REAPangea-Bold.woff2', weight: '700'},
  ],
  variable: '--font-pangea',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

export const metadata: Metadata = {
  // Makes relative canonical and Open Graph URLs absolute
  metadataBase: new URL('https://goiguide.com'),
  title: 'iGUIDE',
  description: 'Accurate floor plans and 3D virtual tours from a single scan.',
  // Google Search Console verification tag, on every page of the live site
  verification: {google: 'CWS2Ax14FDHr2m7YFeuvcLwPorLoVtLHyO5XWupBsmU'},
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${pangea.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  )
}
