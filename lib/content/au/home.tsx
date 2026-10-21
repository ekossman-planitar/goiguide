/**
 * /au — Australia landing page. Same building blocks as the global homepage,
 * but its own Australian copy (REA partnership, realestate.com.au listings,
 * metric sizes) so it isn't duplicate content. NEW DRAFT COPY: review before launch.
 * Facts are taken from the live AU pages (checked 2026-10-14).
 */
import type {Block} from '@/components/blocks/Blocks'
import {tour} from '@/lib/content/industries/shared'
import {AU_TERMS_PATH, book, danielNik, launchVideo, rea, reaLogo} from './shared'

export const meta = {
  title: 'iGuide Australia | 3D Tours & Floor Plans for realestate.com.au Listings | iGuide',
  description:
    'iGuide is the only 3D tour fully integrated into realestate.com.au. Capture 3D tours, accurate floor plans and Site Plans in one visit, delivered within 24 hours.',
  path: '/au',
}

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Immersive listings for Australia’s #1 property portal',
    subheading:
      'One iGuide capture delivers a 3D tour, accurate floor plans and Site Plans, built into the realestate.com.au listing buyers already use.',
    ctas: [book(), {label: 'I’m a photographer', href: '/au/real-estate-photography', variant: 'secondary'}],
    media: launchVideo,
  },
  {
    type: 'split',
    id: 'rea',
    background: 'surface',
    heading: 'realestate.com.au is covering iGuide processing',
    body: (
      <p>
        Until 31 March 2027, {rea} is funding processing on eligible residential iGuide orders that are uploaded to the listing within 60 days.
        Eligible Premiere+ listings in NSW and VIC can also unlock a content credit.
      </p>
    ),
    after: (
      <p className="text-sm text-muted">
        Terms apply. <a href={AU_TERMS_PATH}>Read the full campaign terms</a>.
      </p>
    ),
    ctas: [{label: 'For agents', href: '/au/residential-real-estate'}, {label: 'For photographers', href: '/au/real-estate-photography', variant: 'secondary'}],
    media: {type: 'image', image: {...reaLogo, width: 600, height: 120}},
    mediaClassName: 'mx-auto max-w-sm rounded-xl bg-rea-red p-8',
  },
  {
    type: 'cards',
    heading: 'Choose your path',
    subheading: 'iGuide works for the agents who list properties and the photographers who capture them.',
    columns: 2,
    cards: [
      {
        title: 'Real estate agents',
        text: 'Win vendors with branded tours and floor plans, and move serious buyers from screen to inspection.',
        image: {src: '/assets/Australia/iGUIDE-REA-StandOut.png', alt: 'Agent presenting an iGuide listing'},
        link: {label: 'iGuide for agents', href: '/au/residential-real-estate'},
      },
      {
        title: 'Real estate photographers',
        text: 'Add 3D tours, floor plans and Site Plans to every shoot from a single capture, and raise your value per job.',
        image: {src: '/assets/Australia/AUS-Branded-Property-Overview.png', alt: 'iGuide Branded Property Overview'},
        link: {label: 'iGuide for photographers', href: '/au/real-estate-photography'},
      },
    ],
  },
  {
    type: 'split',
    heading: 'Explore an Australian iGuide',
    body: <p>Walk through a Sydney property the way buyers do on realestate.com.au: move room to room, check dimensions and jump straight to the spaces that matter.</p>,
    ctas: [{label: 'Download sample floor plans', href: '/assets/iGUIDE-Floor-Plans.pdf', newTab: true}],
    media: {type: 'embed', src: tour('https://youriguide.com/141_harris_st_sydney_nsw?autostart=1&bgcolor=FFFFFF'), title: 'iGuide 3D tour of 141 Harris St, Sydney NSW'},
    mediaSide: 'left',
  },
  {
    type: 'cards',
    background: 'surface',
    heading: 'Everything a modern listing needs, from one visit',
    columns: 4,
    cards: [
      {title: '3D virtual tour', text: 'An immersive walkthrough that opens right inside the realestate.com.au listing.', icon: {src: '/assets/247_open_house.png', alt: ''}},
      {title: 'Accurate floor plans', text: 'LiDAR-accurate, branded floor plans with room dimensions in metric.', icon: {src: '/assets/Floor_plans_re-imagined.png', alt: ''}},
      {title: 'Site Plans', text: 'Show how the home sits on the block, with outdoor areas in context.', icon: {src: '/assets/Lead_the_pack.png', alt: ''}},
      {title: 'Listing analytics', text: 'Show vendors how buyers engage with the tour.', icon: {src: '/assets/Stats_that_sell.png', alt: ''}},
    ],
  },
  {type: 'quote', quote: danielNik},
  {
    type: 'faq',
    heading: 'iGuide in Australia',
    items: [
      {
        q: 'Is iGuide part of REA Group?',
        a: 'Yes. iGuide is backed by REA Group, the owner of realestate.com.au, and is the only 3D tour fully integrated into the realestate.com.au listing experience.',
      },
      {
        q: 'How do I get an iGuide for my listing?',
        a: 'Book an iGuide Pro photographer near you, or equip your own photographer with an iGuide PLANIX camera. Either way, deliverables arrive within 24 hours of capture.',
      },
      {
        q: 'Is there a subscription?',
        a: 'No. iGuide is pay-per-project with no lock-in contracts.',
      },
    ],
  },
  {
    type: 'cta',
    heading: 'See iGuide on a realestate.com.au listing',
    text: 'Book a short walkthrough with our Australian team.',
    ctas: [book('Book your personalized product tour')],
  },
]
