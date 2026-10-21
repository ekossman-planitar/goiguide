import {CheckList} from '@/components/blocks/CheckList'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {RatingRow} from '@/components/sections/RatingRow'
import {Container} from '@/components/ui/Container'

type Props = {
  heading: string
  subheading?: string
  bullets?: string[]
  /** Shows the "4.9/5 based on 30+ reviews" Capterra row */
  rating?: boolean
  /** Heading above the form inside the card */
  formHeading?: string
  /** HubSpot form ID (embedded inline, as on the live page) */
  formId: string
}

/** Page hero with copy on the left and an inline HubSpot form in a white card on the right. */
export function FormHero({heading, subheading, bullets, rating, formHeading, formId}: Readonly<Props>) {
  return (
    <section id="hero" className="bg-surface py-12 lg:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0">
          <h1 className="text-balance text-[40px] font-semibold leading-[1.15] text-ink md:text-5xl">{heading}</h1>
          {subheading && <p className="mt-6 text-xl leading-[30px] text-muted">{subheading}</p>}
          {bullets?.length ? <CheckList items={bullets} className="mt-6" /> : null}
          {rating && (
            <div className="mt-8 [&>div]:justify-start">
              <RatingRow />
            </div>
          )}
        </div>
        <div className="min-w-0 rounded-2xl border border-line bg-white p-6 shadow-lg md:p-8">
          {formHeading && <h2 className="text-center text-2xl font-semibold text-ink md:text-[28px]">{formHeading}</h2>}
          <HubSpotForm formId={formId} className="mt-6 min-h-[320px]" />
        </div>
      </Container>
    </section>
  )
}
