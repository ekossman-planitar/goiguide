import type {Metadata} from 'next'
import {AuOfferBar} from '@/components/au/AuOfferBar'
import {AnnouncementBar} from '@/components/layout/AnnouncementBar'
import {SiteFooter} from '@/components/layout/SiteFooter'
import {SiteHeader} from '@/components/layout/SiteHeader'
import {SitePopups} from '@/components/popup/SitePopups'
import {auNav} from '@/lib/navigation'

export const metadata: Metadata = {
  openGraph: {locale: 'en_AU'},
}

/** Australia section: same look as the global site, with its own navigation. */
export default function AuLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      {/* Sitewide announcements show here too, as on live */}
      <AnnouncementBar />
      <AuOfferBar />
      <SiteHeader nav={auNav} homeHref="/au" />
      <main className="flex-1" lang="en-AU">
        {children}
      </main>
      <SiteFooter />
      <SitePopups />
    </>
  )
}
