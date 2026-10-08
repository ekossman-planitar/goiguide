import type {ReactNode} from 'react'
import {cn} from '@/lib/cn'

type Props = {
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  /** Rendered above the heading (e.g. a pill). */
  eyebrow?: ReactNode
  className?: string
}

/** Section h2 + subheading, sized to match the live site (48/32px, 20px sub). */
export function SectionHeading({heading, subheading, align = 'left', eyebrow, className}: Props) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <div className={cn('mb-6', align === 'center' && 'flex justify-center')}>{eyebrow}</div>}
      <h2 className="text-balance text-[32px] font-bold leading-[normal] text-ink md:text-5xl md:leading-[normal]">
        {heading}
      </h2>
      {subheading && <p className="mt-4 text-xl leading-[30px] text-muted">{subheading}</p>}
    </div>
  )
}
