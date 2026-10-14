import {Container} from '@/components/ui/Container'
import {meta, terms} from '@/lib/content/au/terms'
import {auPageMetadata} from '@/lib/pageMetadata'

export const metadata = auPageMetadata(meta)

export default function AuCampaignTermsPage() {
  return (
    <Container size="narrow" className="py-16 lg:py-20">
      <div className="text-lg leading-relaxed text-body [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:text-ink [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_p]:mt-4">
        {terms}
      </div>
    </Container>
  )
}
