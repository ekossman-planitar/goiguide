import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/industries/forensicInvestigation'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function ForensicInvestigationPage() {
  return <Blocks blocks={blocks} />
}
