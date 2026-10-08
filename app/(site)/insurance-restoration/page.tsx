import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/industries/insuranceRestoration'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function InsuranceRestorationPage() {
  return <Blocks blocks={blocks} />
}
