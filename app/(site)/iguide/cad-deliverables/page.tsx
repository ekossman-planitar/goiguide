import {CheckList} from '@/components/blocks/CheckList'
import {CtaBanner} from '@/components/blocks/CtaBanner'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {LogoBand} from '@/components/blocks/LogoBand'
import {MediaView} from '@/components/blocks/MediaView'
import {PageHero} from '@/components/blocks/PageHero'
import {Section} from '@/components/blocks/Section'
import {SplitSection} from '@/components/blocks/SplitSection'
import {TabbedMedia} from '@/components/blocks/TabbedMedia'
import {Testimonials} from '@/components/blocks/Testimonials'
import {Faq} from '@/components/sections/Faq'
import {cadDeliverables as c} from '@/lib/content/solutions/cadDeliverables'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(c.meta)

export default function CadDeliverablesPage() {
  return (
    <>
      <PageHero
        heading={c.hero.heading}
        subheading={c.hero.subheading}
        ctas={c.hero.ctas}
        media={<MediaView media={{type: 'embed', ...c.hero.embed}} className="shadow-lg" />}
      />
      <LogoBand heading={c.logos.heading} logos={c.logos.items} variant="marquee" background="surface" />
      <SplitSection
        heading={c.standards.heading}
        body={<p>{c.standards.body}</p>}
        list={c.standards.list}
        media={{type: 'image', image: c.standards.image}}
      />
      {/* Same heading structure as live: H2 for the section, H3 for the package and add-ons */}
      <Section heading={c.adp.heading} background="sky">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <MediaView media={{type: 'image', image: c.adp.image}} />
          <div>
            <h3 className="text-[28px] leading-tight font-bold text-ink">{c.adp.subheading}</h3>
            <p className="mt-4 text-lg leading-7 text-body">{c.adp.body}</p>
            <p className="mt-6 font-bold text-ink">{c.adp.listHeading}</p>
            <CheckList items={c.adp.list} className="mt-4" />
            <CtaButtons ctas={[c.adp.cta]} className="mt-8" />
          </div>
        </div>
        <div className="mt-16 rounded-2xl bg-white p-6 md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-[28px] leading-tight font-bold text-ink">{c.addOns.heading}</h3>
            <p className="mt-3 text-lg leading-7 text-muted">{c.addOns.subheading}</p>
          </div>
          <div className="mt-8">
            <TabbedMedia
              label="CAD add-ons"
              tabs={c.addOns.tabs.map((t) => ({id: t.id, label: t.label, title: t.title, text: t.text, media: {type: 'image', image: t.image}}))}
            />
          </div>
        </div>
      </Section>
      <Testimonials quotes={[c.testimonial]} />
      <Faq heading={c.faq.heading} items={c.faq.items} background="white" />
      <CtaBanner {...c.cta} />
    </>
  )
}
