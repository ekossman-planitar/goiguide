import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/r1Unboxing'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function R1UnboxingPage() {
  return <Blocks blocks={blocks} />
}
