/** /compare/iguide-vs-cubicasa — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {VsColumns} from '@/components/pages/VsColumns'
import {closingCta, compareHeroFormId, compareLogos, comparePlanixImage, logosHeading, lookInsideV2, ProList} from './compareShared'

export const meta = {
  title: 'iGuide vs CubiCasa: Comparing camera systems for fire investigators, insurance adjusters, & contractors | iGuide',
  description:
    'Compare iGuide vs. CubiCasa to see why pros choose iGuide - faster scans, accurate measurements, full data ownership, and offline access.',
  path: '/compare/iguide-vs-cubicasa',
}

export const hero = {
  heading: 'iGuide vs CubiCasa: why settle, have it all',
  subheading:
    'iGuide delivers more value than Cubicasa by combining floor plans with immersive tours and accurate property data to tell the whole story.',
  rating: true,
  formHeading: 'See how iGuide compares to CubiCasa',
  formId: compareHeroFormId,
}

export const blocks: Block[] = [
  {type: 'logos', heading: logosHeading, logos: compareLogos(lookInsideV2)},
  {
    type: 'cards',
    id: 'key-reasons',
    align: 'center',
    heading: 'Why professionals continue to choose iGuide over CubiCasa',
    subheading:
      'iGuide uses the perfect combination of media to make property listings more effective. Immersive visuals along side floor plans grabs attention, maximizes engagement and pushes potential homebuyers into action.',
    columns: 2,
    cards: [
      {
        title: 'Immersive visuals',
        text: 'Combining 360° images with interactive floor plans is a proven way to increase user engagement and help potential homebuyers create an emotional connection with a property. This leads to more in-person visits, higher offers and less time on the market.',
      },
      {
        title: 'Professional capture',
        text: "iGuide's camera solution captures 360° images and accurate LiDAR measurements, simultaneously. This means more efficient use of time on-site and higher value outcomes.",
      },
      {
        title: 'Superior accuracy',
        text: 'With LiDAR measurement data you have the foundation for trustworthy and legally defensible floor plans and area totals.',
      },
      {
        title: 'Streamlined content delivery',
        text: 'All the media that makes a listing effective can be shared with just one link. You can have the steak and sizzle all at once with no compromises.',
      },
    ],
  },
  {
    type: 'quote',
    background: 'surface',
    quote: {
      quote:
        'Since incorporating iGuide into our services, our business has grown 10X – the capture speed is unmatched. We\'ve worked with other virtual tour solutions, but none come close to iGuide\'s efficiency. Adding the PLANIX camera system to our offering has brought us more shoots and clients. It’s been a game-changer!',
      name: 'Lauren Murphy',
      role: 'Photographer',
      company: 'Monster Media House',
      photo: {src: '/assets/ea289cd8b1/lauren.png', alt: 'photo - Lauren from Monster Media House'},
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
            title: 'Real estate photographers',
            text: 'Elevate every listing with 3D tours and accurate floor plans, proven to help agents sell faster and for more.',
          },
          {
            title: 'Real estate agents & brokers',
            text: 'Attract more buyers and close faster with interactive property content that builds confidence and drives engagement.',
          },
          {
            title: 'Home designers & contractors',
            text: 'Leverage reliable as-built data and accurate measurements for quoting, planning and coordination.',
          },
          {
            title: 'Mortgage appraisers',
            text: 'Streamline valuations with precise floor plans and ANSI-Z765–compliant measurements you can trust.',
          },
        ]}
      />
    ),
    media: {type: 'image', image: {src: '/assets/cubicasa-professional.png', alt: 'Professional pointing at phone'}},
    mediaSide: 'left',
  },
  {
    type: 'custom',
    id: 'compare',
    background: 'surface',
    align: 'center',
    heading: 'iGuide wins where it matters most',
    subheading: 'Don’t settle for quick sketches. Choose the platform built for compliance, precision and ownership.',
    children: (
      <VsColumns
        ours={{
          name: 'iGuide',
          image: comparePlanixImage,
          items: [
            {text: 'Schematic floor plans in JPG, PDF, SVG', ok: true},
            {text: 'Immersive 3D Tour with 360° visuals', ok: true},
            {text: 'Fast, professional camera system', ok: true},
            {text: 'Professional LiDAR measurements', ok: true},
            {text: 'Original point cloud source data for verification', ok: true},
            {text: 'Integrated video', ok: true},
          ],
        }}
        theirs={{
          name: 'CubiCasa',
          image: {src: '/assets/CubiCasa.png', alt: 'icon - Phone Silhouette'},
          items: [
            {text: 'Schematic floor plans in JPG, PDF, SVG', ok: true},
            {text: 'Interactive virtual tour', ok: true},
            {text: 'Smartphone-based capture', ok: false},
            {text: 'Smartphone-based measurements', ok: false},
            {text: 'No source data available', ok: false},
            {text: 'No integrated video', ok: false},
          ],
        }}
      />
    ),
  },
  {
    type: 'quote',
    quote: {
      quote:
        'When we scan with iGuide, I know I won’t get a call from an agent questioning the numbers. It saves me time, builds trust and delivers a polished product that helps my clients win listings.',
      name: 'Alex Coombs',
      role: 'Owner',
      company: 'Northern Spruce Media',
      photo: {src: '/assets/alex_photo.jpg', alt: 'photo - Alex Coombs'},
      link: {label: 'See what Alex had to say about iGuide vs CubiCasa', href: '/blogs/why-i-use-both-iguide-and-cubicasa-in-my-business'},
    },
  },
  closingCta({
    heading: 'Ready to upgrade to a professional solution?',
    text: 'Professional tools mean professional results and that’s what sets you apart.',
    secondary: {label: 'Shop cameras', href: 'https://store.goiguide.com'},
  }),
]
