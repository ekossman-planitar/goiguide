import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/reportFramingWhatsNext2026'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function FramingWhatsNext2026Page() {
  return <Blocks blocks={blocks} />
}
