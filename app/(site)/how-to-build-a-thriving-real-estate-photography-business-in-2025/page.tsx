import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/webinarPhotographyBusiness2025'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function PhotographyBusinessWebinarPage() {
  return <Blocks blocks={blocks} />
}
