import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/fireInvestigationLanding'
import {pageMetadata} from '@/lib/pageMetadata'

// Live page is noindex,no-follow
export const metadata = {...pageMetadata(meta), robots: {index: false, follow: false}}

export default function FireInvestigationLandingPage() {
  return <Blocks blocks={blocks} />
}
