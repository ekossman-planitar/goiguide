import {LegalPage} from '@/components/pages/LegalPage'
import {html, lastUpdated, title} from '@/lib/content/legal/termsOfUse'
import {pageMetadata} from '@/lib/pageMetadata'

/** /terms-of-use — TITLE copied from the live page (checked 2026-10-14). */
export const metadata = pageMetadata({
  title: 'Terms of Use | iGuide',
  // NEW description (live had none)
  description: 'The terms that apply when you browse, access or view iGuide Content or data via the iGuide viewer application.',
  path: '/terms-of-use',
})

export default function TermsOfUsePage() {
  return <LegalPage title={title} lastUpdated={lastUpdated} html={html} />
}
