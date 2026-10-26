/** /au-agent-offers — copy, links and asset paths from the live page (checked 2026-10-21). */
import {Camera, DoorOpen, Receipt, Sparkles} from 'lucide-react'
import type {Block} from '@/components/blocks/Blocks'
import {MediaView} from '@/components/blocks/MediaView'
import {FaqTabs} from '@/components/sections/FaqTabs'
import {Container} from '@/components/ui/Container'
import {FallbackImage} from '@/components/ui/FallbackImage'

export const meta = {
  title: 'Your agents can save by adding an iGuide Tour | iGuide',
  description: 'Two offers running across realestate.com.au and realcommercial.com.au. Here’s what your agents need to know.',
  path: '/au-agent-offers',
}

type Offer = {icon: string; iconAlt: string; title: string; text: string; video: string; qualifies: string; window: string; steps: string[]}

const offers: Offer[] = [
  {
    icon: '/assets/rea-residential.svg',
    iconAlt: 'realestate.com.au',
    title: '$250 back on Luxe listings',
    text: 'Residential agents get $250 back on listings with an iGuide Tour.',
    video: 'https://www.youtube.com/embed/5XPVmp2vycE',
    qualifies: 'Premiere+ customers in metro QLD, SA and WA.',
    window: 'Sign-up closes June 30, 2026. Discount through December 31, 2026.',
    steps: [
      'Signs a Luxe Bundle prior to June 30, 2026',
      'Upload the iGuide Tour before or during the listing upgrade',
      'REA credits $250 per eligible listing, processed monthly',
    ],
  },
  {
    icon: '/assets/rea-commercial.svg',
    iconAlt: 'realcommercial.com.au',
    title: '$400 back on Elite Plus listings',
    text: 'Commercial agents get $400 back on listings with an iGuide Tour.',
    video: 'https://www.youtube.com/embed/KLMyT_Z1yJI',
    qualifies: 'Elite Plus or EP Unlimited contract customers',
    window: 'Active from July 1 - December 31, 2026.',
    steps: [
      'Agent creates an Elite Plus or Elite Plus Unlimited listing',
      'Upload the iGuide Tour before or during the listing upgrade.',
      'realcommercial.com.au applies a $400 credit',
    ],
  },
]

function OfferCard({offer}: Readonly<{offer: Offer}>) {
  return (
    <li className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card md:p-8">
      {/* eslint-disable-next-line @next/next/no-img-element -- small brand SVG */}
      <img src={offer.icon} alt={offer.iconAlt} width={151} height={20} className="h-5 w-auto self-start" />
      <h3 className="type-heading-md mt-5 text-ink">{offer.title}</h3>
      <p className="mt-2 text-lg leading-7 text-body">{offer.text}</p>
      <MediaView media={{type: 'embed', src: offer.video, title: offer.title}} className="mt-6" />
      <dl className="mt-6 space-y-4 text-base leading-6 text-body">
        <div>
          <dt className="font-semibold text-ink">Who qualifies</dt>
          <dd>{offer.qualifies}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Window</dt>
          <dd>{offer.window}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">How it works</dt>
          <dd>
            <ol className="mt-1 space-y-1">
              {offer.steps.map((step, i) => (
                <li key={step}>
                  <strong className="text-ink">Step {i + 1}:</strong> {step}
                </li>
              ))}
            </ol>
          </dd>
        </div>
      </dl>
    </li>
  )
}

/** Tab and question order as on live */
const faqGroups = [
  {
    id: 'agents',
    label: 'Real Estate Agents',
    items: [
      {
        q: 'Does my photographer need to be set up with iGuide?',
        a: 'Yes, iGuide Tours must be captured using a PLANIX R1 camera. If your photographer isn’t set up yet, ask them to get in touch with us and we’ll get them sorted. Or if you’d prefer, we can connect you with an iGuide-ready photographer in your area.',
      },
      {
        q: 'Does the tour have to be uploaded before the listing upgrade?',
        a: 'Yes, for both offers. The tour must be live on the listing before or at the time the agent upgrades to Luxe or Elite Plus for that listing to qualify.',
      },
      {
        q: 'Do both offers apply to the same listing?',
        a: 'No. The Luxe offer is for residential listings on realestate.com.au. The Elite Plus offer is for commercial listings on realcommercial.com.au. They are separate offers on separate portals.',
      },
    ],
  },
  {
    id: 'photographers',
    label: 'Real Estate Photographers',
    items: [
      {
        q: 'How do I introduce this to my agents?',
        a: 'Lead with the agent benefit. Something like: “Did you know you can get a discount on your listing if we add an iGuide Tour? You just need to upload the tour before you upgrade the listing.” Email templates and talking points are available in the photographer portal.',
      },
      {
        q: 'When does my agent get the credit?',
        a: 'Credits are processed by REA Group. No action required from you or your agent once the tour is uploaded.',
      },
      {
        q: 'What if my agent isn’t on Premiere+ or Elite Plus / EP Unlimited contract?',
        a: 'The offers are tier-specific so they won’t qualify for the discount. Adding iGuide still strengthens the listing and the pitch. Continue to recommend iGuide on its own merits.',
      },
      {
        q: 'What’s my turnaround on delivery?',
        a: 'iGuides with all required data uploaded to the Portal are typically delivered within hours, and no later than 24 hours.',
      },
    ],
  },
]


/** Live: white REA logo and heading on a red band */
export function AuOffersHero() {
  return (
    <section className="bg-rea-red py-16 text-white lg:py-[60px]">
      <Container size="medium" className="text-center">
        <FallbackImage src="/assets/rea.png" alt="REA Group" width={280} height={25} priority className="mx-auto h-auto w-[280px] max-w-full" fallback={null} />
        <h1 className="type-display mt-8">Your agents can save by adding an iGuide Tour</h1>
        <p className="mt-6 text-xl leading-[30px]">Two offers running across realestate.com.au and realcommercial.com.au</p>
      </Container>
    </section>
  )
}

export const blocks: Block[] = [
  {
    type: 'custom',
    heading: 'Here’s what your agents need to know',
    background: 'surface',
    children: (
      <ul className="grid gap-6 lg:grid-cols-2">
        {offers.map((offer) => (
          <OfferCard key={offer.title} offer={offer} />
        ))}
      </ul>
    ),
  },
  {
    type: 'cards',
    heading: 'How iGuide fits your workflow',
    columns: 4,
    cards: [
      {title: 'One capture', text: 'Capture floor plans, 3D Tour and Site Plans in a single property.', icon: Camera},
      {title: 'Pay per project', text: 'No subscriptions. You own your data and can download it anytime.', icon: Receipt},
      {title: 'Elevated listings', text: 'Offer the immersive assets that serious buyers engage with.', icon: Sparkles},
      {title: '24/7 open house', text: 'Let buyers explore your listing any time, from anywhere.', icon: DoorOpen},
    ],
  },
  {
    type: 'custom',
    heading: 'Frequently asked questions',
    align: 'center',
    background: 'sky',
    children: <FaqTabs label="Questions by audience" groups={faqGroups} />,
  },
  {
    type: 'cta',
    heading: 'Ready to start adding iGuide to your listings?',
    ctas: [
      // Live links to /real-estate-photography-au, which now redirects here
      {label: 'Get started', href: '/au/real-estate-photography'},
      {label: 'Find an iGuide Pro', href: 'https://ion.goiguide.com/', variant: 'secondary'},
    ],
  },
]
