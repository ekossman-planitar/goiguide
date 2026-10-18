/** /get-iguide/irc/fire-investigation — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {MediaView} from '@/components/blocks/MediaView'
import {HeroFormColumns} from '@/components/pages/HeroFormColumns'

export const meta = {
  title: 'Experience iGuide: Precise floor plans & 3D virtual tours made easy | iGuide',
  description:
    'Quickly create 3D virtual tours, CAD floor plans and 3D models with the iGuide PLANIX camera system. Take 360° photos and 1,000s of measurements in minutes, capturing rich property data.',
  path: '/get-iguide/irc/fire-investigation',
}

export const blocks: Block[] = [
  {
    type: 'custom',
    background: 'surface',
    children: (
      <HeroFormColumns
        heading="Capture accurate floor plans & property data in 15 min or less"
        subheading="Investigate, document and resolve faster with iGuide."
        formHeading="Learn more about iGuide for Fire Investigators"
        formText="Connect with an iGuide Specialist to get a brochure, book a demo and discuss how iGuide can help you deliver fast and accurate fire investigations."
        formId="b4e5ac23-7869-41e2-9da7-af466a835196"
      />
    ),
  },
  {
    type: 'logos',
    logos: [
      {src: '/assets/Uploads/compass.png', alt: ''},
      {src: '/assets/Uploads/Scrolling-LogosSeeknow.png', alt: ''},
      {src: '/assets/Uploads/Scrolling-LogosColonial-Claims.png', alt: ''},
      {src: '/assets/Uploads/Scrolling-LogosDeft.png', alt: 'logo - Deft Group'},
      {src: '/assets/Uploads/smis.png', alt: ''},
      {src: '/assets/Uploads/Scrolling-LogosGrindley.png', alt: ''},
      {src: '/assets/Uploads/Scrolling-LogosPrepTours-v2.png', alt: ''},
      {src: '/assets/Uploads/joseph_myers.png', alt: ''},
    ],
  },
  {
    type: 'cards',
    heading: 'Why Fire Investigators choose iGuide',
    align: 'center',
    columns: 3,
    cards: [
      {
        title: 'Quick capture technology',
        text: 'Spend less time on-site. iGuide’s PLANIX R1 captures high-resolution visuals and thousands of LiDAR measurements per scan.',
        icon: {src: '/assets/Uploads/Icons_Processing-Time__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Accurate and reliable',
        text: 'Eliminate guesswork and reduce human error. Automate sketch creation and capture critical data with precision.',
        icon: {src: '/assets/Uploads/Home-Images-Accurate-measurements-icon__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Real-Time Tagging feature',
        text: 'Add photos, notes, and videos directly to your iGuide 3D Walkthrough during the scan. Capture every critical detail effortlessly.',
        icon: {src: '/assets/Icons/Real-time_Tagging__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Data ownership',
        text: 'The choice is yours – keep a digital download of your files or host them on our secure hosting platform.',
        icon: {src: '/assets/Icons/Icon-Master_300x300_Value_Security__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Pay-per project pricing',
        text: 'No recurring fees. Pay only for the processing and files you need instead of an expensive subscription.',
        icon: {src: '/assets/Uploads/Icons-_No-Fees__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Verisk Xactimate integration',
        text: 'Instantly convert your iGuide data into Xactimate-compatible formats to streamline reporting and claims.',
        icon: {src: '/assets/Icons/Icon-300x300_Superior-Navigation__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
    ],
  },
  // Live: a two-slide testimonial slider
  {
    type: 'quotes',
    background: 'surface',
    quotes: [
      {
        quote: 'This product amazes me every time I use it. It works flawlessly and makes my investigations so much easier.',
        name: 'Roger Thorpe',
        role: 'Fire Investigator',
        company: 'Joseph Myers Investigations LLC',
        photo: {src: '/assets/roger1.png', alt: ''},
      },
      {
        quote: 'The Xactimate ESX file is incredible. The time saved on return trips alone makes the investment worthwhile.',
        name: 'Chris A. Howell',
        company: 'Smoky Mountain Inspection Services, Inc.',
        photo: {src: '/assets/chris1.png', alt: ''},
      },
    ],
  },
  {
    type: 'split',
    heading: 'Significantly reduce the time spent documenting your claims',
    body: (
      <p>
        The iGuide PLANIX R1 does more than just take pictures. Unlike a conventional camera system, it measures and photographs a space
        simultaneously.
      </p>
    ),
    media: {
      type: 'embed',
      src: 'https://youriguide.com/embed/i6qr7_1122_sample_road_kitchener_on?autostart=1&bgcolor=FFFFFF',
      title: 'iGuide 3D tour of 1122 Sample Road, Kitchener, ON',
    },
  },
  {
    type: 'cards',
    heading: 'Interactive documentation in 3 easy steps',
    align: 'center',
    background: 'surface',
    columns: 3,
    cards: [
      {
        title: 'Capture',
        text: 'Connect the iGuide PLANIX R1 to your smart device, scan the property, and gather visuals and measurements simultaneously.',
        icon: {src: '/assets/Icons/1__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Process',
        text: 'Automatically generate floor plans with Instant Sketch. Upgrade to iGuide Standard or Premium ESX files for enhanced capabilities.',
        icon: {src: '/assets/Icons/2__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Use',
        text: 'Share your comprehensive iGuide report with adjusters, clients, and teams to expedite claim resolutions.',
        icon: {src: '/assets/Icons/3__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
    ],
  },
  {
    type: 'custom',
    heading: 'Want more resources? Check out this webinar on how iGuide revolutionizes fire scene documentation!',
    align: 'center',
    children: (
      <div className="mx-auto max-w-4xl">
        <MediaView media={{type: 'embed', src: 'https://www.youtube.com/embed/2Qbinadn9Q0?feature=oembed', title: 'Using technology in fire scene documentation'}} />
      </div>
    ),
  },
]
