import {LegalPage} from '@/components/pages/LegalPage'
import {html, title} from '@/lib/content/legal/pmreRules'
import {pageMetadata} from '@/lib/pageMetadata'

/** /pmre-rules-regulations — TITLE/DESC copied from the live page (checked 2026-10-14). */
export const metadata = pageMetadata({
  title: 'iGUIDE Tour to PMRE 2026 Contest – Official Rules & Regulations | iGUIDE',
  description:
    'Read the official rules and regulations for the iGUIDE Tour to PMRE Contest. Three winners will receive an all-expenses-paid trip to the PMRE Conference in Las Vegas, November 2026. Open to Canadian and US residents. Contest runs April 21 – October 13, 2026.',
  path: '/pmre-rules-regulations',
})

export default function PmreRulesPage() {
  return <LegalPage title={title} html={html} />
}
