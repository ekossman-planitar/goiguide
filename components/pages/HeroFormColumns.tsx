import type {ReactNode} from 'react'
import {HubSpotForm} from '@/components/forms/HubSpotForm'

type Props = {
  heading: string
  subheading?: ReactNode
  /** Extra copy or buttons under the subheading */
  children?: ReactNode
  /** Heading above the form inside the card */
  formHeading?: string
  formText?: string
  /** HubSpot form ID, embedded inline as on the live page */
  formId: string
  /** Anchor on the form card, so in-page links can jump to it */
  formAnchorId?: string
}

/**
 * Two-column page hero for a `custom` block: h1 and copy on the left, an inline
 * HubSpot form in a white card on the right (stacked on mobile).
 */
export function HeroFormColumns({heading, subheading, children, formHeading, formText, formId, formAnchorId}: Props) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="min-w-0">
        <h1 className="text-balance text-[40px] font-semibold leading-[1.15] text-ink md:text-[56px]">{heading}</h1>
        {subheading && <p className="mt-6 text-2xl leading-9 text-muted">{subheading}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
      <div id={formAnchorId} className="min-w-0 scroll-mt-28 rounded-2xl border border-[#e7edf6] bg-white p-6 shadow-lg md:p-8">
        {formHeading && <h2 className="text-2xl font-semibold text-ink md:text-[28px]">{formHeading}</h2>}
        {formText && <p className="mt-3 text-base leading-6 text-muted">{formText}</p>}
        <HubSpotForm formId={formId} className="mt-6 min-h-[320px]" />
      </div>
    </div>
  )
}
