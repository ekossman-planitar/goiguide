import {Blocks, type Block} from '@/components/blocks/Blocks'
import {LogoBand} from '@/components/blocks/LogoBand'
import {MediaView} from '@/components/blocks/MediaView'
import {Section} from '@/components/blocks/Section'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {TabbedMedia} from '@/components/blocks/TabbedMedia'
import {Testimonials, type Quote} from '@/components/blocks/Testimonials'
import type {SectionBg} from '@/components/blocks/Section'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {urlFor} from '@/sanity/lib/image'
import {lpCtas, lpImg, lpMedia, tourEmbed, youtubeEmbed} from './convert'
import {FormPlaceholder, LpHero} from './LpHero'
import type {LpImage, LpLogo, LpQuote, LpSection} from './types'

/* eslint-disable @typescript-eslint/no-explicit-any -- section fields come from Sanity as loose objects */

const bg = (s: any): SectionBg | undefined => (['white', 'surface', 'sky'].includes(s.background) ? s.background : undefined)

function quoteFrom(q: LpQuote): Quote {
  const photo =
    typeof q.photo === 'string'
      ? {src: q.photo, alt: `photo - ${q.name ?? ''}`}
      : q.photo?.asset
        ? {src: urlFor(q.photo as any).width(600).height(600).fit('crop').auto('format').url(), alt: q.photo.alt ?? q.name ?? '', width: 600, height: 600}
        : undefined
  return {
    quote: q.quote,
    detail: q.detail,
    name: q.name,
    role: q.role,
    company: q.company,
    link: q.link?.href && q.link.label ? {label: q.link.label, href: q.link.href} : undefined,
    photo,
    logo: q.logo?.url ? {src: q.logo.url, alt: q.logo.name, width: q.logo.dims?.width, height: q.logo.dims?.height} : undefined,
  }
}

/** One landing page section → page block (most reuse the site's existing blocks). */
function Section_({s, formAnchor}: {s: any; formAnchor: boolean}) {
  switch (s._type) {
    case 'lpHero':
      return <LpHero section={s as LpSection} formAnchor={formAnchor} />
    case 'lpLogos': {
      const logos = ((s.logos ?? []) as LpLogo[]).filter((l) => l?.url).map((l) => ({src: l.url!, alt: l.name, width: l.dims?.width, height: l.dims?.height}))
      const preview = ((s._previewLogos ?? []) as string[]).map((src) => ({src, alt: 'logo'}))
      const all = logos.length ? logos : preview
      return all.length ? <LogoBand heading={s.heading} logos={all} variant={all.length > 5 ? 'marquee' : 'row'} background="white" /> : null
    }
    case 'lpTestimonials': {
      const quotes = ((s.quotes ?? s._previewQuotes ?? []) as LpQuote[]).map(quoteFrom)
      return quotes.length ? <Testimonials heading={s.heading} quotes={quotes} background={bg(s) ?? 'surface'} /> : null
    }
    case 'lpTabs': {
      const tabs = ((s.tabs ?? []) as any[])
        .map((t, i) => {
          const media = lpMedia(t.media)
          if (!media) return null
          const ctas = lpCtas(t.buttons)
          return {
            id: `${s._key}-${i}`,
            label: t.label,
            media,
            text: (
              <>
                {t.text && <p>{t.text}</p>}
                {ctas.length > 0 && <CtaButtons ctas={ctas} className="mt-5 justify-center" />}
              </>
            ),
          }
        })
        .filter(Boolean) as Parameters<typeof TabbedMedia>[0]['tabs']
      return tabs.length ? (
        <Section heading={s.heading} subheading={s.subheading} align="center" background={bg(s)}>
          <TabbedMedia label={s.heading ?? 'Samples'} tabs={tabs} />
        </Section>
      ) : null
    }
    case 'lpVideos': {
      const videos = ((s.videos ?? []) as {title: string; url: string}[]).filter((v) => v?.url)
      return videos.length ? (
        <Section heading={s.heading} align="center" background={bg(s)}>
          <ul className={videos.length === 1 ? 'mx-auto max-w-3xl' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
            {videos.map((v) => (
              <li key={v.url}>
                <MediaView media={{type: 'embed', src: /youriguide\.com/.test(v.url) ? tourEmbed(v.url) : youtubeEmbed(v.url), title: v.title}} />
                <p className="mt-3 font-semibold text-ink">{v.title}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null
    }
    case 'lpForm':
      return s.hubspotFormId || s._previewForm ? (
        <section id={formAnchor ? 'form' : undefined} className={`scroll-mt-24 py-16 lg:py-[60px] ${bg(s) === 'sky' ? 'bg-sky' : bg(s) === 'surface' ? 'bg-surface' : 'bg-white'}`}>
          <div className="mx-auto w-full max-w-2xl px-4">
            {s.heading && <h2 className="text-center text-3xl font-semibold text-ink md:text-4xl">{s.heading}</h2>}
            {s.subheading && <p className="mt-4 text-center text-lg text-muted">{s.subheading}</p>}
            <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
              {s.hubspotFormId ? <HubSpotForm formId={s.hubspotFormId} className="min-h-[320px]" /> : <FormPlaceholder />}
            </div>
          </div>
        </section>
      ) : null
    case 'lpNotice':
      return s.text ? (
        <section className="pb-12">
          <div className="mx-auto w-full max-w-4xl px-4 text-sm leading-6 whitespace-pre-line text-muted">{s.text}</div>
        </section>
      ) : null
    default: {
      const block = toBlock(s)
      return block ? <Blocks blocks={[block]} /> : null
    }
  }
}

/** Sections that map straight onto existing page blocks */
function toBlock(s: any): Block | null {
  switch (s._type) {
    case 'lpFeatures':
      return {
        type: 'cards',
        heading: s.heading,
        subheading: s.subheading,
        align: 'center',
        background: bg(s),
        columns: [2, 3, 4].includes(s.columns) ? s.columns : 3,
        cards: ((s.items ?? []) as any[]).map((it) => ({title: it.title, text: it.text, icon: lpImg(it.icon as LpImage)})),
        after: s.footnote ? <p className="text-sm text-muted">{s.footnote}</p> : undefined,
      }
    case 'lpSplit': {
      const media = lpMedia(s.media)
      return {
        type: 'split',
        heading: s.heading ?? '',
        body: s.body ? <p className="whitespace-pre-line">{s.body}</p> : undefined,
        list: s.bullets?.length ? s.bullets : undefined,
        after: s.footnote ? <p className="text-sm text-muted">{s.footnote}</p> : undefined,
        ctas: lpCtas(s.buttons),
        media: media ?? {type: 'image', image: {src: '/assets/iGUIDE-Meta-Thumbnail.png', alt: ''}},
        mediaSide: s.mediaSide === 'left' ? 'left' : 'right',
        background: bg(s),
      }
    }
    case 'lpSteps':
      return {
        type: 'steps',
        heading: s.heading ?? '',
        subheading: s.subheading,
        showImages: ((s.steps ?? []) as any[]).some((st) => lpImg(st.image)),
        steps: ((s.steps ?? []) as any[]).map((st) => ({title: st.title, body: st.text ?? '', image: lpImg(st.image)})),
      }
    case 'lpStats':
      return {type: 'stats', heading: s.heading, align: 'center', background: bg(s), stats: ((s.items ?? []) as any[]).map((it) => ({value: it.value, text: it.text}))}
    case 'lpCompare':
      return {
        type: 'compare',
        heading: s.heading,
        subheading: s.subheading,
        rows: ((s.rows ?? []) as any[]).map((r) => ({label: r.label, ours: r.ours ?? '', theirs: r.theirs ?? ''})),
        columns: {label: '', ours: s.oursLabel ?? 'iGUIDE', theirs: s.theirsLabel ?? 'Others'},
        footnote: s.footnote,
      }
    case 'lpFaq':
      return {type: 'faq', heading: s.heading ?? 'Frequently asked questions', items: ((s.items ?? []) as any[]).map((it) => ({q: it.question, a: it.answer}))}
    case 'lpCta':
      return {type: 'cta', heading: s.heading ?? '', text: s.text, ctas: lpCtas(s.buttons)}
    default:
      return null
  }
}

/** Renders a landing page's sections. The first form on the page gets id="form" so "scroll to form" buttons work. */
export function LandingSections({sections}: {sections: LpSection[]}) {
  const hasForm = (s: any) => Boolean(s.hubspotFormId || s._previewForm)
  const firstForm = sections.find((s) => (s._type === 'lpHero' && (s as any).style !== 'media' && hasForm(s)) || (s._type === 'lpForm' && hasForm(s)))?._key
  return (
    <>
      {sections.map((s) => (
        <Section_ key={s._key} s={s} formAnchor={s._key === firstForm} />
      ))}
    </>
  )
}
