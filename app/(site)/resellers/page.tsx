import type {Metadata} from 'next'
import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/pages/resellers'
import {pageMetadata} from '@/lib/pageMetadata'

// Live page is noindex (robots: noindex,no-follow); keep it out of the sitemap
export const metadata: Metadata = {...pageMetadata(meta), robots: {index: false, follow: false}}

export default function ResellersPage() {
  return <Blocks blocks={blocks} />
}
