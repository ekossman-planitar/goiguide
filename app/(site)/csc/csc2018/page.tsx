import {Blocks} from '@/components/blocks/Blocks'
import {PageAnchorNav} from '@/components/pages/PageAnchorNav'
import {anchors, blocks, meta} from '@/lib/content/pages/csc2018'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function Csc2018Page() {
  const [hero, ...rest] = blocks
  return (
    <>
      <Blocks blocks={[hero]} />
      <PageAnchorNav links={anchors} />
      <Blocks blocks={rest} />
    </>
  )
}
