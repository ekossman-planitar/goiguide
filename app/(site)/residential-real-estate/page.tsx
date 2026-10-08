import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/industries/residentialRealEstate'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function ResidentialRealEstatePage() {
  return <Blocks blocks={blocks} />
}
