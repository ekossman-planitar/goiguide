/** /iguide/3d-virtual-tours — copy, links and asset paths from the live page (checked 2026-10-07). */
import {book} from './shared'

export const virtualTours = {
  meta: {
    title: 'iGUIDE 3D Virtual Tours with Accurate Floor Plans & Measurements | iGUIDE',
    description:
      'Explore iGUIDE 3D virtual tours with built in floor plans, room measurements, reports, tagging and rich media. Capture once and deliver immersive property documentation for real estate, insurance, restoration and more.',
    path: '/iguide/3d-virtual-tours',
    ogImage: '/assets/Solutions_Site-Plans.png',
  },
  hero: {
    heading: 'More than just a virtual tour',
    subheading:
      'Every iGUIDE includes immersive virtual tours, accurate floor plans, room measurements and property documentation in one capture.',
    ctas: [book()],
    tour: {
      src: 'https://youriguide.com/100_chattel_st_haverhill_ma?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash',
      title: 'iGUIDE virtual tour of 100 Chattel St, Haverhill, MA',
    },
  },
  portals: {
    heading: 'iGUIDE virtual tours integrate with',
    logos: [
      {src: '/assets/realtor-v2.ca.png', alt: 'Realtor.ca', width: 133, height: 45},
      {src: '/assets/realtor.com.png', alt: 'Realtor.com', width: 133, height: 26},
      {src: '/assets/zillow-v2.png', alt: 'Zillow', width: 100, height: 25},
      {src: '/assets/flexmls-v2.png', alt: 'FlexMLS', width: 120, height: 52},
      {src: '/assets/funda-v3.png', alt: 'Funda', width: 100, height: 36},
      {src: '/assets/realestate.com.au.png', alt: 'Real Estate AU', width: 167, height: 27},
    ],
  },
  deliverables: {
    heading: 'One capture. Multiple deliverables.',
    cards: [
      {
        title: '3D Virtual Tour',
        text: 'Immersive walkthroughs that let clients, adjusters and teams explore remotely.',
        image: {src: '/assets/iguide-viewer-480.png', alt: '3D virtual tour interface showing an exterior site view with navigation controls', width: 480, height: 480},
        link: {label: 'View sample tour', href: 'https://youriguide.com/334_south_lake_shore_drive_thousand_oaks?branded=1&autostart=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash'},
      },
      {
        title: 'Floor Plans',
        text: 'Accurate floor plans generated automatically with every iGUIDE capture.',
        image: {src: '/assets/floorplan-480.png', alt: 'Color-coded iGUIDE floor plan showing room outlines and measurements', width: 480, height: 480},
        link: {label: 'View floor plan sample', href: '/assets/iGUIDE-Schematic-Floor-Plan.pdf'},
      },
      {
        title: 'Room Measurements',
        text: 'Reliable room and object measurements with real world accuracy.',
        image: {src: '/assets/measurement-mode-480.png', alt: 'iGUIDE measurement mode showing live room dimensions inside the virtual tour', width: 480, height: 480},
        link: {label: 'Using the measurement tool', href: 'https://help.youriguide.com/hc/en-us/articles/29058226468882-Using-the-Measurement-Tool'},
      },
      {
        title: 'Reports & Analytics',
        text: 'Branded reports and engagement insights for listings, claims and documentation.',
        image: {src: '/assets/analytics.jpg', alt: 'Branded analytics report showing weekly visit analytics', width: 480, height: 480},
        link: {label: 'View sample report', href: '/get-iguide/tools/how-to-iguide-report'},
      },
      {
        title: 'Real-Time Tagging',
        text: 'Document issues, notes and property details as you move through a space.',
        image: {src: '/assets/real-time-tags.png', alt: 'Tagging interface showing a flagged issue pinned inside the virtual tour', width: 480, height: 480},
        link: {label: "See what we've upgraded", href: '/blogs/enhanced-tags-property-documentation'},
      },
      {
        title: 'Rich Media',
        text: 'Showcase listings with embedded photos, videos and interactive visual media.',
        image: {src: '/assets/iguide-viewer-photos-480.png', alt: 'Grid of property photos and video thumbnails embedded inside the virtual tour', width: 480, height: 480},
        link: {label: 'View media example', href: 'https://youriguide.com/100_chattel_st_haverhill_ma?page=gallery'},
      },
    ],
  },
  extend: {
    heading: 'Extend what your iGUIDE can do',
    subheading: 'Host live walkthroughs, publish to Street View, stage interiors and customize floor plans.',
    tabs: [
      {
        id: 'virtual-showing',
        label: 'Virtual Showing',
        media: {type: 'embed' as const, src: 'https://www.youtube.com/embed/VtvfYwgyeY4?si=G4yr98DLVN0jj7xR', title: 'iGUIDE Virtual Showing feature overview video'},
        text: 'Lead live remote walkthroughs where everyone follows the same iGUIDE tour in real time.',
      },
      {
        id: 'virtual-staging',
        label: 'Virtual Staging',
        media: {type: 'embed' as const, src: 'https://www.youtube.com/embed/jidt64auBmE?si=Y3WWFiQLFBlD2JgB', title: 'iGUIDE Virtual Staging feature overview video'},
        text: 'Show the potential of a space with staged 360° images, furniture, finishes and layout ideas.',
      },
      {
        id: 'street-view',
        label: 'Google Street View',
        media: {
          type: 'embed' as const,
          src: 'https://www.google.com/maps/embed?pb=!1m0!3m2!1sen!2sca!4v1494346336662!6m8!1m7!1srMsnnYwIl08AAAQ7Ls0XRQ!2m2!1d43.46029316721192!2d-80.51879094440153!3f113.72394282981698!4f-4.528949799369286!5f0.4000000000000002',
          title: 'Google Street View of the property exterior and surrounding neighborhood',
        },
        text: 'Publish eligible public spaces to Google Street View so people can explore them on Google Maps.',
      },
      {
        id: 'floorplanner',
        label: 'Floorplanner',
        media: {type: 'embed' as const, src: 'https://floorplanner.com/projects/76006167/viewer', title: 'Interactive floor planner viewer for the property layout'},
        text: 'Turn iGUIDE floor plan data into editable 2D and 3D layouts with Floorplanner.',
      },
    ],
  },
  testimonial: {
    quote: "We don't sell it as an iGUIDE with pictures. We sell it as the pictures with floor plans and measurements and a 3D tour.",
    name: 'Ron Elias',
    role: 'VP',
    company: 'London House Photography',
    photo: {src: '/assets/Testimonial-Headshots/Ron-Elias.png', alt: 'Ron Elias, VP of London House Photography', width: 300, height: 300},
  },
  // The live FAQ answers are placeholder text, so the FAQ is left off until real answers exist
  cta: {
    heading: 'Get started with iGUIDE 3D virtual tours',
    text: 'See how iGUIDE 3D virtual tours help you explore, document and share spaces.',
    ctas: [book('Book a 15-minute walkthrough')],
  },
}
