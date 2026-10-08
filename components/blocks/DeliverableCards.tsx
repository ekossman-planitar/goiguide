import {Button} from '@/components/ui/Button'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {cn} from '@/lib/cn'
import {CheckList} from './CheckList'
import type {Img} from './types'

export type Deliverable = {
  title: string
  /** e.g. "Best for real estate listings…" */
  summary?: string
  image: Img
  includesLabel?: string
  includes: string[]
  /** e.g. "Requires: iGUIDE Standard or Premium" */
  note?: string
  /** e.g. {label: 'Starting at', value: '$64.50 USD'} */
  price?: {label: string; value: string}
  cta?: {label: string; href: string; newTab?: boolean}
}

const cols = {2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'md:grid-cols-2 xl:grid-cols-4'}

/** Product/deliverable cards: image, summary, checklist, requirement note and a sample link. */
export function DeliverableCards({
  items,
  columns = 4,
  compact = false,
}: {
  items: Deliverable[]
  columns?: 2 | 3 | 4
  /** Shorter image and tighter list, so a row of package cards fits one screen */
  compact?: boolean
}) {
  return (
    <ul className={cn('grid gap-6', cols[columns])}>
      {items.map((item) => (
        <li
          key={item.title}
          className="flex flex-col rounded-2xl border border-[#e7edf6] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]"
        >
          <h3 className="text-xl leading-7 font-bold text-ink">{item.title}</h3>
          {item.summary && <p className="mt-2 text-base leading-6 text-muted">{item.summary}</p>}
          <FallbackImage
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width ?? 462}
            height={item.image.height ?? 346}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            className={cn('mt-5 w-full rounded-xl', compact ? 'h-32 object-contain object-left' : 'h-auto')}
            fallback={<div className={cn('mt-5 w-full rounded-xl bg-surface', compact ? 'h-32' : 'aspect-[4/3]')} />}
          />
          {item.price && (
            <p className={compact ? 'mt-3' : 'mt-5'}>
              <span className="block text-sm font-medium text-muted">{item.price.label}</span>
              <span className="text-2xl leading-8 font-bold text-ink">{item.price.value}</span>
            </p>
          )}
          {item.includesLabel && <p className={cn('text-sm font-semibold text-ink', compact ? 'mt-4' : 'mt-6')}>{item.includesLabel}</p>}
          <CheckList
            items={item.includes}
            className={cn(item.includesLabel ? 'mt-3' : compact ? 'mt-4' : 'mt-6', compact && 'space-y-1.5 [&_li]:text-[15px] [&_li]:leading-[22px]')}
          />
          <div className={cn('mt-auto', compact ? 'pt-4' : 'pt-6')}>
            {item.note && <p className="text-sm leading-5 font-medium text-muted">{item.note}</p>}
            {item.cta && (
              <Button href={item.cta.href} variant="secondary" size="lg" className="mt-4 w-full" newTab={item.cta.newTab}>
                {item.cta.label}
              </Button>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
