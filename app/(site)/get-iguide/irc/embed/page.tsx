import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/ircEmbed'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function IrcEmbedPage() {
  return <Blocks blocks={blocks} />
}
