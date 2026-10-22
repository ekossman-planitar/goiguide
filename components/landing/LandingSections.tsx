import {PackageTabs, type PackageTab} from '@/components/blocks/PackageTabs'
import {Blocks, type Block} from '@/components/blocks/Blocks'
import {Pill} from '@/components/ui/Pill'
import {CheckList} from '@/components/blocks/CheckList'
import {LogoBand} from '@/components/blocks/LogoBand'
import {MediaView} from '@/components/blocks/MediaView'
import {Section} from '@/components/blocks/Section'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {TabbedMedia} from '@/components/blocks/TabbedMedia'
import {Testimonials, type Quote} from '@/components/blocks/Testimonials'
import type {SectionBg} from '@/components/blocks/Section'
import {ResourceCard} from '@/components/resources/ResourceCard'
import type {ResourceCardData} from '@/sanity/lib/types'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {urlFor} from '@/sanity/lib/image'
import {lpCtas, lpImg, lpMedia, tourEmbed, youtubeEmbed} from './convert'
import {FormPlaceholder, LpHero} from './LpHero'
import {SampleGallery} from './SampleGallery'
import {ChevronDown} from '@/components/ui/icons'
import {AgreementSection, AnchorNavSection, FeatureCardsSection, ReportSection, TablesSection} from './ShowcaseSections'
import type {LpImage, LpLogo, LpQuote, LpSection} from './types'

/* eslint-disable @typescript-eslint/no-explicit-any -- section fields come from Sanity as loose objects */

const bg = (s: any): SectionBg | undefined => (['white', 'surface', 'sky'].includes(s.background) ? s.background : undefined)

function quotePhoto(q: LpQuote): Quote['photo'] {
  if (typeof q.photo === 'string') return {src: q.photo, alt: `photo - ${q.name ?? ''}`}
  if (q.photo?.asset) {
    return {src: urlFor(q.photo as any).width(600).height(600).fit('crop').auto('format').url(), alt: q.photo.alt ?? q.name ?? '', width: 600, height: 600}
  }
  return undefined
}

function quoteFrom(q: LpQuote): Quote {
  return {
    quote: q.quote,
    detail: q.detail,
    name: q.name,
    role: q.role,
    company: q.company,
    link: q.link?.href && q.link.label ? {label: q.link.label, href: q.link.href} : undefined,
    photo: quotePhoto(q),
    logo: q.logo?.url ? {src: q.logo.url, alt: q.logo.name, width: q.logo.dims?.width, height: q.logo.dims?.height} : undefined,
  }
}

type SectionData = {s: any}
type SectionProps = SectionData & {formAnchor: boolean}

function LogosSection({s}: Readonly<SectionData>) {
  const logos = ((s.logos ?? []) as LpLogo[]).filter((l) => l?.url).map((l) => ({src: l.url!, alt: l.name, width: l.dims?.width, height: l.dims?.height}))
  const preview = ((s._previewLogos ?? []) as string[]).map((src) => ({src, alt: 'logo'}))
  const all = logos.length ? logos : preview
  return all.length ? <LogoBand heading={s.heading} logos={all} variant={all.length > 5 ? 'marquee' : 'row'} background="white" /> : null
}

function TestimonialsSection({s}: Readonly<SectionData>) {
  // Skip missing or unpublished testimonials instead of failing the page
  const quotes = ((s.quotes ?? s._previewQuotes ?? []) as (LpQuote | null)[]).filter((q): q is LpQuote => !!q?.quote).map(quoteFrom)
  return quotes.length ? <Testimonials heading={s.heading} quotes={quotes} background={bg(s) ?? 'surface'} /> : null
}

/** Live "iGUIDE Packages" tabs (camerasystemcontent): same component as /design-construction */
function PackageTabsSection({s}: Readonly<SectionData>) {
  const packages = ((s.tabs ?? []) as any[])
    .map((t, i) => {
      const media = lpMedia(t.media)
      if (media?.type !== 'image') return null
      return {
        id: `${s._key}-${i}`,
        label: t.label,
        heading: t.heading || t.label,
        text: t.text ?? '',
        list: (t.bullets ?? []) as string[],
        image: media.image,
        links: lpCtas(t.buttons).map((c) => ({label: c.label, href: c.href})),
      }
    })
    .filter(Boolean) as PackageTab[]
  return packages.length ? (
    <Section heading={s.heading} subheading={s.subheading} align="center" background={bg(s)}>
      <PackageTabs tabs={packages} label={s.heading ?? 'Packages'} />
    </Section>
  ) : null
}

function TabsSection({s}: Readonly<SectionData>) {
  if (s.display === 'packages') return <PackageTabsSection s={s} />
  const tabs = ((s.tabs ?? []) as any[])
    .map((t, i) => {
      const media = lpMedia(t.media)
      if (!media) return null
      const ctas = lpCtas(t.buttons)
      return {
        id: `${s._key}-${i}`,
        label: t.label,
        media,
        href: typeof t.link === 'string' ? t.link : undefined,
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
      {/* Drawings and screenshots keep a readable size instead of stretching to the full page width */}
      <TabbedMedia label={s.heading ?? 'Samples'} tabs={tabs} mediaClassName="mx-auto max-w-4xl" zoom={s.zoom === true} />
    </Section>
  ) : null
}

type TourTip = {_key?: string; text?: string; icon?: LpImage}

function TourTips({tips}: Readonly<{tips: TourTip[]}>) {
  return (
    <ul className="mb-8 grid gap-6 md:grid-cols-3">
      {tips.map((t, i) => {
        const icon = lpImg(t.icon)
        return (
          <li key={t._key ?? i} className="flex items-center gap-4">
            {icon && (
              // eslint-disable-next-line @next/next/no-img-element -- small icon, natural size
              <img src={icon.src} alt={icon.alt} className="w-[60px] max-w-[60px] shrink-0" />
            )}
            <span className="font-medium text-ink">{t.text}</span>
          </li>
        )
      })}
    </ul>
  )
}

function TourClosing({s, list}: Readonly<{s: any; list: string[]}>) {
  if (!s.listHeading && list.length === 0 && !s.closing) return null
  return (
    <div className="mx-auto mt-10 max-w-3xl text-center">
      {s.listHeading && <h3 className="text-2xl font-semibold text-ink">{s.listHeading}</h3>}
      {list.length > 0 && <CheckList items={list} className="mx-auto mt-6 w-fit text-left" />}
      {s.closing && <p className="mt-6 text-lg text-body">{s.closing}</p>}
    </div>
  )
}

/** Live tour(s) with short "how to use it" tips (live: tab-embed element; several tours show as tabs) */
function TourDemoSection({s}: Readonly<SectionData>) {
  const tours = ((s.tours ?? []) as {_key?: string; label?: string; media?: any; usOnly?: boolean}[])
    .map((t, i) => ({id: `${s._key}-${i}`, label: t.label || `Tour ${i + 1}`, media: lpMedia(t.media), usOnly: t.usOnly === true}))
    .filter((t): t is {id: string; label: string; media: NonNullable<ReturnType<typeof lpMedia>>; usOnly: boolean} => !!t.media)
  const tips = ((s.tips ?? []) as TourTip[]).filter((t) => t?.text)
  const list = ((s.list ?? []) as string[]).filter(Boolean)
  const ctas = lpCtas(s.buttons).map((c) => ({...c, variant: 'secondary' as const}))
  const samples = ((s.samples ?? []) as {_key?: string; label?: string; url?: string; image?: LpImage}[])
    .filter((x) => x?.label && x.url)
    .map((x, i) => ({key: x._key ?? String(i), label: x.label!, url: x.url!, image: lpImg(x.image)}))
  if (!tours.length) return null
  const closingButtons = ctas.length > 0 && !samples.length && (list.length > 0 || Boolean(s.closing))
  return (
    <Section heading={s.heading} subheading={s.subheading} eyebrow={s.eyebrow ? <Pill label={s.eyebrow} /> : undefined} align="center" background={bg(s) ?? 'surface'}>
      {tips.length > 0 && <TourTips tips={tips} />}
      {tours.length > 1 ? <TabbedMedia label={s.heading ?? 'Tours'} tabs={tours} /> : <MediaView media={tours[0].media} />}
      {/* Buttons sit under the tour; on a section that ends with a checklist and no gallery they close the section (live: Site Plans) */}
      {ctas.length > 0 && !closingButtons && <CtaButtons ctas={ctas} className="mt-6 justify-center" />}
      {samples.length > 0 && <SampleGallery samples={samples} heading={s.samplesHeading} />}
      <TourClosing s={s} list={list} />
      {closingButtons && <CtaButtons ctas={ctas} className="mt-8 justify-center" />}
    </Section>
  )
}

function videoListClass(fullWidth: boolean, count: number) {
  if (fullWidth) return ''
  return count === 1 ? 'mx-auto max-w-3xl' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
}

function VideosSection({s}: Readonly<SectionData>) {
  const videos = ((s.videos ?? []) as {title: string; url: string}[]).filter((v) => v?.url)
  return videos.length ? (
    <Section heading={s.heading} align="center" background={bg(s)}>
      <ul className={videoListClass(s.fullWidth, videos.length)}>
        {videos.map((v) => (
          <li key={v.url}>
            <MediaView media={{type: 'embed', src: /youriguide\.com/.test(v.url) ? tourEmbed(v.url) : youtubeEmbed(v.url), title: v.title}} />
            {!s.fullWidth && <p className="mt-3 font-semibold text-ink">{v.title}</p>}
          </li>
        ))}
      </ul>
    </Section>
  ) : null
}

function ResourcesSection({s}: Readonly<SectionData>) {
  const items = ((s.items ?? []) as ResourceCardData[]).filter((r) => r?._id)
  return items.length ? (
    <Section heading={s.heading} align="center" background={bg(s)}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <li key={r._id}>
            <ResourceCard item={r} />
          </li>
        ))}
      </ul>
    </Section>
  ) : null
}

const FORM_BG: Record<string, string> = {sky: 'bg-sky', surface: 'bg-surface'}

function FormSection({s, formAnchor}: Readonly<SectionProps>) {
  if (!s.hubspotFormId && !s._previewForm) return null
  const bgClass = FORM_BG[bg(s) ?? ''] ?? 'bg-white'
  return (
    <section id={formAnchor ? 'form' : undefined} className={`scroll-mt-24 py-16 lg:py-[60px] ${bgClass}`}>
      <div className="mx-auto w-full max-w-2xl px-4">
        {s.heading && <h2 className="text-center text-3xl font-semibold text-ink md:text-4xl">{s.heading}</h2>}
        {s.subheading && <p className="mt-4 text-center text-lg text-muted">{s.subheading}</p>}
        <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
          {s.hubspotFormId ? <HubSpotForm formId={s.hubspotFormId} className="min-h-[320px]" /> : <FormPlaceholder />}
        </div>
      </div>
    </section>
  )
}

function NoticeSection({s}: Readonly<SectionData>) {
  return s.text ? (
    <section className="pb-12">
      <div className="mx-auto w-full max-w-4xl px-4 text-sm leading-6 whitespace-pre-line text-muted">{s.text}</div>
    </section>
  ) : null
}

function BlockSection({s}: Readonly<SectionData>) {
  const block = toBlock(s)
  return block ? <Blocks blocks={[block]} /> : null
}

/** One landing page section → page block (most reuse the site's existing blocks). */
function LandingSection({s, formAnchor}: Readonly<SectionProps>) {
  switch (s._type) {
    case 'lpHero':
      return <LpHero section={s as LpSection} formAnchor={formAnchor} />
    case 'lpLogos':
      return <LogosSection s={s} />
    case 'lpTestimonials':
      return <TestimonialsSection s={s} />
    case 'lpTabs':
      return <TabsSection s={s} />
    case 'lpTourDemo':
      return <TourDemoSection s={s} />
    case 'lpVideos':
      return <VideosSection s={s} />
    case 'lpResources':
      return <ResourcesSection s={s} />
    case 'lpForm':
      return <FormSection s={s} formAnchor={formAnchor} />
    case 'lpNotice':
      return <NoticeSection s={s} />
    case 'lpAnchorNav':
      return <AnchorNavSection s={s} />
    case 'lpTables':
      return <TablesSection s={s} />
    case 'lpReport':
      return <ReportSection s={s} />
    case 'lpAgreement':
      return <AgreementSection s={s} />
    case 'lpFeatures':
      return usesFeatureCards(s) ? <FeatureCardsSection s={s} /> : <BlockSection s={s} />
    default:
      return <BlockSection s={s} />
  }
}

/** Features with large images, buttons or the rows display use the showcase cards; plain ones keep the site's card grid */
const usesFeatureCards = (s: any) =>
  s.display === 'rows' ||
  (s.buttons as unknown[] | undefined)?.length ||
  ((s.items ?? []) as any[]).some((it) => lpImg(it?.image) || (it?.buttons as unknown[] | undefined)?.length || (it?.bullets as unknown[] | undefined)?.length)

/** Spec rows under a split section's text (live: PLANIX R1 specs) */
function SpecTable({specs}: Readonly<{specs: {_key?: string; label: string; value?: string}[]}>) {
  return (
    <dl className="divide-y divide-line border-y border-line text-base">
      {specs.map((sp, i) =>
        sp.value ? (
          <div key={sp._key ?? i} className="grid grid-cols-2 gap-4 py-2.5">
            <dt className="font-semibold text-ink">{sp.label}</dt>
            <dd className="text-body">{sp.value}</dd>
          </div>
        ) : (
          // A label without a value starts a group (e.g. Performance, Mechanical)
          <div key={sp._key ?? i} className="pt-6 pb-2.5 text-sm font-semibold tracking-wide text-muted uppercase">
            <dt>{sp.label}</dt>
          </div>
        ),
      )}
    </dl>
  )
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
      const specs = ((s.specs ?? []) as any[]).filter((sp) => sp?.label)
      return {
        type: 'split',
        eyebrow: s.eyebrow,
        heading: s.heading ?? '',
        body: s.body ? <p className="whitespace-pre-line">{s.body}</p> : undefined,
        listHeading: s.bulletsHeading,
        list: s.bullets?.length ? s.bullets : undefined,
        after:
          specs.length || s.footnote ? (
            <>
              {specs.length > 0 &&
                (s.specsHeading ? (
                  <details className="group rounded-xl border border-line bg-white px-5 py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                      {s.specsHeading}
                      <ChevronDown width={18} height={18} className="shrink-0 text-primary transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="pb-4">
                      <SpecTable specs={specs} />
                    </div>
                  </details>
                ) : (
                  <SpecTable specs={specs} />
                ))}
              {s.footnote && <p className="text-sm text-muted">{s.footnote}</p>}
            </>
          ) : undefined,
        ctas: lpCtas(s.buttons),
        media: media ?? {type: 'image', image: {src: '/assets/iGUIDE-Meta-Thumbnail.png', alt: ''}},
        mediaSide: s.mediaSide === 'left' ? 'left' : 'right',
        // Product shots beside a spec table are tall: keep them to a sensible height
        mediaClassName: specs.length ? 'mx-auto max-h-[560px] w-auto! max-w-full' : undefined,
        background: bg(s),
        asH1: s._asH1 === true,
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
        columns: {label: '', ours: s.oursLabel ?? 'iGuide', theirs: s.theirsLabel ?? 'Others'},
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
export function LandingSections({sections: all, h1FromFirstSplit = false}: Readonly<{sections: LpSection[]; h1FromFirstSplit?: boolean}>) {
  // Pages with no hero (e.g. the AEC and FM showcases): the first split heading is the page's h1
  const firstSplit = h1FromFirstSplit && !all.some((s) => s._type === 'lpHero') ? all.find((s) => s._type === 'lpSplit')?._key : undefined
  const sections = all.map((s) => (s._key === firstSplit ? {...s, _asH1: true} : s))
  const hasForm = (s: any) => Boolean(s.hubspotFormId || s._previewForm)
  const firstForm = sections.find((s) => (s._type === 'lpHero' && (s as any).style !== 'media' && hasForm(s)) || (s._type === 'lpForm' && hasForm(s)))?._key
  return (
    <>
      {sections.map((s) => {
        const section = <LandingSection key={s._key} s={s} formAnchor={s._key === firstForm} />
        // Optional anchor for in-page links; scroll margin clears the sticky header and in-page menu
        // (not on the in-page menu: a wrapper would stop it sticking to the top while scrolling)
        const anchor = typeof s.anchor === 'string' && s._type !== 'lpAnchorNav' ? s.anchor : undefined
        return anchor ? (
          <div key={s._key} id={anchor} className="scroll-mt-32">
            {section}
          </div>
        ) : (
          section
        )
      })}
    </>
  )
}
