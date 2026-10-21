import {Container} from '@/components/ui/Container'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {Marquee} from '@/components/ui/Marquee'
import {cn} from '@/lib/cn'
import type {SectionBg} from './Section'
import type {Img} from './types'

type Props = {
  heading?: string
  logos: Img[]
  /** Static centred row, or an endless scrolling strip for longer lists */
  variant?: 'row' | 'marquee'
  background?: SectionBg
  /** Each logo on its own white card (as on live for software / portal integrations), so logos with a white box blend in */
  cards?: boolean
}

const bgs: Record<SectionBg, string> = {white: 'bg-white', surface: 'bg-surface', sky: 'bg-sky'}

/** Band of partner / customer logos. Logos are not links. */
export function LogoBand({heading, logos, variant = 'row', background = 'white', cards = false}: Readonly<Props>) {
  const logo = (l: Img) => (
    <FallbackImage
      src={l.src}
      alt={l.alt}
      width={l.width ?? 170}
      height={l.height ?? 50}
      draggable={false}
      className="h-10 w-auto max-w-[150px] object-contain md:h-[50px] md:max-w-[170px]"
      fallback={<span className="text-sm font-semibold text-muted">{l.alt}</span>}
    />
  )
  return (
    <section className={cn(bgs[background], 'py-10')}>
      <Container>
        {heading && <p className="mb-6 text-center text-base leading-6 text-body">{heading}</p>}
        {variant === 'marquee' && (
          <Marquee
            label={heading ?? 'Logos'}
            itemKeys={logos.map((l) => l.src)}
            items={logos.map((l) => (
              <div key={l.src} className="flex h-20 items-center px-8 lg:px-11">
                {logo(l)}
              </div>
            ))}
          />
        )}
        {variant !== 'marquee' && cards && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {logos.map((l) => (
              <li key={l.src} className="flex h-24 items-center justify-center rounded-2xl border border-line bg-white px-6 shadow-sm md:h-[120px]">
                {/* Same display size as live (its width attribute), so small logo files aren't stretched further */}
                <FallbackImage
                  src={l.src}
                  alt={l.alt}
                  width={l.width ?? 170}
                  height={l.height ?? 50}
                  draggable={false}
                  className="h-auto max-h-12 w-auto max-w-full object-contain"
                  style={{maxWidth: l.width ?? 170}}
                  fallback={<span className="text-sm font-semibold text-muted">{l.alt}</span>}
                />
              </li>
            ))}
          </ul>
        )}
        {variant !== 'marquee' && !cards && (
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
            {logos.map((l) => (
              <li key={l.src}>{logo(l)}</li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}
