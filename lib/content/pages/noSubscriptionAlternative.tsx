/** /no-subscription-alternative — copy, links and asset paths from the live page (checked 2026-10-21). */
import {Receipt, Rotate3d, Ruler, Timer} from 'lucide-react'
import type {Block} from '@/components/blocks/Blocks'
import type {Quote} from '@/components/blocks/Testimonials'
import {FormDialogButton} from '@/components/pages/FormDialogButton'
import {FormHero} from '@/components/pages/FormHero'

export const meta = {
  title: 'Experience iGuide: Fast turn-around with no subscriptions | iGuide',
  description: 'Looking for the best Matterport alternative? iGuide offers superior 3D tours with easy navigation and detailed floor plans. Try iGuide today!',
  path: '/no-subscription-alternative',
}

/** HubSpot forms on the live page: "Book your demo today" (hero) and the brochure pop-up */
const DEMO_FORM_ID = '6bf33ceb-7b32-4f75-82da-77775523ae33'
const BROCHURE_FORM_ID = 'a9c05de6-a150-4940-91c6-b6d1e2982ee5'

const logo = (file: string, alt: string, width: number) => ({src: `/assets/Uploads/Tetsimonial-Logo-${file}.png`, alt, width, height: 44})

const quotes: Quote[] = [
  {
    quote:
      'It used to take me over two-and-a-half hours to go into a home and just do measurements and manually insert them into floor plans. But, with iGuide, it was all so quick and easy. I have been able to grow my business by a whopping 375% using iGuide, and the cost of the camera has paid for itself a hundredfold, many times over!',
    name: 'Julie Pringle',
    company: 'Snap Photography',
    logo: logo('Snap-Photo', 'Snap Photography', 170),
  },
  {
    quote:
      'Even after working day & night, I was unable to grow my business. With the hours I was working, it was just not scalable. That is when I came across Planitar and decided to buy an iGuide Camera. I am six times faster than before, the market is huge, and with iGuide by my side, I know I’m ready for it.',
    name: 'Alden Morris',
    company: 'Alden Morris Photo',
    logo: logo('Alden-Morris', 'Alden Morris Photo', 78),
  },
  {
    quote:
      'Can you imagine the industry and an industry player moving in opposite directions? Well, that’s exactly what iGuide did to my business. Even during the Real Estate downturn in 2018, I saw a stupendous 255% upward growth. My clients absolutely loved what I was able to offer - great photography, immersive virtual tours, and that too, with a turnaround of fewer than 24 hours. It is a winning combination!',
    name: 'Kyle Ketchel',
    company: 'Visual Properties LLC',
    logo: logo('Visual-Properties', 'Visual Properties LLC', 166),
  },
  {
    quote:
      'Adding iGuide virtual tours has helped my Realtor clients sell more properties, save more time by showing fewer properties that fit home buyer’s needs that they are excited to see and separate themselves from their competition when doing listing presentations.',
    name: 'Paul Maynard',
    company: 'Colorful Virtual Tours',
    logo: logo('Colorful-Virtual-Tours', 'Colorful Virtual Tours', 163),
  },
  {
    quote: 'I do photos and iGuide 3D tour with floor plan for almost every single listing I do. So, it gives me more revenue.',
    name: 'Todd Wasylyshyn',
    company: 'Nanaimo Photography',
    logo: logo('Nanaimo-Photo', 'Nanaimo Photography', 236),
  },
  {
    quote:
      'I don’t want to go to eight houses and shoot photos, I want to go to three houses and shoot photos and video. Now I do more per house and less traveling and bigger invoices.',
    name: 'Fred Light',
    company: 'Nashua Video Tours',
    logo: logo('Nashua-Video-Tours', 'Nashua Video Tours', 166),
  },
]

/** Features only iGuide has (✓ / ✗ on live) */
const oursOnly = [
  'No subscription fees',
  'Removable battery',
  'Unlimited tour storage',
  'Downloadable tour / offline / self hosting available',
  'Editable images (able to import into Lightroom/Photoshop)',
  'Superior measurement accuracy',
  'Method of measurement provided',
  'Content delivery solution (share and download property photos)',
  'Shareable analytics',
  'Photo integration',
  'Video integration',
]

export const blocks: Block[] = [
  {
    type: 'custom',
    children: (
      <FormHero
        heading="Break free from subscriptions"
        subheading="Regain control. Own your data and you choose your interactive experience."
        formHeading="Book your demo today"
        formId={DEMO_FORM_ID}
      />
    ),
  },
  {
    type: 'logos',
    logos: [
      {src: '/assets/Uploads/loookinside-logo-v2.png', alt: 'logo - LooOK INside'},
      {src: '/assets/Uploads/Scrolling-LogosRoyalLePage.png', alt: 'logo - Royal LePage'},
      {src: '/assets/Uploads/Scrolling-LogosVisual.png', alt: 'logo - Visual Advantage'},
      {src: '/assets/Uploads/Scrolling-LogosRemax.png', alt: 'logo - RE/MAX'},
      {src: '/assets/Uploads/Scrolling-LogosPrepTours.png', alt: 'logo - PREP Tours'},
      {src: '/assets/Uploads/Scrolling-LogosKW.png', alt: 'logo - Keller Williams'},
    ],
  },
  {
    type: 'split',
    heading: 'Gain a competitive edge: iGuide is the industry leader',
    body: (
      <p>
        iGuide makes it easy to measure and visually capture a space quickly. You can be confident you’re delivering everything your client needs to list a
        home, create an as-built drawing or document an insurance claim. You’re in the driver’s seat with complete control over the final product and no hidden
        fees.
      </p>
    ),
    media: {type: 'embed', src: 'https://www.youtube.com/embed/tkFmaf1hpJ8', title: 'Gain a competitive edge: iGuide is the industry leader'},
  },
  {
    type: 'cards',
    heading: 'The iGuide advantage',
    background: 'surface',
    columns: 4,
    cards: [
      {
        title: 'Speed of capture',
        text: 'Shoot 3,000 sq ft in just 15 minutes: 3-5x faster than other cameras.',
        icon: Timer,
      },
      {
        title: 'Immersive experience',
        text: 'Explore every corner with an interactive floor plan and 360° visuals.',
        icon: Rotate3d,
      },
      {
        title: 'Measurements & floor plans',
        text: 'Each iGuide includes room dimensions, total floor area and expert-drafted floor plans.',
        icon: Ruler,
      },
      {
        title: 'No subscription',
        text: 'No monthly fee means no extra fixed cost for your business. Pay as you go with hosting included.',
        icon: Receipt,
      },
    ],
  },
  {
    // Live: the iGuide column header is a photo of the camera (/assets/iguide_camera.png)
    type: 'compare',
    heading: 'Comparison chart',
    columns: {label: 'Feature', ours: 'iGuide', theirs: 'Other guys'},
    rows: [
      {label: 'Time to capture (3,000 sq. ft. property)', ours: '15 min', theirs: '105 min', marks: false},
      {label: 'Storage', ours: '16 GB (expandable)', theirs: 'Phone or tablet (128 GB recommended)', marks: false},
      {
        label: 'Smart device requirement & software compatibility',
        ours: 'Phone or tablet (iOS & Android)',
        theirs: 'Phone or tablet (iOS & Android)',
        marks: false,
      },
      {label: 'Floor plan processing time', ours: '24 hours', theirs: '24 – 48 hours', marks: false},
      {label: 'Hard carry case included', ours: true, theirs: '$200 hard shell case', marks: false},
      {label: 'Floor plans delivery', ours: true, theirs: true},
      {label: '3D tour delivery', ours: true, theirs: true},
      {label: 'VR', ours: true, theirs: true},
      ...oursOnly.map((label) => ({label, ours: true, theirs: false})),
    ],
  },
  {
    type: 'cta',
    heading: 'Meet with an iGuide Specialist',
    text: 'Ready to experience the power of iGuide? Schedule a personalized demo with an iGuide Specialist.',
    // Live: href "#" (back to the top of the page, where the demo form is)
    ctas: [{label: 'Get started', href: '#hero'}],
  },
  {
    type: 'split',
    heading: 'Dive into the iGuide experience',
    body: (
      <p>
        It takes 15 minutes to measure, document and photograph a 3,000 sq ft space simultaneously. Deliver floor plans, room dimensions, square footage and
        more in less than 24 hours.*
      </p>
    ),
    after: <p className="text-base text-muted">*Delivery time is estimated dependent on the complexity of the file.</p>,
    media: {type: 'embed', src: 'https://youriguide.com/embed/298_astell_st_burlington_ct?autostart=1&bgcolor=FFFFFF', title: 'iGuide 3D virtual tour'},
    background: 'surface',
  },
  {type: 'quotes', heading: 'Trusted by industry professionals', align: 'center', quotes},
  {
    type: 'custom',
    children: (
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-sky px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12">
        <div className="max-w-2xl">
          <h2 className="type-heading-lg text-ink">Download our Free Brochure:</h2>
          <p className="mt-3 text-lg leading-7 text-muted">Create the ultimate homebuyer experience</p>
        </div>
        <FormDialogButton label="Get the brochure" title="Download our free brochure" formId={BROCHURE_FORM_ID} className="shrink-0" />
      </div>
    ),
  },
]
