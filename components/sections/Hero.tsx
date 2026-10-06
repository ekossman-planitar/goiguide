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
  const {eyebrow, heading, subheading, cta, secondaryCta, media} = data
  const hasPrimary = Boolean(cta?.href && cta.label)
  const hasSecondary = Boolean(secondaryCta?.href && secondaryCta.label)

  return (
    <section className="pb-10 pt-8 lg:pb-12 lg:pt-10">
      {/* Layout matches live: stacked and centred below 1280px, two columns from 1280px */}
      <Container className="flex flex-col items-center gap-8 min-[1025px]:gap-[72px] xl:flex-row">
        <div className="flex w-full min-w-0 flex-1 flex-col items-center text-center xl:items-start xl:text-left">
          {eyebrow?.href && eyebrow.label && (
            <SmartLink
              href={eyebrow.href}
              className="mb-6 inline-flex items-center gap-2 rounded-[28px] bg-cream px-3 py-2 text-xs leading-[18px] font-semibold text-ink transition-opacity hover:opacity-85"
            >
              {eyebrow.label}
              <ArrowRight width={14} height={14} />
            </SmartLink>
          )}

          {heading && (
            <h1 className="text-balance text-[40px] font-bold leading-[normal] text-ink md:text-[56px]">
              {heading}
            </h1>
          )}

          {subheading && <p className="mt-6 text-xl leading-[30px] text-muted">{subheading}</p>}

          {(hasPrimary || hasSecondary) && (
            <div className="mt-8 flex flex-wrap justify-center gap-3 xl:justify-start">
              {hasPrimary && (
                <Button href={cta!.href!} size="lg">
                  {cta!.label}
                </Button>
              )}
              {hasSecondary && (
                <Button href={secondaryCta!.href!} size="lg" variant="secondary">
                  {secondaryCta!.label}
                </Button>
              )}
            </div>
          )}

          {footer && <div className="mt-8">{footer}</div>}
        </div>

        <HeroMedia media={media} />
      </Container>
    </section>
  )
}
