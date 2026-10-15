/** /compare/iguide-vs-zillow3dhome — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {VsColumns} from '@/components/pages/VsColumns'
import {closingCta, compareHeroFormId, compareLogos, logosHeading, ProList} from './compareShared'

export const meta = {
  title: 'iGUIDE vs Zillow 3D Home: Comparing camera systems for photographers, agents and brokerages | iGUIDE',
  description:
    'Photographers, agents and brokerages choose iGUIDE over Zillow 3D Home because of speed, cost, accuracy, and no subscriptions. See the full comparison.',
  path: '/compare/iguide-vs-zillow3dhome',
}

export const hero = {
  heading: 'iGUIDE vs Zillow 3D Home: built for professionals, not just promotion',
  subheading:
    'Zillow is a lead-gen tool locked to its own ecosystem. iGUIDE delivers accuracy, compliance and full control of your data across any MLS or platform.',
  rating: true,
  formHeading: 'See how iGUIDE compares to Zillow 3D Home',
  formId: compareHeroFormId,
}

export const blocks: Block[] = [
  {type: 'logos', heading: logosHeading, logos: compareLogos({src: '/assets/Uploads/loookinside-logo.png', alt: 'logo - LooOK INside'})},
  {
    type: 'cards',
    id: 'key-reasons',
    align: 'center',
    heading: 'Why professionals continue to choose iGUIDE over Zillow 3D Home',
    subheading:
      'Zillow 3D Home looks free, but freedom comes with strings. iGUIDE delivers the tools pros need: compliant floor plans, MLS-friendly tours and control over your brand and data.',
    columns: 3,
    cards: [
      {title: 'Floor plans you can trust', text: 'iGUIDE delivers ANSI/RMS-compliant layouts. Zillow floor plans aren’t measurement-focused.'},
      {title: 'Tours that travel', text: 'iGUIDE tours embed anywhere. Zillow tours are stuck inside their ecosystem.'},
      {title: 'Your brand, not theirs', text: 'iGUIDE puts your name front and center. Zillow promotes theirs.'},
      {title: 'No subscriptions', text: 'iGUIDE uses pay-per-project pricing. Zillow’s best exposure requires costly Showcase fees.'},
      {title: 'Professional capture', text: 'iGUIDE’s PLANIX camera captures LiDAR measurements and 360° photos together. Zillow relies on smartphones.'},
    ],
  },
  {
    type: 'quote',
    background: 'surface',
    quote: {
      quote: 'In our company, iGUIDE has become the new standard for virtual tours, floor plans and accurate measurements.',
      name: 'Glen MacIsaac',
      role: 'Photography Manager',
      company: 'Royal LePage Atlantic',
      photo: {src: '/assets/Glen_M_Transparent-Headshot.png', alt: 'Glen MacIsaac - Photography Manager - Royal LePage Atlantic'},
    },
  },
  {
    type: 'split',
    id: 'trusted-by-professionals',
    heading: 'Trusted by professionals',
    body: (
      <ProList
        items={[
          {
            title: 'Photographers who need accuracy and speed',
            text: 'Capture properties with professional-grade precision and deliver high-value assets clients can use everywhere, not just Zillow.',
          },
          {
            title: 'Agents and brokers who want MLS-ready content',
            text: 'Market listings with branded tours and ANSI-compliant floor plans that integrate across MLS platforms, websites and marketing channels.',
          },
          {
            title: 'Teams and brokerages that need consistency',
            text: 'Standardize workflows with scalable, professional tools that provide accurate data, fast turnaround and complete control of your content.',
          },
        ]}
      />
    ),
    media: {type: 'image', image: {src: '/assets/professionals-zillow.png', alt: 'Two professionals'}},
    mediaSide: 'left',
  },
  {
    type: 'custom',
    id: 'compare',
    background: 'surface',
    align: 'center',
    heading: 'iGUIDE wins where it matters most',
    subheading: "Don't limit your reach. Choose property information that is fully shareable on all platforms.",
    children: (
      <VsColumns
        ours={{
          name: 'iGUIDE',
          image: {src: '/assets/iguide-vs-competitors-planix-r1.png', alt: 'planix r1'},
          items: [
            {text: 'ANSI-Z765 & RMS compliant floor plans', ok: true},
            {text: 'Immersive 3D tour', ok: true},
            {text: 'Accurate, measurement-standard reported area', ok: true},
            {text: 'Professional camera system with LiDAR', ok: true},
            {text: 'Original point cloud data for verification', ok: true},
            {text: 'Delivery in under 24 hours', ok: true},
            {text: 'Offline access & data ownership', ok: true},
          ],
        }}
        theirs={{
          name: 'Zillow 3D Home',
          image: {src: '/assets/iguide-vs-zillow-360.png', alt: 'sample 360 camera'},
          items: [
            {text: 'Estimated floor plans, not ANSI/RMS compliant', ok: false},
            {text: 'Basic 3D Home Tour, photo-based only', ok: false},
            {text: 'Floor plan with varying accuracy', ok: false},
            {text: '360° camera based capture', ok: false},
            {text: 'No point cloud data, limited verification', ok: false},
            {text: 'Content locked in Zillow ecosystem', ok: false},
            {text: 'No offline ownership or archival', ok: false},
          ],
        }}
      />
    ),
  },
  {
    type: 'quote',
    quote: {
      quote:
        'iGUIDE has helped us grow from strength to strength and allowed us to host all the other services we offer from video, drone photography, virtual staging, printing and truly making us a comprehensive all-in-one solution.',
      name: 'Barnaby Decam',
      role: 'Co-Founder',
      company: 'Leading Image',
      photo: {src: '/assets/Barnaby-Decam-headshot-transparent.png', alt: 'Barnaby Decam - Co-Founder - Leading Image'},
    },
  },
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'Is Zillow 3D Home really free?',
        a: 'Yes — but only to create. The catch is visibility. To showcase your listings prominently, Zillow requires agents to purchase Showcase packages, which come with ongoing monthly fees. iGUIDE, on the other hand, uses a simple pay-per-project model with no hosting costs, no subscriptions and no forced showcase upsells. You own your content outright and can use it across any MLS or marketing channel.',
      },
      {
        q: 'Can Zillow 3D Home tours be used outside of Zillow?',
        a: 'Not effectively. Zillow 3D Home is designed to keep traffic inside the Zillow ecosystem, limiting your flexibility if you want to share on other MLS platforms or your own marketing channels. iGUIDE tours are MLS-friendly, fully shareable, and customizable with your branding — giving you control instead of locking your content into one platform.',
      },
      {
        q: 'How do iGUIDE floor plans compare to Zillow 3D Home?',
        a: 'iGUIDE delivers ANSI-Z765/RECA RMS-compliant floor plans with typical measurement uncertainty of 0.5% or better. Zillow 3D Home is not measurement-focused and does not provide verified square footage, which means listings may lack the accuracy required for appraisals, compliance, or confident decision-making. For professionals who need precision and credibility, iGUIDE is the clear choice.',
      },
    ],
  },
  closingCta({
    heading: 'Ready to upgrade to a professional solution?',
    text: 'Professional tools mean professional results and that’s what sets you apart.',
    secondary: {label: 'Find an iGUIDE Pro', href: 'https://ion.goiguide.com/'},
  }),
]
