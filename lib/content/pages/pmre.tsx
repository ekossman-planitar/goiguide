/** /pmre — copy, images and entry form from the live page (checked 2026-10-14). */
import type {ReactNode} from 'react'
import {BedDouble, Car, Gift, Plane, Presentation, Ticket} from 'lucide-react'
import type {Block} from '@/components/blocks/Blocks'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {SmartLink} from '@/components/ui/SmartLink'

export const meta = {
  title: 'Win a Free Trip to PMRE 2026: iGuide × Upmarket Giveaway | iGuide',
  description:
    'Enter for a chance to win an all-expenses-paid trip to PMRE 2026 in Las Vegas, including flights, 3 nights at The Palms, and full conference access. Follow @go_iguide and @upmarketpod on Instagram to enter.',
  path: '/pmre',
  ogImage: '/assets/pmre-2026-thumbnail.png',
}

const ig = (href: string, handle: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">
    {handle}
  </a>
)

const iconClass = 'mt-0.5 h-5 w-5 shrink-0 text-rea-red'
const prizes: {icon: ReactNode; text: string}[] = [
  {icon: <Ticket className={iconClass} aria-hidden="true" />, text: 'Full-access ticket to PMRE (November 17-19, 2026)'},
  {icon: <Plane className={iconClass} aria-hidden="true" />, text: 'Round-trip flight from anywhere in the continental US or Canada'},
  {icon: <BedDouble className={iconClass} aria-hidden="true" />, text: '3-night stay at The Palms, Las Vegas'},
  {icon: <Car className={iconClass} aria-hidden="true" />, text: 'Private car service to and from the airport'},
  {icon: <Gift className={iconClass} aria-hidden="true" />, text: 'iGuide swag pack to take to the event'},
  {icon: <Presentation className={iconClass} aria-hidden="true" />, text: '1 free PMRE Workshop pass'},
]

const steps: ReactNode[] = [
  <>Follow {ig('https://www.instagram.com/upmarketpod/?hl=en', '@upmarketpod')} on Instagram</>,
  <>Follow {ig('https://www.instagram.com/go_iguide/', '@go_iguide')} on Instagram</>,
  <>Fill out and submit the entry form on this page</>,
]

const draws = [
  ['Launch date:', 'April 21, 2026'],
  ['Draw 1:', 'June 16, 2026'],
  ['Draw 2:', 'August 18, 2026'],
  ['Draw 3:', 'October 13, 2026'],
]

const photos = [
  {src: '/assets/PMRE/2025/IMG_1262.jpeg', width: 3024, height: 4032},
  {src: '/assets/PMRE/2025/IMG_1250.jpeg', width: 3024, height: 4032},
  {src: '/assets/PMRE/2025/IMG_1203.jpg', width: 844, height: 769},
  {src: '/assets/PMRE/2025/IMG_1204.jpg', width: 1009, height: 828},
  {src: '/assets/PMRE/2025/IMG_1272.jpg', width: 3024, height: 3125},
  {src: '/assets/PMRE/2025/IMG_1256.jpeg', width: 3024, height: 4032},
  {src: '/assets/PMRE/2025/IMG_1247.jpg', width: 1170, height: 1398},
]

const card = 'rounded-2xl border border-line bg-white p-6 shadow-card md:p-8'
const cardHeading = 'text-2xl font-semibold text-ink'

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Your all-expenses-paid trip to PMRE 2026 awaits',
    subheading: 'Not one. 3 winners. Flights, hotel and conference passes, all on iGuide.',
    extra: (
      <div className="space-y-6">
        <FallbackImage src="/assets/iGUIDE_upmarket_Logos-v2.png" alt="logo - upmarket logo" width={2447} height={523} sizes="300px" className="h-auto w-full max-w-[300px]" />
        {/* Entry form (live target id: #iguide-form-top) */}
        <div id="iguide-form-top" className={card}>
          <HubSpotForm formId="ed90c315-755e-4969-9b3e-154e6c83c3aa" className="min-h-[320px]" />
        </div>
      </div>
    ),
    // Live used this as the hero background
    media: {type: 'image', image: {src: '/assets/Uploads/Road-to-PMRE_-Export.png', alt: 'Road to PMRE', width: 1440, height: 600}},
  },
  {
    type: 'custom',
    id: 'section',
    heading: "Everything you need to know about this year's contest",
    align: 'center',
    background: 'surface',
    children: (
      <>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className={card}>
              <h3 className={cardHeading}>What you&apos;ll win 🎉</h3>
              <ul className="mt-6 space-y-4 text-lg leading-7 text-body">
                {prizes.map((p) => (
                  <li key={p.text} className="flex gap-3">
                    {p.icon}
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={card}>
              <h3 className={cardHeading}>How to enter</h3>
              <ol className="mt-6 space-y-4 text-lg leading-7 text-body">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rea-red/40 bg-rea-red/10 text-sm font-semibold text-ink"
                    >
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className={card}>
            <h3 className={cardHeading}>Important details</h3>
            <dl className="mt-4 divide-y divide-line text-base leading-relaxed text-body">
              <div className="flex flex-col gap-2 py-4 md:flex-row md:gap-6">
                <dt className="min-w-[105px] font-semibold text-ink">PMRE 2026</dt>
                <dd>November 17-19, 2026 · Palms Las Vegas</dd>
              </div>
              <div className="flex flex-col gap-2 py-4 md:flex-row md:gap-6">
                <dt className="min-w-[105px] font-semibold text-ink">Draw dates</dt>
                <dd>
                  <ul className="space-y-2">
                    {draws.map(([label, date]) => (
                      <li key={label}>
                        <strong className="font-semibold">{label}</strong> {date}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="flex flex-col gap-2 py-4 md:flex-row md:gap-6">
                <dt className="min-w-[105px] font-semibold text-ink">Winner</dt>
                <dd>Announced on a future Upmarket Podcast episode and contacted via email or Instagram DM</dd>
              </div>
              <div className="flex flex-col gap-2 py-4 md:flex-row md:gap-6">
                <dt className="min-w-[105px] font-semibold text-ink">Entry limit</dt>
                <dd>One entry per person. Duplicates may be removed.</dd>
              </div>
            </dl>
            <p className="mt-2 border-t border-line pt-4 text-sm text-body">
              By entering, you confirm you meet eligibility requirements and agree to the{' '}
              <SmartLink href="/pmre-rules-regulations" className="font-medium text-primary underline">
                Terms &amp; Conditions
              </SmartLink>
              .
            </p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-4xl text-center text-xs leading-5 text-muted">
          NO PURCHASE NECESSARY. Open to legal residents of the United States and Canada (excluding Quebec) who are 18 years of age or older. Eligible
          participants must be real estate photographers with an established Google Business Profile and/or a Real Estate Photography website.
          Contest runs from April 21, 2026, to October 13, 2026. Three (3) winners will be selected. Odds of winning depend on the number of eligible
          entries received. Canadian winners must correctly answer a skill‑testing question. This promotion is not sponsored, endorsed, administered
          by, or associated with Instagram or Meta Platforms, Inc. T&amp;Cs apply. See full{' '}
          <SmartLink href="/pmre-rules-regulations" className="font-medium text-primary underline">
            Rules
          </SmartLink>
        </p>
      </>
    ),
  },
  {
    type: 'custom',
    id: 'section-2',
    heading: "A weekend you'll actually want photos of",
    subheading:
      "Three nights at The Palms, hallway conversations with the best in the industry and a conference floor that's more fun than it has any right to be.",
    align: 'center',
    children: (
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo) => (
          <FallbackImage
            key={photo.src}
            src={photo.src}
            alt=""
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="mb-4 h-auto w-full break-inside-avoid rounded-xl"
          />
        ))}
      </div>
    ),
  },
]
