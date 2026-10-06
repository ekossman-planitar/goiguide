import type {ReactNode} from 'react'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import type {HeroData} from '@/sanity/lib/types'
import {HeroMedia} from './HeroMedia'

type HeroProps = {
  data: HeroData
  /** Extra content under the button (e.g. the hard-coded rating row). */
  footer?: ReactNode
}

/** Two-column hero: copy on the left, image or video on the right. */
export function Hero({data, footer}: HeroProps) {
  const {eyebrow, heading, subheading, cta, media} = data

  return (
    <section className="pb-10 pt-8 lg:pb-12 lg:pt-10">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          {eyebrow?.href && eyebrow.label && (
            <SmartLink
              href={eyebrow.href}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-85"
            >
              {eyebrow.label}
              <ArrowRight width={16} height={16} />
            </SmartLink>
          )}

          {heading && (
            <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl xl:text-[64px]">
              {heading}
            </h1>
          )}

          {subheading && <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{subheading}</p>}

          {cta?.href && cta.label && (
            <Button href={cta.href} size="lg" className="mt-8">
              {cta.label}
            </Button>
          )}

          {footer && <div className="mt-8">{footer}</div>}
        </div>

        <HeroMedia media={media} />
      </Container>
    </section>
  )
}
