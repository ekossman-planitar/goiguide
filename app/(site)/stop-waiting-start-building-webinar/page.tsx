import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/webinarStopWaiting'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function StopWaitingWebinarPage() {
  return <Blocks blocks={blocks} />
}
