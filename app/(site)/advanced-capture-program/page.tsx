import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/advancedCaptureProgram'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function AdvancedCaptureProgramPage() {
  return <Blocks blocks={blocks} />
}
