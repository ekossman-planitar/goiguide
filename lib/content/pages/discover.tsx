/** /discover — copy, links and asset paths from the live page (checked 2026-10-21). */
import {ChartColumn, LayoutGrid, Megaphone, Rotate3d} from 'lucide-react'
import type {Block} from '@/components/blocks/Blocks'

export const meta = {
  title: 'Unleash the power of iGuide | iGuide',
  description:
    'Quickly create 3D virtual tours, CAD floor plans and 3D models with the iGuide PLANIX camera system. Take 360° photos and 1,000s of measurements in minutes, capturing rich property data.',
  path: '/discover',
}


export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Unleash the power of iGuide',
    subheading: 'Helping sell homes faster since 2012',
    media: {type: 'image', image: {src: '/assets/Uploads/Industries-Real-Estate-Header.png', alt: '', width: 1600, height: 800}},
  },
  {
    type: 'cards',
    heading: 'A complete listing solution for every REALTOR®',
    subheading: 'iGuide offers a more immersive and engaging experience',
    columns: 4,
    cards: [
      {
        title: 'Floor plans',
        text: 'Accurate, interactive, digital floor plans that adhere to the ANSI-Z765-2021 and RECA RMS 2017 standards make it easy to visualize the space.',
        icon: LayoutGrid,
      },
      {
        title: '3D virtual tours',
        text: 'An interactive 3D virtual tour gives potential buyers a sense of being there, helping them understand the fit and flow of the space.',
        icon: Rotate3d,
      },
      {
        title: 'Turn-key marketing tool',
        text: 'Real-time leads, listing feedback, custom agent branding, essential neighborhood information and embed tools.',
        icon: Megaphone,
      },
      {
        title: 'Analytics',
        text: 'Engagement stats show traffic, visitor numbers and browsing time, helping agents showcase marketing success to sellers.',
        icon: ChartColumn,
      },
    ],
  },
  {
    // Live: a full-width image band with the figure over it
    type: 'split',
    heading: '72%',
    body: <p>of buyers prefer 3D tours to get a better feel for the space than static photos alone.</p>,
    media: {type: 'image', image: {src: '/assets/Uploads/Unleash-the-power-of-iGUIDE_Brochure_-67.jpg', alt: '', width: 1746, height: 1120}},
    mediaClassName: 'rounded-2xl',
    background: 'surface',
  },
  {
    type: 'split',
    heading: 'Speed up your remodel with iGuide Drawing Packages',
    body: (
      <>
        <p>Thinking about a renovation or remodel? Ask your REALTOR® how to request accurate structural drawings from your iGuide.</p>
        <p>
          This means you’ll save time and can avoid hiring someone to draw it all from scratch. Whether you’re moving walls or dreaming of a new layout, iGuide
          gives you a clear starting point.
        </p>
        <p>So next time you’re planning a home project, think about how iGuide can make it easier.</p>
      </>
    ),
    media: {
      type: 'image',
      image: {src: '/assets/Uploads/portrait-of-architects-having-discussion-in-office-2023-11-27-05-12-19-utc.jpg', alt: '', width: 5472, height: 3648},
    },
    mediaClassName: 'rounded-2xl',
  },
  {
    type: 'cta',
    heading: 'Find an iGuide Service Provider in your area',
    ctas: [{label: 'Get started today', href: 'https://ion.goiguide.com/'}],
  },
]
