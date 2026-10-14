import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/au/home'
import {auPageMetadata} from '@/lib/pageMetadata'

export const metadata = auPageMetadata(meta)

export default function AuHomePage() {
  return <Blocks blocks={blocks} />
}
