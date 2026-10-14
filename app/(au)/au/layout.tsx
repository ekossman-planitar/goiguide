import type {Metadata} from 'next'
import {AuOfferBar} from '@/components/au/AuOfferBar'
import {SiteFooter} from '@/components/layout/SiteFooter'
import {SiteHeader} from '@/components/layout/SiteHeader'
import {auNav} from '@/lib/navigation'

export const metadata: Metadata = {
  openGraph: {locale: 'en_AU'},
}

/** Australia section: same look as the global site, with its own navigation. */
export default function AuLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <AuOfferBar />
      <SiteHeader nav={auNav} homeHref="/au" />
      <main className="flex-1" lang="en-AU">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
