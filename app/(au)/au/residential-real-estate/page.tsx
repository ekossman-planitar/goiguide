import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/au/residentialRealEstate'
import {auPageMetadata} from '@/lib/pageMetadata'

export const metadata = auPageMetadata(meta)

export default function AuResidentialRealEstatePage() {
  return <Blocks blocks={blocks} />
}
