import {CardGrid} from '@/components/blocks/CardGrid'
import {CtaBanner} from '@/components/blocks/CtaBanner'
import {CmsLogoBand} from '@/components/cms/CmsLogoBand'
import {MediaView} from '@/components/blocks/MediaView'
import {PageHero} from '@/components/blocks/PageHero'
import {Section} from '@/components/blocks/Section'
import {TabbedMedia} from '@/components/blocks/TabbedMedia'
import {CmsTestimonials} from '@/components/cms/CmsTestimonials'
import {virtualTours as c} from '@/lib/content/solutions/virtualTours'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(c.meta)

export default function VirtualToursPage() {
  return (
    <>
      <PageHero
        heading={c.hero.heading}
        subheading={c.hero.subheading}
        ctas={c.hero.ctas}
        media={<MediaView media={{type: 'embed', ...c.hero.tour}} className="shadow-lg" />}
      />
      <CmsLogoBand band={c.portals.band} heading={c.portals.heading} logos={c.portals.logos} background="surface" />
      <Section heading={c.deliverables.heading}>
        <CardGrid cards={c.deliverables.cards} columns={3} />
      </Section>
      <Section heading={c.extend.heading} subheading={c.extend.subheading} align="center" background="sky">
        <TabbedMedia label="iGuide extras" tabs={c.extend.tabs} />
      </Section>
      <CmsTestimonials quotes={[c.testimonial]} />
      <CtaBanner {...c.cta} />
    </>
  )
}
