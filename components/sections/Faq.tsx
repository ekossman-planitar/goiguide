'use client'

import {useState, type ReactNode} from 'react'
import {cn} from '@/lib/cn'
import {Container} from '@/components/ui/Container'
import {SectionHeading} from '@/components/ui/SectionHeading'
import {ChevronDown} from '@/components/ui/icons'

type Props = {
  heading: string
  subheading?: string
  /** Answers can include lists and links */
  items: {q: string; a: ReactNode}[]
  /** How many questions show before "Show more" */
  initiallyVisible?: number
  background?: 'sky' | 'white'
}

/** Accordion FAQ. All answers are in the HTML (for search engines); extra questions are revealed with "Show more". */
export function Faq({heading, subheading, items, initiallyVisible = 3, background = 'sky'}: Props) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = items.length > initiallyVisible

  return (
    <section className={cn(background === 'sky' ? 'bg-sky' : 'bg-white', 'py-16 lg:py-[60px]')}>
      <Container size="medium">
        <SectionHeading align="center" heading={heading} subheading={subheading} />
        <ul className="mt-10 space-y-3">
          {items.map((item, i) => (
            <li key={item.q} hidden={!expanded && i >= initiallyVisible}>
              <details className="group rounded-xl border border-[#e7edf6] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-lg leading-7 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown width={20} height={20} className="shrink-0 text-primary transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-base leading-6 text-body [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:mt-3">
                  {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1.5 font-semibold text-primary"
            >
              {expanded ? 'Show less' : 'Show more'}
              <ChevronDown width={16} height={16} className={expanded ? 'rotate-180' : ''} />
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}
