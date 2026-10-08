import type {ReactNode} from 'react'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {MediaView} from './MediaView'
import type {Img, Media} from './types'

export type GridCard = {
  title: string
  text?: ReactNode
  /** Small icon above the title */
  icon?: Img
  /** Larger image at the top of the card */
  image?: Img
  /** Video or embed at the top of the card (instead of an image) */
  media?: Media
  link?: {label: string; href: string; newTab?: boolean}
}

const cols = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

/** Grid of simple cards (icon or image, title, text, optional link). */
export function CardGrid({cards, columns = 4}: {cards: GridCard[]; columns?: 2 | 3 | 4}) {
  return (
    <ul className={cn('grid gap-6', cols[columns])}>
      {cards.map((card) => (
        <li
          key={card.title}
          className="flex flex-col rounded-2xl border border-[#e7edf6] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]"
        >
          {card.image && (
            <div className="relative mb-5 overflow-hidden rounded-xl bg-surface">
              <FallbackImage
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width ?? 480}
                height={card.image.height ?? 480}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-square h-auto w-full object-cover"
                fallback={<div className="aspect-square w-full" />}
              />
            </div>
          )}
          {card.media && <MediaView media={card.media} className="mb-5 rounded-xl" sizes="(min-width: 1024px) 33vw, 100vw" />}
          {card.icon && (
            <FallbackImage
              src={card.icon.src}
              alt=""
              width={card.icon.width ?? 48}
              height={card.icon.height ?? 48}
              className="mb-5 h-12 w-12 object-contain"
              fallback={<span className="mb-5 block h-12 w-12 rounded-xl bg-primary-soft" aria-hidden />}
            />
          )}
          <h3 className="text-xl leading-7 font-bold text-ink">{card.title}</h3>
          {card.text && <div className="mt-2 flex-1 text-base leading-6 text-body [&_p+p]:mt-3 [&_strong]:text-ink">{card.text}</div>}
          {card.link && (
            <SmartLink
              href={card.link.href}
              {...(card.link.newTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
              className="group mt-5 inline-flex items-center gap-1.5 font-semibold text-primary"
            >
              {card.link.label}
              <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
            </SmartLink>
          )}
        </li>
      ))}
    </ul>
  )
}
