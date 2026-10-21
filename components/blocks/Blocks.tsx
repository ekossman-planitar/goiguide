import type {ReactNode} from 'react'
import {Faq} from '@/components/sections/Faq'
import {StepsTimeline, type TimelineStep} from '@/components/sections/StepsTimeline'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {CardGrid, type GridCard} from './CardGrid'
import {CompareTable, type CompareRow} from './CompareTable'
import {CtaBanner} from './CtaBanner'
import {CtaButtons} from './CtaButtons'
import {DeliverableCards, type Deliverable} from './DeliverableCards'
import {FeatureTabs, type FeatureTab} from './FeatureTabs'
import {CmsLogoBand} from '@/components/cms/CmsLogoBand'
import {CmsTestimonials} from '@/components/cms/CmsTestimonials'
import {resolveQuotes} from '@/lib/cmsLibrary'
import {MediaView} from './MediaView'
import {PageHero} from './PageHero'
import {Section, type SectionBg} from './Section'
import {SplitSection} from './SplitSection'
import {StatGrid, type Stat} from './StatGrid'
import {Testimonials, type Quote} from './Testimonials'
import type {Cta, Img, Media} from './types'

/**
 * Page-builder blocks. Each page's content file is a list of these, which
 * mirrors the block array a Sanity `page` document will hold later.
 */
type Link = {label: string; href: string; newTab?: boolean}
type Head = {id?: string; heading?: string; subheading?: string; align?: 'left' | 'center'; background?: SectionBg}

export type Block =
  | {type: 'hero'; heading: string; subheading?: string; extra?: ReactNode; ctas?: Cta[]; media: Media}
  /** `band`: ID of the Sanity logo band that can replace these logos (lib/cmsLibrary.ts) */
  | {type: 'logos'; band?: string; heading?: string; logos: Img[]; marquee?: boolean; background?: SectionBg; cards?: boolean}
  | (Head & {type: 'cards'; cards: GridCard[]; columns?: 2 | 3 | 4; after?: ReactNode; ctas?: Cta[]; link?: Link})
  | {type: 'quote'; quote: Quote; background?: SectionBg}
  | (Head & {type: 'quotes'; quotes: Quote[]; link?: Link})
  | {
      type: 'split'
      id?: string
      heading: string
      body?: ReactNode
      listHeading?: string
      list?: string[]
      after?: ReactNode
      ctas?: Cta[]
      media: Media
      mediaSide?: 'left' | 'right'
      mediaClassName?: string
      background?: SectionBg
    }
  | (Head & {type: 'featureTabs'; label: string; items: FeatureTab[]; mediaSide?: 'left' | 'right'; ctas?: Cta[]})
  | (Head & {type: 'packages'; items: Deliverable[]; columns?: 2 | 3 | 4; after?: ReactNode})
  | (Head & {type: 'stats'; stats: Stat[]})
  | (Head & {type: 'compare'; rows: CompareRow[]; columns: {label: string; ours: string; theirs: string}; footnote?: string; aside?: {heading: string; text: string}})
  | {type: 'steps'; id?: string; heading: string; subheading?: string; steps: TimelineStep[]; ctas?: Cta[]; showImages?: boolean}
  | {type: 'faq'; heading: string; subheading?: string; items: {q: string; a: ReactNode}[]; background?: 'sky' | 'white'}
  | {type: 'cta'; heading: string; text?: string; ctas: Cta[]}
  | (Head & {type: 'custom'; children: ReactNode})

function SectionLink({link}: Readonly<{link: Link}>) {
  return (
    <SmartLink
      href={link.href}
      className="text-link text-base"
      {...(link.newTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
    >
      {link.label}
      <ArrowRight width={16} height={16} />
    </SmartLink>
  )
}

function BlockView({block, index}: Readonly<{block: Block; index: number}>) {
  switch (block.type) {
    case 'hero':
      return (
        <PageHero
          heading={block.heading}
          subheading={block.subheading}
          ctas={block.ctas}
          media={<MediaView media={index === 0 && block.media.type === 'image' ? {...block.media, priority: true} : block.media} className="shadow-lg" />}
        >
          {block.extra}
        </PageHero>
      )
    case 'logos':
      return <CmsLogoBand band={block.band} heading={block.heading} logos={block.logos} variant={block.marquee === false ? 'row' : 'marquee'} background={block.background ?? 'surface'} cards={block.cards} />
    case 'cards':
      return (
        <Section id={block.id} heading={block.heading} subheading={block.subheading} align={block.align} background={block.background}>
          <CardGrid cards={block.cards} columns={block.columns} />
          {block.after && <div className="mt-8 max-w-3xl text-lg leading-7 text-body">{block.after}</div>}
          {block.ctas && <CtaButtons ctas={block.ctas} className="mt-8 justify-center" />}
          {block.link && (
            <div className="mt-8">
              <SectionLink link={block.link} />
            </div>
          )}
        </Section>
      )
    case 'quote':
      return <CmsTestimonials quotes={[block.quote]} background={block.background} />
    case 'quotes':
      return <QuotesSection block={block} />
    case 'split': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {type: _type, ...props} = block
      return <SplitSection {...props} />
    }
    case 'featureTabs':
      return (
        <Section id={block.id} heading={block.heading} subheading={block.subheading} align={block.align} background={block.background}>
          <FeatureTabs items={block.items} label={block.label} mediaSide={block.mediaSide} headingLevel={block.heading ? 'h3' : 'h2'} />
          {block.ctas && <CtaButtons ctas={block.ctas} className="mt-10 justify-center" />}
        </Section>
      )
    case 'packages':
      return (
        <Section id={block.id} heading={block.heading} subheading={block.subheading} align={block.align} background={block.background}>
          <DeliverableCards items={block.items} columns={block.columns ?? 3} compact />
          {block.after}
        </Section>
      )
    case 'stats':
      return (
        <Section id={block.id} heading={block.heading} subheading={block.subheading} align={block.align} background={block.background}>
          <StatGrid stats={block.stats} />
        </Section>
      )
    case 'compare':
      return (
        <Section id={block.id} heading={block.heading} subheading={block.subheading} align={block.align} background={block.background}>
          <div className={block.aside ? 'grid items-start gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]' : undefined}>
            <CompareTable rows={block.rows} columns={block.columns} caption={block.heading ?? 'Comparison'} footnote={block.footnote} />
            {block.aside && (
              <div className="rounded-2xl bg-sky p-8">
                <h3 className="text-2xl font-semibold text-ink">{block.aside.heading}</h3>
                <p className="mt-4 text-lg leading-7 text-body">{block.aside.text}</p>
              </div>
            )}
          </div>
        </Section>
      )
    case 'steps':
      return (
        <>
          <StepsTimeline id={block.id} heading={block.heading} subheading={block.subheading} steps={block.steps} showImages={block.showImages} />
          {block.ctas && (
            <div className="-mt-6 pb-10">
              <CtaButtons ctas={block.ctas} className="justify-center" />
            </div>
          )}
        </>
      )
    case 'faq':
      return <Faq heading={block.heading} subheading={block.subheading} items={block.items} background={block.background} />
    case 'cta':
      return <CtaBanner heading={block.heading} text={block.text} ctas={block.ctas} />
    case 'custom':
      return (
        <Section id={block.id} heading={block.heading} subheading={block.subheading} align={block.align} background={block.background}>
          {block.children}
        </Section>
      )
  }
}

export function Blocks({blocks}: Readonly<{blocks: Block[]}>) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} index={i} />
      ))}
    </>
  )
}

/** Row of testimonials under a heading; the whole section is left out if every quote is hidden in Sanity. */
async function QuotesSection({block}: Readonly<{block: Extract<Block, {type: 'quotes'}>}>) {
  const quotes = await resolveQuotes(block.quotes)
  if (!quotes.length) return null
  return (
    <Section id={block.id} heading={block.heading} subheading={block.subheading} align={block.align} background={block.background}>
      {block.link && (
        <div className={block.align === 'center' ? '-mt-4 mb-10 text-center' : '-mt-4 mb-10'}>
          <SectionLink link={block.link} />
        </div>
      )}
      <Testimonials quotes={quotes} background={block.background} bare />
    </Section>
  )
}
