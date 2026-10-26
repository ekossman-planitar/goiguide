/** /get-iguide/rep/iguide-photos — copy, links and asset paths from the live page (checked 2026-10-14). */
import {ChartColumn, MousePointerClick, Presentation, Scaling} from 'lucide-react'
import type {Block} from '@/components/blocks/Blocks'
import {MediaView} from '@/components/blocks/MediaView'

export const meta = {
  title: 'iGuide Photos | iGuide',
  // NEW description (live had none)
  description:
    'iGuide Photos is a quick and simple way to share your photos, with hosting for up to 150 photos, automatic MLS resizing, agent branding and analytics.',
  path: '/get-iguide/rep/iguide-photos',
}

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'iGuide Photos',
    // Live: header background image
    media: {type: 'image', image: {src: '/assets/Uploads/customer-success-inline-showcase_real_estate_photography.jpg', alt: ''}},
  },
  {
    type: 'split',
    background: 'surface',
    heading: "It's easy to share your iGuide photos",
    body: <p>iGuide Photos is a quick and simple way to share your photos and features:</p>,
    list: [
      'Hosting up to 150 Photos',
      'Automatic MLS Resizing',
      'Email Report',
      'Agent Branding',
      'Analytics Report',
      'Embedding Tool',
      'Video/Drone Integration',
      'Feature Sheet Creator',
      'Neighbourhood Map',
    ],
    media: {type: 'embed', src: 'https://www.youtube.com/embed/ER5Z2z0TZCI', title: 'iGuide Photos video'},
  },
  {
    type: 'cards',
    heading: 'Showcase your photos',
    subheading: 'iGuide Photos is packed with professional features your clients will love.',
    align: 'center',
    cards: [
      {
        title: 'Elegant Presentation',
        text: 'Present your images in an attractive slideshow.',
        icon: Presentation,
      },
      {
        title: 'Easy to use',
        text: 'Avoid complicated sharing services and deliver photos to your clients via iGuide photos.',
        icon: MousePointerClick,
      },
      {
        title: 'Automatic photo resizing',
        text: 'No editing required. Your images are automatically resized.',
        icon: Scaling,
      },
      {
        title: 'Advanced analytics',
        text: 'Track image views, sources, and view duration.',
        icon: ChartColumn,
      },
    ],
  },
  // Live: embed script (//iguidephotos.com/js/embedded.js) for this iGuide Photos gallery; rendered as an iframe of the same URL
  {
    type: 'custom',
    heading: 'Explore iGuide photos',
    align: 'center',
    background: 'surface',
    children: (
      <MediaView
        media={{type: 'embed', src: 'https://iguidephotos.com/embed/mjzi2_301_king_st_e_kitchener_on?bgcolor=FFFFFF', title: 'iGuide Photos gallery of 301 King St E, Kitchener, ON'}}
      />
    ),
  },
]
