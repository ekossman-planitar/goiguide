import {Check} from 'lucide-react'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import {cn} from '@/lib/cn'
import {bodyComponents} from './PortableBody'

/**
 * Article body split into sections. Imported pages keep the old site's
 * elements as sections ("section break" blocks in the Studio), each with a
 * layout: plain text, text beside images or a quote, cards, highlight tiles or
 * a grey panel. Customer stories also start a new section at each top-level
 * heading, so long stories read as separate chapters with an "On this page"
 * menu. Everything stays real HTML text and headings for search engines.
 */

type Block = PortableTextBlock & {_type: string; style?: string; listItem?: string; title?: string; anchor?: string; layout?: string}
export type BodyLayout = 'plain' | 'split' | 'cards' | 'highlights' | 'panel'
export type BodySection = {id?: string; label?: string; layout: BodyLayout; blocks: Block[]}

const LAYOUTS = new Set<BodyLayout>(['plain', 'split', 'cards', 'highlights', 'panel'])
const MEDIA = new Set(['image', 'videoEmbed', 'testimonial', 'socialEmbed'])

const blockText = (b: Block) =>
  b._type === 'block' ? ((b.children as {text?: string}[] | undefined) ?? []).map((c) => c.text ?? '').join('').trim() : ''

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)

/** Splits a body at its section breaks (and, optionally, at top-level headings). */
export function splitSections(body: PortableTextBlock[], {splitAtHeadings = false} = {}): BodySection[] {
  const blocks = body as Block[]
  const top = splitAtHeadings ? (['h2', 'h3'] as const).find((h) => blocks.some((b) => b._type === 'block' && b.style === h)) : undefined

  const raw: (BodySection & {anchor?: string})[] = [{layout: 'plain', blocks: []}]
  for (const b of blocks) {
    if (b._type === 'sectionBreak') {
      raw.push({anchor: b.anchor || undefined, label: b.title || undefined, layout: LAYOUTS.has(b.layout as BodyLayout) ? (b.layout as BodyLayout) : 'plain', blocks: []})
      continue
    }
    const current = raw.at(-1)!
    // A top-level heading inside a plain section starts a new one
    if (top && b._type === 'block' && b.style === top && current.layout === 'plain' && current.blocks.length) raw.push({layout: 'plain', blocks: []})
    raw.at(-1)!.blocks.push(b)
  }

  const used = new Set<string>()
  return raw
    .filter((s) => s.blocks.length)
    .map(({anchor, ...s}) => {
      const heading = s.blocks.find((b) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
      const label = s.label || (heading ? blockText(heading) : undefined)
      let id = anchor || (label ? slugify(label) : undefined)
      if (id && used.has(id)) id = undefined
      if (id) used.add(id)
      return {...s, id, label}
    })
}

function Cards({blocks}: {blocks: Block[]}) {
  // Cards start at the section's deepest heading level (h4 if it has any, else h3); a higher
  // heading is the section title. An image right before a card heading belongs to that card.
  const level = blocks.some((b) => b._type === 'block' && b.style === 'h4') ? 'h4' : 'h3'
  const isCardHeading = (b?: Block) => b?._type === 'block' && b.style === level
  const startsCard = (b: Block, next?: Block) => isCardHeading(b) || (b._type === 'image' && isCardHeading(next))
  const intro: Block[] = []
  const cards: Block[][] = []
  blocks.forEach((b, i) => {
    const prev = blocks[i - 1]
    // An image directly before a card heading belongs to that card
    if (startsCard(b, blocks[i + 1]) && !(prev && prev._type === 'image' && cards.at(-1)?.at(-1) === prev && b._type === 'block')) cards.push([b])
    else if (cards.length) cards.at(-1)!.push(b)
    else intro.push(b)
  })
  if (cards.length < 2) return <Flow blocks={blocks} />
  return (
    <>
      {intro.length > 0 && <Flow blocks={intro} />}
      <div className={cn('mt-8 grid gap-6 sm:grid-cols-2', cards.length % 3 === 0 && 'lg:grid-cols-3')}>
        {cards.map((card) => (
          <div
            key={card[0]._key}
            className="rounded-2xl bg-surface p-6 [&_figure]:mt-0 [&_h3]:mt-4 [&_h3]:text-xl [&_h4]:mt-4 [&_h4]:text-lg [&_p]:mt-2 [&_p]:text-base [&>:first-child]:mt-0 [&>:first-child_h3]:mt-0"
          >
            <PortableText value={card} components={bodyComponents} />
          </div>
        ))}
      </div>
    </>
  )
}

const highlightComponents: PortableTextComponents = {
  ...bodyComponents,
  list: {bullet: ({children}) => <ul className="mt-6 grid gap-3 sm:grid-cols-2">{children}</ul>},
  listItem: {
    bullet: ({children}) => (
      <li className="flex items-start gap-3 rounded-xl bg-surface p-4 text-base font-medium leading-snug text-ink">
        <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary-hover" strokeWidth={2.5} />
        <span>{children}</span>
      </li>
    ),
  },
}

function Flow({blocks, components = bodyComponents}: {blocks: Block[]; components?: PortableTextComponents}) {
  return <PortableText value={blocks} components={components} />
}

function SectionContent({section}: {section: BodySection}) {
  const {layout, blocks} = section
  if (layout === 'split') {
    const text = blocks.filter((b) => !MEDIA.has(b._type))
    const media = blocks.filter((b) => MEDIA.has(b._type))
    if (!text.length || !media.length) return <Flow blocks={blocks} />
    return (
      <div className="grid items-center gap-x-10 lg:grid-cols-2">
        <div className="min-w-0 [&>:first-child]:mt-0">
          <Flow blocks={text} />
        </div>
        <div className="min-w-0 [&>:first-child]:mt-8 lg:[&>:first-child]:mt-0">
          <Flow blocks={media} />
        </div>
      </div>
    )
  }
  if (layout === 'cards') return <Cards blocks={blocks} />
  if (layout === 'highlights') return <Flow blocks={blocks} components={highlightComponents} />
  if (layout === 'panel')
    return (
      <div className="rounded-2xl bg-surface p-6 sm:p-10 [&>:first-child]:mt-0">
        <Flow blocks={blocks} />
      </div>
    )
  return <Flow blocks={blocks} />
}

/** Renders pre-split sections, separated by a rule and space. */
export function SectionedBody({sections}: {sections: BodySection[]}) {
  // A plain body with no breaks renders exactly like before
  if (sections.length === 1 && sections[0].layout === 'plain' && !sections[0].id) return <Flow blocks={sections[0].blocks} />
  return (
    <>
      {sections.map((s, i) => (
        <section
          key={s.blocks[0]._key}
          id={s.id}
          className={cn('scroll-mt-28 [&>:first-child]:mt-0', i > 0 && 'mt-14 border-t border-line pt-14')}
        >
          <SectionContent section={s} />
        </section>
      ))}
    </>
  )
}
