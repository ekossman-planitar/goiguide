import {AnnouncementBar} from '@/components/layout/AnnouncementBar'
import {SitePopups} from '@/components/popup/SitePopups'

/** Paid-media landing pages and their template previews: no site header or footer (each page renders its own stripped ones). */
export default function LandingLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      {/* Only announcements set to "Include paid landing pages" or listing the page */}
      <AnnouncementBar landingPage />
      {children}
      {/* Only pop-ups set to "also show on paid-media landing pages" or targeting the page */}
      <SitePopups landingPage />
    </>
  )
}
