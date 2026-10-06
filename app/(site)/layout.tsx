import {AnnouncementBar} from '@/components/layout/AnnouncementBar'
import {SiteHeader} from '@/components/layout/SiteHeader'

/** Shared chrome for every public page (the Studio at /studio is outside this group). */
export default function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </>
  )
}
