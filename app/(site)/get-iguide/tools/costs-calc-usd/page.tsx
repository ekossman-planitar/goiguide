import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/costsCalcUsd'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function CostsCalcUsdPage() {
  return <Blocks blocks={blocks} />
}
