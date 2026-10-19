import {CheckList} from '@/components/blocks/CheckList'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {MediaView} from '@/components/blocks/MediaView'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {RatingRow} from '@/components/sections/RatingRow'
import {Container} from '@/components/ui/Container'
import {cn} from '@/lib/cn'
import {lpCtas, lpImg, lpMedia} from './convert'
import type {LpSection} from './types'

type Hero = LpSection & {
  style?: 'form' | 'media' | 'centered' | 'banner'
  backgroundImage?: Parameters<typeof lpImg>[0]
  eyebrow?: string
  heading?: string
  subheading?: string
  bullets?: string[]
  buttons?: unknown
  showRating?: boolean
  media?: Parameters<typeof lpMedia>[0]
  formHeading?: string
  formText?: string
  centerText?: boolean
  hubspotFormId?: string
  meetingsUrl?: string
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
  if (style === 'banner') return <BannerHero s={s} formAnchor={formAnchor} />
  const raw = style === 'media' ? lpMedia(s.media) : undefined
  const media = raw?.type === 'image' ? {...raw, priority: true} : raw
  const ctas = lpCtas(s.buttons)
  const meetings = style === 'form' && s.meetingsUrl ? `${s.meetingsUrl}${s.meetingsUrl.includes('?') ? '&' : '?'}embed=true` : null
  const form = meetings ? (
    // HubSpot meetings booking calendar (live: HubSpot's meetings embed script)
    <div id={formAnchor ? 'form' : undefined} className="scroll-mt-24 min-w-0">
      {s.formHeading && <h2 className="mb-4 text-2xl font-semibold text-ink">{s.formHeading}</h2>}
      <iframe src={meetings} title="Book a time with an iGuide Specialist" className="h-[690px] w-full rounded-2xl border border-line bg-white" loading="lazy" />
    </div>
  ) : style !== 'media' && (s.hubspotFormId || s._previewForm) ? (
    <div id={formAnchor ? 'form' : undefined} className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 shadow-lg md:p-8">
      {s.formHeading && <h2 className="text-2xl font-semibold text-ink">{s.formHeading}</h2>}
      {s.formText && <p className="mt-2 text-body">{s.formText}</p>}
      {s.hubspotFormId ? <HubSpotForm formId={s.hubspotFormId} className="mt-4 min-h-[320px]" /> : <div className="mt-4"><FormPlaceholder /></div>}
    </div>
  ) : null

  const centered = style === 'centered'
  const text = (
    <div className={cn('min-w-0', centered && 'mx-auto max-w-3xl text-center')}>
      {s.eyebrow && <p className="font-semibold text-primary">{s.eyebrow}</p>}
      <h1 className="mt-3 text-[40px] leading-[1.15] font-semibold text-balance text-ink md:text-5xl">{s.heading}</h1>
      {s.subheading && <p className="mt-6 text-xl leading-[30px] whitespace-pre-line text-muted">{s.subheading}</p>}
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

/**
 * Banner hero (thank-you and ad pages, as on live): headline and text in white
 * over a full-width photo, darkened by a gradient so the text stays readable.
 * With a HubSpot form ID the form sits in a white card on the right (live ad pages).
 */
function BannerHero({s, formAnchor}: {s: Hero; formAnchor: boolean}) {
  const bg = lpImg(s.backgroundImage)
  const ctas = lpCtas(s.buttons)
  const hasForm = !!(s.hubspotFormId || s._previewForm)
  const center = !!s.centerText
  const text = (
    <div className={cn('min-w-0 space-y-3 text-white', center && 'mx-auto max-w-[1080px] text-center')}>
      {s.eyebrow && <p className="font-semibold text-white/85">{s.eyebrow}</p>}
      <h1 className="text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">{s.heading}</h1>
      {s.subheading && (
        <p className={cn('whitespace-pre-line', center ? 'mx-auto max-w-[750px] text-xl text-white/90' : 'text-3xl font-light md:text-4xl')}>{s.subheading}</p>
      )}
      {ctas.length > 0 && <CtaButtons ctas={ctas} className="mt-8" />}
    </div>
  )
  return (
    <section className={cn('relative isolate flex items-center overflow-hidden bg-primary', hasForm ? 'min-h-[700px] pt-36 pb-20' : 'min-h-[520px] py-20 lg:min-h-[600px]')}>
      {bg && (
        // eslint-disable-next-line @next/next/no-img-element -- full-bleed background photo
        <img src={bg.src} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" fetchPriority="high" />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/30 bg-gradient-to-b from-black/75" />
      <Container>
        {hasForm ? (
          <div className={center ? 'flex flex-col items-center gap-10' : 'grid gap-8 lg:grid-cols-2'}>
            {text}
            <div id={formAnchor ? 'form' : undefined} className={cn('min-w-0 scroll-mt-24 rounded-xl bg-white px-6 py-8 text-ink', center && 'w-full max-w-[750px]')}>
              {s.formHeading && <h3 className={cn('text-2xl font-semibold', !s.formText && 'mb-6', center && 'text-center')}>{s.formHeading}</h3>}
              {s.formText && <p className={cn('mt-2 mb-6 text-body', center && 'text-center')}>{s.formText}</p>}
              {s.hubspotFormId ? <HubSpotForm formId={s.hubspotFormId} className="min-h-[320px]" /> : <FormPlaceholder />}
            </div>
          </div>
        ) : (
          text
        )}
      </Container>
    </section>
  )
}
