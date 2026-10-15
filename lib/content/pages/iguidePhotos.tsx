/** /get-iguide/rep/iguide-photos — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {MediaView} from '@/components/blocks/MediaView'

export const meta = {
  title: 'iGUIDE Photos | iGUIDE',
  // NEW description (live had none)
  description:
    'iGUIDE Photos is a quick and simple way to share your photos, with hosting for up to 150 photos, automatic MLS resizing, agent branding and analytics.',
  path: '/get-iguide/rep/iguide-photos',
}

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'iGUIDE Photos',
    // Live: header background image
    media: {type: 'image', image: {src: '/assets/Uploads/customer-success-inline-showcase_real_estate_photography.jpg', alt: ''}},
  },
  {
    type: 'split',
    background: 'surface',
    heading: "It's easy to share your iGUIDE photos",
    body: <p>iGUIDE Photos is a quick and simple way to share your photos and features:</p>,
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
    media: {type: 'embed', src: 'https://www.youtube.com/embed/ER5Z2z0TZCI', title: 'iGUIDE Photos video'},
  },
  {
    type: 'cards',
    heading: 'Showcase your photos',
    subheading: 'iGUIDE Photos is packed with professional features your clients will love.',
    align: 'center',
    cards: [
      {
        title: 'Elegant Presentation',
        text: 'Present your images in an attractive slideshow.',
        icon: {src: '/assets/Icons/Icon_300x300_Reseller_Marketing-tools__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Easy to use',
        text: 'Avoid complicated sharing services and deliver photos to your clients via iGUIDE photos.',
        icon: {src: '/assets/Icons/Icon-Master_300x300_Value_Content-delivery-system__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Automatic photo resizing',
        text: 'No editing required. Your images are automatically resized.',
        icon: {src: '/assets/Uploads/Icons_Photos__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Advanced analytics',
        text: 'Track image views, sources, and view duration.',
        icon: {src: '/assets/Icons/Icon-300x300_Value_Flexible-file-formats__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
    ],
  },
  // Live: embed script (//iguidephotos.com/js/embedded.js) for this iGUIDE Photos gallery; rendered as an iframe of the same URL
  {
    type: 'custom',
    heading: 'Explore iGUIDE photos',
    align: 'center',
    background: 'surface',
    children: (
      <MediaView
        media={{type: 'embed', src: 'https://iguidephotos.com/embed/mjzi2_301_king_st_e_kitchener_on?bgcolor=FFFFFF', title: 'iGUIDE Photos gallery of 301 King St E, Kitchener, ON'}}
      />
    ),
  },
]
