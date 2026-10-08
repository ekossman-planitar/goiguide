import {CardGrid} from '@/components/blocks/CardGrid'
import {CtaBanner} from '@/components/blocks/CtaBanner'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {LogoBand} from '@/components/blocks/LogoBand'
import {MediaView} from '@/components/blocks/MediaView'
import {PageHero} from '@/components/blocks/PageHero'
import {Section} from '@/components/blocks/Section'
import {SpecsAccordion} from '@/components/blocks/SpecsAccordion'
import {SplitSection} from '@/components/blocks/SplitSection'
import {Testimonials} from '@/components/blocks/Testimonials'
import {Faq} from '@/components/sections/Faq'
import {StepsTimeline} from '@/components/sections/StepsTimeline'
import {cameraHardware as c} from '@/lib/content/solutions/cameraHardware'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(c.meta)

export default function CameraHardwarePage() {
  const p = c.product
  return (
    <>
      <PageHero
        heading={c.hero.heading}
        subheading={c.hero.subheading}
        ctas={c.hero.ctas}
        media={<MediaView media={{type: 'image', image: c.hero.image, priority: true}} className="rounded-2xl shadow-lg" />}
      />
      <LogoBand logos={c.logos} background="surface" />
      <SplitSection
        heading={c.angle.heading}
        body={<p>{c.angle.body}</p>}
        list={c.angle.list}
        ctas={c.angle.ctas}
        media={{type: 'embed', ...c.angle.video}}
      />
      <Section heading={c.why.heading} background="sky">
        <CardGrid cards={c.why.cards} />
      </Section>
      <StepsTimeline heading={c.steps.heading} steps={c.steps.steps} showImages={false} />
      <Section heading={c.elevate.heading} background="surface">
        <CardGrid cards={c.elevate.cards} columns={3} />
      </Section>
      <CtaBanner heading={c.digitize.heading} ctas={c.digitize.ctas} />

      <Section heading={p.heading}>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <h3 className="text-[28px] leading-tight font-bold text-primary">{p.name}</h3>
            <p className="mt-3 text-2xl leading-snug font-bold text-ink">{p.lead}</p>
            <p className="mt-4 text-lg leading-7 text-body">{p.body}</p>
            <figure className="mt-6 border-l-4 border-brand pl-5">
              <blockquote className="text-lg italic leading-7 text-ink">{p.quote.text}</blockquote>
              <figcaption className="mt-2 text-sm text-muted">– {p.quote.by}</figcaption>
            </figure>
            <h4 className="mt-8 text-lg font-bold text-ink">{p.stepsHeading}</h4>
            <ol className="mt-3 space-y-3">
              {p.steps.map(([title, text], i) => (
                <li key={title} className="flex gap-3 text-base leading-6 text-body">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{i + 1}</span>
                  <span>
                    <strong className="text-ink">{title}:</strong> {text}
                  </span>
                </li>
              ))}
            </ol>
            <h4 className="mt-8 text-lg font-bold text-ink">{p.extraHeading}</h4>
            <p className="mt-2 text-base text-body">
              <a href={p.extra.link.href} className="font-semibold text-primary underline underline-offset-2">
                {p.extra.link.label}
              </a>
              {p.extra.after}
            </p>
            <CtaButtons ctas={p.ctas} className="mt-8" />
          </div>
          <MediaView media={{type: 'image', image: p.image}} className="mx-auto max-w-[360px]" sizes="360px" />
        </div>
        <div className="mt-12">
          <SpecsAccordion title="Technical Specifications" groups={p.specs} />
        </div>
      </Section>

      <CtaBanner heading={c.specialist.heading} text={c.specialist.text} ctas={c.specialist.ctas} />
      <Faq heading={c.faq.heading} items={c.faq.items} />
      <Testimonials heading={c.testimonials.heading} quotes={c.testimonials.quotes} background="white" />
      <Section heading={c.hub.heading} background="surface">
        <CardGrid cards={c.hub.cards} columns={3} />
      </Section>
      <SplitSection heading={c.store.heading} body={<p>{c.store.text}</p>} ctas={c.store.ctas} media={{type: 'image', image: c.store.image}} />
    </>
  )
}
