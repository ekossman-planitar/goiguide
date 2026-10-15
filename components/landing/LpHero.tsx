import {CheckList} from '@/components/blocks/CheckList'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {MediaView} from '@/components/blocks/MediaView'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {RatingRow} from '@/components/sections/RatingRow'
import {Container} from '@/components/ui/Container'
import {cn} from '@/lib/cn'
import {lpCtas, lpMedia} from './convert'
import type {LpSection} from './types'

type Hero = LpSection & {
  style?: 'form' | 'media' | 'centered'
  eyebrow?: string
  heading?: string
  subheading?: string
  bullets?: string[]
  buttons?: unknown
  showRating?: boolean
  media?: Parameters<typeof lpMedia>[0]
  formHeading?: string
  hubspotFormId?: string
  _previewForm?: boolean
}

/** Stand-in for the HubSpot form on template previews */
export function FormPlaceholder() {
  return (
    <div className="flex min-h-[320px] flex-col justify-center gap-3 rounded-xl border-2 border-dashed border-line p-6 text-center text-muted">
      <p className="font-semibold text-ink">HubSpot form</p>
      <p className="text-sm">Paste the form ID in the Studio and the real form shows here.</p>
    </div>
  )
}

/** Landing page hero: text with a form beside it, text with media, or centred text (with the form below if there is one). */
export function LpHero({section, formAnchor}: {section: LpSection; formAnchor: boolean}) {
  const s = section as Hero
  const style = s.style ?? 'form'
  const raw = style === 'media' ? lpMedia(s.media) : undefined
  const media = raw?.type === 'image' ? {...raw, priority: true} : raw
  const ctas = lpCtas(s.buttons)
  const form = style !== 'media' && (s.hubspotFormId || s._previewForm) ? (
    <div id={formAnchor ? 'form' : undefined} className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 shadow-lg md:p-8">
      {s.formHeading && <h2 className="text-2xl font-semibold text-ink">{s.formHeading}</h2>}
      {s.hubspotFormId ? <HubSpotForm formId={s.hubspotFormId} className="mt-4 min-h-[320px]" /> : <div className="mt-4"><FormPlaceholder /></div>}
    </div>
  ) : null

  const centered = style === 'centered'
  const text = (
    <div className={cn('min-w-0', centered && 'mx-auto max-w-3xl text-center')}>
      {s.eyebrow && <p className="font-semibold text-primary">{s.eyebrow}</p>}
      <h1 className="mt-3 text-[40px] leading-[1.15] font-semibold text-balance text-ink md:text-5xl">{s.heading}</h1>
      {s.subheading && <p className="mt-6 text-xl leading-[30px] text-muted">{s.subheading}</p>}
      {s.bullets?.length ? <CheckList items={s.bullets} className={cn('mt-6', centered && 'mx-auto w-fit text-left')} /> : null}
      {ctas.length > 0 && <CtaButtons ctas={ctas} className={cn('mt-8', centered && 'justify-center')} />}
      {s.showRating && (
        <div className={cn('mt-8', centered && 'flex justify-center')}>
          <RatingRow />
        </div>
      )}
    </div>
  )

  return (
    <section className="bg-surface py-12 lg:py-20">
      <Container>
        {centered ? (
          <>
            {text}
            {form && <div className="mx-auto mt-10 max-w-xl">{form}</div>}
          </>
        ) : (
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {text}
            <div className="min-w-0">{form ?? (media ? <MediaView media={media} /> : null)}</div>
          </div>
        )}
      </Container>
    </section>
  )
}
