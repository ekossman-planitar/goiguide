import type {ReactNode} from 'react'
import {Container} from '@/components/ui/Container'
import {SectionHeading} from '@/components/ui/SectionHeading'
import {cn} from '@/lib/cn'

export type SectionBg = 'white' | 'surface' | 'sky'
const bgs: Record<SectionBg, string> = {white: 'bg-white', surface: 'bg-surface', sky: 'bg-sky'}

type Props = {
  id?: string
  heading?: string
  subheading?: string
  align?: 'left' | 'center'
  background?: SectionBg
  children: ReactNode
  className?: string
}

/** Standard page section: background band, page-width container, optional heading. */
export function Section({id, heading, subheading, align = 'left', background = 'white', children, className}: Props) {
  return (
    <section id={id} className={cn(bgs[background], 'scroll-mt-24 py-16 lg:py-[60px]', className)}>
      <Container>
        {heading && (
          <SectionHeading
            heading={heading}
            subheading={subheading}
            align={align}
            className={cn('mb-10', align === 'center' && 'max-w-3xl')}
          />
        )}
        {children}
      </Container>
    </section>
  )
}
