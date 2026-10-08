import {CtaBanner} from '@/components/blocks/CtaBanner'
import {LogoBand} from '@/components/blocks/LogoBand'
import {MediaView} from '@/components/blocks/MediaView'
import {PageHero} from '@/components/blocks/PageHero'
import {Section} from '@/components/blocks/Section'
import {SplitSection} from '@/components/blocks/SplitSection'
import {Testimonials} from '@/components/blocks/Testimonials'
import {Faq} from '@/components/sections/Faq'
import {Pill} from '@/components/ui/Pill'
import {sitePlans as c} from '@/lib/content/solutions/sitePlans'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(c.meta)

export default function SitePlansPage() {
  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        heading={c.hero.heading}
        subheading={c.hero.subheading}
        ctas={c.hero.ctas}
        media={<MediaView media={{type: 'video', ...c.hero.video}} className="shadow-lg" />}
      >
        <p>{c.hero.extra}</p>
      </PageHero>
      <LogoBand heading={c.logos.heading} logos={c.logos.items} variant="marquee" background="surface" />
      <SplitSection
        heading={c.context.heading}
        body={<p>{c.context.body}</p>}
        listHeading={c.context.listHeading}
        list={c.context.list}
        after={<p>{c.context.after}</p>}
        // Portrait screen recording: keep it phone-sized
        media={{type: 'image', image: c.context.gif}}
        mediaClassName="mx-auto max-w-[320px] rounded-3xl shadow-lg"
      />
      <Section background="sky">
        <div className="mx-auto max-w-3xl text-center">
          <Pill label={c.explore.eyebrow} />
          <h2 className="mt-6 text-balance text-[32px] font-bold leading-[normal] text-ink md:text-5xl md:leading-[normal]">{c.explore.heading}</h2>
          <p className="mt-4 text-xl leading-[30px] text-muted">{c.explore.subheading}</p>
        </div>
        <MediaView media={{type: 'embed', ...c.explore.tour}} className="mt-10 shadow-lg" />
      </Section>
      <SplitSection
        mediaSide="left"
        heading={c.oneCapture.heading}
        body={<p>{c.oneCapture.body}</p>}
        listHeading={c.oneCapture.listHeading}
        list={c.oneCapture.list}
        after={<p>{c.oneCapture.after}</p>}
        media={{type: 'image', image: c.oneCapture.image}}
      />
      <Testimonials quotes={[c.testimonial]} />
      <Faq heading={c.faq.heading} items={c.faq.items} background="white" />
      <CtaBanner {...c.cta} />
    </>
  )
}
