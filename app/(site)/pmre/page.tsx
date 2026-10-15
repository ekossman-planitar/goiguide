import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/pmre'
import {pageMetadata} from '@/lib/pageMetadata'

// Live robots: index,follow (the default)
export const metadata = pageMetadata(meta)

export default function PmrePage() {
  return <Blocks blocks={blocks} />
}
