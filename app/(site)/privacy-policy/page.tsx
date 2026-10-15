import {LegalPage} from '@/components/pages/LegalPage'
import {html, title} from '@/lib/content/legal/privacyPolicy'
import {pageMetadata} from '@/lib/pageMetadata'

/** /privacy-policy — TITLE/DESC copied from the live page (checked 2026-10-14). */
export const metadata = pageMetadata({
  title: 'Privacy Policy | iGUIDE',
  description:
    'The Planitar Privacy Policy describes our policies and procedures on the collection, use and disclosure of your information, your privacy rights and how the law protects you.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return <LegalPage title={title} html={html} />
}
