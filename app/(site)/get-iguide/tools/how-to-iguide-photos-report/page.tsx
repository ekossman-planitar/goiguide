import {Blocks} from '@/components/blocks/Blocks'
import {PageAnchorNav} from '@/components/pages/PageAnchorNav'
import {anchors, blocks, meta} from '@/lib/content/pages/howToIguidePhotosReport'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function HowToIguidePhotosReportPage() {
  const [hero, ...rest] = blocks
  return (
    <>
      <Blocks blocks={[hero]} />
      <PageAnchorNav links={anchors} />
      <Blocks blocks={rest} />
    </>
  )
}
