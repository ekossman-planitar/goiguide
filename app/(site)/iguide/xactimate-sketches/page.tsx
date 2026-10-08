import {CardGrid} from '@/components/blocks/CardGrid'
import {CtaBanner} from '@/components/blocks/CtaBanner'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {DeliverableCards} from '@/components/blocks/DeliverableCards'
import {LogoBand} from '@/components/blocks/LogoBand'
import {MediaView} from '@/components/blocks/MediaView'
import {PageHero} from '@/components/blocks/PageHero'
import {Section} from '@/components/blocks/Section'
import {Testimonials} from '@/components/blocks/Testimonials'
import {StepsTimeline} from '@/components/sections/StepsTimeline'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {xactimateSketches as c} from '@/lib/content/solutions/xactimateSketches'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(c.meta)

export default function XactimateSketchesPage() {
  return (
    <>
      <PageHero
        heading={c.hero.heading}
        subheading={c.hero.subheading}
        ctas={c.hero.ctas}
        media={<MediaView media={{type: 'video', ...c.hero.video}} className="shadow-lg" />}
      />
      <LogoBand heading={c.logos.heading} logos={c.logos.items} variant="marquee" background="surface" />
      <Section heading={c.audiences.heading} subheading={c.audiences.subheading}>
        <CardGrid cards={c.audiences.cards} />
      </Section>
      <Testimonials quotes={c.testimonials} />
      {/* Live site shows these as an accordion; cards show all four without clicks */}
      <Section heading={c.included.heading}>
        <CardGrid cards={c.included.cards} />
      </Section>
      <Section heading={c.sketches.heading} subheading={c.sketches.subheading} background="sky">
        <DeliverableCards items={c.sketches.items} columns={3} />
        <CtaButtons ctas={[c.sketches.cta]} className="mt-8 justify-center" />
      </Section>
      <Section heading={c.stories.heading}>
        <SmartLink href={c.stories.link.href} className="group -mt-6 mb-10 inline-flex items-center gap-1.5 font-semibold text-primary">
          {c.stories.link.label}
          <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
        </SmartLink>
        <StoryQuotes quotes={c.stories.quotes} />
      </Section>
      <StepsTimeline heading={c.steps.heading} steps={c.steps.steps} />
      <div className="-mt-6 pb-10">
        <CtaButtons ctas={c.steps.ctas} className="justify-center" />
      </div>
      <CtaBanner {...c.cta} />
    </>
  )
}

function StoryQuotes({quotes}: {quotes: typeof c.stories.quotes}) {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {quotes.map((q) => (
        <li key={q.name} className="flex flex-col overflow-hidden rounded-2xl border border-[#e7edf6] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
          <MediaView media={q.media} className="aspect-video rounded-none object-cover" />
          <figure className="flex flex-1 flex-col p-6">
            <blockquote className="flex-1 text-base leading-6 text-ink">“{q.quote}”</blockquote>
            <figcaption className="mt-5 border-t border-line pt-4 text-sm">
              <span className="font-semibold text-ink">{q.name}</span>
              <span className="text-muted"> / {q.role}</span>
              <span className="block text-muted">{q.company}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
