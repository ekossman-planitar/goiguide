import {Blocks} from '@/components/blocks/Blocks'
import {blocks, meta} from '@/lib/content/au/home'
import {australiaOrganizationJsonLd, jsonLdScript} from '@/lib/organization'
import {auPageMetadata} from '@/lib/pageMetadata'

export const metadata = auPageMetadata(meta)

export default function AuHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLdScript(australiaOrganizationJsonLd)}} />
      <Blocks blocks={blocks} />
    </>
  )
}
