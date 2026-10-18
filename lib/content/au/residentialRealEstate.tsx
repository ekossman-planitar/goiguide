/**
 * /au/residential-real-estate (was /residential-real-estate-au) — copy, links
 * and asset paths from the live page (checked 2026-10-14).
 */
import type {Block} from '@/components/blocks/Blocks'
import {tour} from '@/lib/content/industries/shared'
import {AU_TERMS_PATH, book, danielNik, launchVideo, rea, reaLogo} from './shared'

export const meta = {
  title: 'iGuide & REA | Virtual Tours & Floor Plans for Real Estate Agents | iGuide',
  description:
    'Backed by REA Group, iGuide helps agents win more listings with branded 360° tours, accurate floor plans, and property data delivered in minutes. Capture once, market everywhere.',
  path: '/au/residential-real-estate',
}

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Drive more buyers from screen to inspection with iGuide',
    subheading:
      'Complete your listing with immersive 3D tours, accurate floor plans and site plans, the only 3D tour experience fully integrated into realestate.com.au.',
    ctas: [book()],
    media: launchVideo,
  },
  {
    type: 'split',
    id: 'rea',
    background: 'surface',
    heading: 'realestate.com.au is covering iGuide processing',
    body: (
      <>
        <p>
          Through March 31st, 2027, processing on eligible residential iGuide orders is funded by {rea} when your iGuide is on the listing
          within 60 days. In NSW or VIC, eligible Premiere+ listings can also unlock a $500 metro / $250 regional content credit.{' '}
          <a href="https://customer.realestate.com.au/residential/iguide-offer">See the offer here.</a>
        </p>
        <p className="text-sm">
          Terms apply. Offer ends 31 March 2027. See full terms for eligibility, the 60-day upload window, and credit conditions.{' '}
          <a href={AU_TERMS_PATH}>Full terms</a>
        </p>
      </>
    ),
    after: <p className="text-sm text-muted">Backed by realestate.com.au&apos;s NextGen property search experience.</p>,
    media: {type: 'image', image: {...reaLogo, width: 600, height: 120}},
    mediaClassName: 'mx-auto max-w-sm rounded-xl bg-[#e4002b] p-8',
  },
  {
    type: 'split',
    heading: 'Immersive content is the new listing benchmark',
    body: (
      <p>
        iGuide&apos;s engaging 3D tours and accurate floor plans give property seekers a true sense of space before inspection, hooking serious
        buyers and helping you move them from screen to inspection.
      </p>
    ),
    ctas: [
      {label: 'Download Branded Property Overview', href: 'https://youriguide.com/141_harris_st_sydney_nsw/doc/branded_property_overview_metric_en.pdf', newTab: true},
      {label: 'Download iGuide Floor Plans', href: '/assets/iGUIDE-Floor-Plans.pdf', variant: 'secondary', newTab: true},
    ],
    media: {type: 'embed', src: tour('https://youriguide.com/141_harris_st_sydney_nsw?autostart=1&bgcolor=FFFFFF'), title: 'iGuide 3D tour of 141 Harris St, Sydney NSW'},
  },
  {
    type: 'cards',
    heading: 'Win more listings with immersive property marketing',
    subheading: 'It’s time your listings worked harder for you.',
    columns: 3,
    cards: [
      {title: 'Give vendors a reason to choose you', text: 'Show vendors you’re committed to marketing their home at its best.', icon: {src: '/assets/2db7f667fb/Win_more_listings.png', alt: ''}},
      {title: 'Stand out on realestate.com.au', text: 'The only 3D tour provider fully integrated into Australia’s #1 property portal.', icon: {src: '/assets/Lead_the_pack.png', alt: ''}},
      {title: 'Capture interest from serious buyers', text: 'Serious buyers explore 3D tours 9.7x more than other users.¹', icon: {src: '/assets/Capture_qualified_leads.png', alt: ''}},
      {title: '24/7 open house', text: 'Let buyers explore your listing any time, from anywhere.', icon: {src: '/assets/247_open_house.png', alt: ''}},
      {title: 'Floor plans re-imagined', text: 'LiDAR-accurate, branded floor plans delivered within 24 hours.', icon: {src: '/assets/Floor_plans_re-imagined.png', alt: ''}},
      {title: 'Stats that sell', text: 'Show vendors the proof of impact with iGuide Analytics.', icon: {src: '/assets/Stats_that_sell.png', alt: ''}},
    ],
    after: <p className="text-sm text-muted">¹ REA internal data, Jan–Oct 2025</p>,
  },
  {
    type: 'featureTabs',
    heading: 'Stand out as a top listing agent',
    subheading: 'iGuide is built for agents who want more impact and less hassle, with branding, speed and simplicity baked in.',
    label: 'Grow your business with iGuide',
    items: [
      {
        id: 'stand-out',
        title: 'Stand out on every listing',
        text: 'Show vendors you’re serious about marketing their home, with immersive 3D tours, accurate floor plans and site plans that make every property stand out on realestate.com.au.',
        media: {type: 'image', image: {src: '/assets/Australia/iGUIDE-REA-Chris.webp', alt: 'iGuide R1 Camera'}},
      },
      {
        id: 'hook-buyers',
        title: 'Hook serious buyers',
        text: 'Serious buyers explore 3D tours 9.7x more than other users¹, immersive tours and interactive floor plans that move buyers from their screen to your inspection.',
      },
      {
        id: 'enquiries',
        title: 'Turn more enquiries into inspections',
        text: 'Immersive tours help buyers understand a property’s layout and flow before they visit, so the buyers who show up are ready to act.',
      },
    ],
  },
  {
    type: 'split',
    heading: 'Why iGuide is different:',
    list: ['Agent branding built in', 'Fast delivery: floor plans and tours within 24 hours', 'Seamlessly integrated with realestate.com.au'],
    media: {type: 'image', image: {src: '/assets/Australia/iGUIDE-REA-StandOut.png', alt: 'Photo - Stand out'}},
    mediaSide: 'left',
    background: 'surface',
  },
  {
    type: 'steps',
    heading: 'Up and running in four simple steps',
    subheading: 'See how easy it is to go from scan to a published, branded property listing.',
    showImages: true,
    steps: [
      {title: 'Book demo', body: 'See how iGuide works firsthand with a guided demo tailored to you.', image: {src: '/assets/demo.jpg', alt: ''}},
      {
        title: 'Get started',
        body: 'Connect with a local iGuide Pro photographer or equip your preferred photographer with a PLANIX camera.',
        image: {src: '/assets/Australia/iGUIDE-REA-Chris-Original.png', alt: 'Photo - Chris'},
      },
      {
        title: 'Quick capture',
        body: 'Turn 15–30 minutes of scanning into accurate 3D tours, floor plans and Site Plans delivered within 24 hours.',
        image: {src: '/assets/irc-sketch-step-3.png', alt: ''},
      },
      {
        title: 'Stand out',
        body: 'Publish immersive, branded listings that differentiate you in a crowded market and give buyers the confidence to inspect.',
        image: {src: '/assets/Australia/iGUIDE-REA-StandOut.png', alt: 'Photo - Stand out'},
      },
    ],
    ctas: [book(), {label: 'See iGuide pricing', href: '/pricing', variant: 'secondary'}],
  },
  {type: 'quote', quote: danielNik},
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'How quickly are deliverables ready?',
        a: 'Floor plans, virtual tours and site plans are delivered within 24 hours of capture, and generally much faster. Your listing assets are ready to upload to realestate.com.au quickly, so you can launch campaigns without delay.',
      },
      {
        q: 'Does iGuide cost more than a standard floor plan?',
        a: 'iGuide uses simple pay-per-project pricing with no subscriptions or lock-in contracts. For essentially what you may already be spending on a floor plan, iGuide delivers a richer set of assets: branded floor plans, site plans* and an immersive 3D tour, all from a single capture.',
      },
      {
        q: 'What is iGuide and how does it work?',
        a: 'iGuide is a capture and delivery system for residential property marketing. Using the PLANIX R1 camera, a property is scanned in a single visit, producing interactive 3D virtual tours, accurate floor plans, verified measurements and site plans, all ready to publish directly to realestate.com.au.',
      },
      {
        q: 'Are iGuide and REA Group partners?',
        a: 'Yes. iGuide and REA Group are strategic partners helping agents across Australia bring listings to life. iGuide is the only 3D tour provider that integrates seamlessly into realestate.com.au’s NextGen listing experience, giving serious buyers an immersive way to explore properties directly from the listing page.',
      },
      {
        q: 'How does iGuide help real estate agents?',
        a: 'iGuide helps agents showcase properties more effectively, attract more qualified buyers and streamline the selling process. With immersive 3D tours, accurate floor plans and site plans, agents can present homes with greater clarity, helping buyers self-qualify before inspection and vendors feel confident their property is being marketed at its best.',
      },
      {
        q: 'What are the advantages for home sellers?',
        a: 'iGuide gives vendors a competitive edge by presenting their property in a visually engaging and informative way. Detailed 3D tours and floor plans help capture the attention of serious buyers, with 1 in 3 buyers saying video or 3D tours make them more likely to inspect, and most others remaining open.',
      },
    ],
  },
  {
    type: 'cta',
    heading: 'Get on board early and ride the accurate property data wave',
    text: 'iGuide is the only 3D tour experience fully integrated into your realestate.com.au listing, giving serious buyers an immersive way to explore your properties and helping you convert more browsers into buyers.',
    ctas: [book('Book a 15-minute walkthrough')],
  },
]
