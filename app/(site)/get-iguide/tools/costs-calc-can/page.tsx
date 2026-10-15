import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/costsCalcCan'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function CostsCalcCanPage() {
  return <Blocks blocks={blocks} />
}
