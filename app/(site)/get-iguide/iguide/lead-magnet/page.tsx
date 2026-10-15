import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/leadMagnet'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function LeadMagnetPage() {
  return <Blocks blocks={blocks} />
}
