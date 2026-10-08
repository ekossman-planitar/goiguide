import {CardGrid} from '@/components/blocks/CardGrid'
import {CtaBanner} from '@/components/blocks/CtaBanner'
import {DeliverableCards} from '@/components/blocks/DeliverableCards'
import {LogoBand} from '@/components/blocks/LogoBand'
import {PageHero} from '@/components/blocks/PageHero'
import {Section} from '@/components/blocks/Section'
import {SplitSection} from '@/components/blocks/SplitSection'
import {TabbedMedia} from '@/components/blocks/TabbedMedia'
import {Testimonials} from '@/components/blocks/Testimonials'
import {Faq} from '@/components/sections/Faq'
import {floorPlans as c} from '@/lib/content/solutions/floorPlans'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(c.meta)

export default function FloorPlansPage() {
  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        heading={c.hero.heading}
        subheading={c.hero.subheading}
        ctas={c.hero.ctas}
        media={
          <TabbedMedia
            label="Floor plan formats"
            tabs={c.hero.tabs.map((t, i) => ({id: t.id, label: t.label, media: {type: 'image', image: t.image, priority: i === 0}}))}
          />
        }
      />
      <LogoBand heading={c.software.heading} logos={c.software.logos} background="surface" />
      <Section heading={c.workflows.heading} subheading={c.workflows.subheading}>
        <CardGrid cards={c.workflows.cards} />
      </Section>
      <Section heading={c.deliverables.heading} subheading={c.deliverables.subheading} background="sky">
        <DeliverableCards items={c.deliverables.items} />
      </Section>
      <SplitSection
        id={c.overviews.id}
        heading={c.overviews.heading}
        body={<p>{c.overviews.body}</p>}
        media={{type: 'image', image: c.overviews.image}}
      />
      <Testimonials quotes={[c.testimonial]} />
      <Faq heading={c.faq.heading} items={c.faq.items} background="white" />
      <CtaBanner heading={c.cta.heading} ctas={c.cta.ctas} />
    </>
  )
}
