import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/au/realEstatePhotography'
import {auPageMetadata} from '@/lib/pageMetadata'

export const metadata = auPageMetadata(meta)

export default function AuRealEstatePhotographyPage() {
  return <Blocks blocks={blocks} />
}
