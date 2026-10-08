import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/industries/realEstatePhotography'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function RealEstatePhotographyPage() {
  return <Blocks blocks={blocks} />
}
