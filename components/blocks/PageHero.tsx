import type {ReactNode} from 'react'
import {Container} from '@/components/ui/Container'
import {Pill} from '@/components/ui/Pill'
import {CtaButtons} from './CtaButtons'
import type {Cta} from './types'

type Props = {
  eyebrow?: {label: string; href?: string}
  heading: string
  subheading?: string
  /** Extra copy under the subheading */
  children?: ReactNode
  ctas?: Cta[]
  /** Right column: keeps the product visual above the fold */
  media: ReactNode
}

/** Two-column page hero: copy left, visual right (stacked on mobile). */
export function PageHero({eyebrow, heading, subheading, children, ctas = [], media}: Props) {
  return (
    <section className="pt-8 pb-12 lg:pt-12 lg:pb-[60px]">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          {eyebrow && (
            <div className="mb-6">
              <Pill {...eyebrow} />
            </div>
          )}
          <h1 className="text-balance text-[40px] font-bold leading-[normal] text-ink md:text-[56px]">{heading}</h1>
          {subheading && <p className="mt-6 text-xl leading-[30px] text-muted">{subheading}</p>}
          {children && <div className="mt-4 text-lg leading-7 text-muted">{children}</div>}
          <CtaButtons ctas={ctas} className="mt-8" />
        </div>
        <div className="min-w-0">{media}</div>
      </Container>
    </section>
  )
}
