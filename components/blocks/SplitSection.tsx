import type {ReactNode} from 'react'
import {Container} from '@/components/ui/Container'
import {cn} from '@/lib/cn'
import {CheckList} from './CheckList'
import {CtaButtons} from './CtaButtons'
import {MediaView} from './MediaView'
import type {SectionBg} from './Section'
import type {Cta, Media} from './types'

type Props = {
  id?: string
  eyebrow?: string
  heading: string
  /** Paragraphs or other copy under the heading */
  body?: ReactNode
  listHeading?: string
  list?: string[]
  /** Copy after the list */
  after?: ReactNode
  ctas?: Cta[]
  media: Media
  mediaSide?: 'left' | 'right'
  /** Extra classes for the media (e.g. limit a portrait video's width) */
  mediaClassName?: string
  background?: SectionBg
}

const bgs: Record<SectionBg, string> = {white: 'bg-white', surface: 'bg-surface', sky: 'bg-sky'}

/** Text beside an image, video or embed. */
export function SplitSection({id, eyebrow, heading, body, listHeading, list, after, ctas = [], media, mediaSide = 'right', mediaClassName, background = 'white'}: Props) {
  return (
    <section id={id} className={cn(bgs[background], 'scroll-mt-24 py-16 lg:py-[60px]')}>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn('min-w-0', mediaSide === 'left' && 'lg:order-2')}>
          {eyebrow && <p className="mb-3 text-sm font-semibold text-primary">{eyebrow}</p>}
          <h2 className="text-balance text-[32px] font-bold leading-[normal] text-ink md:text-5xl md:leading-[normal]">{heading}</h2>
          {body && <div className="mt-5 space-y-4 text-lg leading-7 text-body">{body}</div>}
          {listHeading && <h3 className="mt-8 text-lg font-bold text-ink">{listHeading}</h3>}
          {list && <CheckList items={list} className={listHeading ? 'mt-4' : 'mt-6'} />}
          {after && <div className="mt-6 space-y-4 text-lg leading-7 text-body">{after}</div>}
          <CtaButtons ctas={ctas} className="mt-8" />
        </div>
        <div className={cn('min-w-0', mediaSide === 'left' && 'lg:order-1')}>
          <MediaView media={media} className={mediaClassName} />
        </div>
      </Container>
    </section>
  )
}
