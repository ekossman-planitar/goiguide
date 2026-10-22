import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/noSubscriptionAlternative'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function NoSubscriptionAlternativePage() {
  return <Blocks blocks={blocks} />
}
