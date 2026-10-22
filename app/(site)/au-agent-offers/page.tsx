import {Blocks} from '@/components/blocks/Blocks'
import {AuOffersHero, blocks, meta} from '@/lib/content/pages/auAgentOffers'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function AuAgentOffersPage() {
  return (
    <>
      <AuOffersHero />
      <Blocks blocks={blocks} />
    </>
  )
}
