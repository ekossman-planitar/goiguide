import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/hauntedTours'
import {pageMetadata} from '@/lib/pageMetadata'

// Live robots: "index" (indexed, the default)
export const metadata = pageMetadata(meta)

export default function HauntedToursPage() {
  return <Blocks blocks={blocks} />
}
