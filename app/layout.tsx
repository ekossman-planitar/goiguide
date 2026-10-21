import type {Metadata} from 'next'
import localFont from 'next/font/local'
import {BookingPopup} from '@/components/booking/BookingPopup'
import './globals.css'

// REA Pangea (REA Group brand typeface): the only typeface on the site (brand guide)
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
  title: 'iGuide',
  description: 'Accurate floor plans and 3D virtual tours from a single scan.',
  // Google Search Console verification tag, on every page of the live site
  verification: {google: 'CWS2Ax14FDHr2m7YFeuvcLwPorLoVtLHyO5XWupBsmU'},
}

// Google Tag Manager (container from Evan, 2026-10-14). Only fires on goiguide.com, so the
// Vercel URLs, previews and local builds never send data. It switches on by itself once DNS
// points goiguide.com here. The noscript fallback can't check the domain, but only runs for
// visitors with JavaScript turned off.
const GTM_ID = 'GTM-TQ7GWZ3'
const loadGtm = process.env.NODE_ENV === 'production'
const GTM_HOSTS = ['goiguide.com', 'www.goiguide.com']
const gtmSnippet = `if(${JSON.stringify(GTM_HOSTS)}.indexOf(location.hostname)>-1)(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={`${pangea.variable} h-full antialiased`}>
      <head>
        {/* Google Tag Manager */}
        {loadGtm && <script dangerouslySetInnerHTML={{__html: gtmSnippet}} />}
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {/* Google Tag Manager (noscript) */}
        {loadGtm && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} title="Google Tag Manager" height="0" width="0" style={{display: 'none', visibility: 'hidden'}} />
          </noscript>
        )}
        {children}
        {/* Book-a-demo pop-up for every .openCalendly button (ported from live) */}
        <BookingPopup />
      </body>
    </html>
  )
}
