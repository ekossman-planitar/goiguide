import {FallbackImage} from '@/components/ui/FallbackImage'
import {ArrowRight} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import type {Img} from './types'

export type LogoCard = {name: string; text: string; logo: Img; href: string}

/** Partner cards: logo, name, description and an external "Learn more" link. */
export function LogoCards({items, columns = 3, headingLevel = 'h3'}: {items: LogoCard[]; columns?: 2 | 3 | 4; headingLevel?: 'h3' | 'h4'}) {
  const Heading = headingLevel
  return (
    <ul className={cn('grid gap-6 sm:grid-cols-2', columns === 3 && 'lg:grid-cols-3', columns === 4 && 'lg:grid-cols-4')}>
      {items.map((item) => (
        <li key={item.name} className="flex flex-col rounded-2xl border border-[#e7edf6] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
          <div className="flex h-14 items-center">
            <FallbackImage
              src={item.logo.src}
              alt={item.logo.alt}
              width={item.logo.width ?? 200}
              height={item.logo.height ?? 56}
              className="h-12 w-auto max-w-[180px] object-contain object-left"
              fallback={<span className="text-lg font-bold text-ink">{item.name}</span>}
            />
          </div>
          <Heading className="mt-5 text-lg leading-7 font-bold text-ink">{item.name}</Heading>
          <p className="mt-2 flex-1 text-base leading-6 text-body">{item.text}</p>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Learn more about ${item.name} (opens in a new tab)`}
            className="group mt-5 inline-flex items-center gap-1.5 font-semibold text-primary"
          >
            Learn more
            <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </li>
      ))}
    </ul>
  )
}
