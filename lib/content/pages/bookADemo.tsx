/** /book-a-demo — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import type {Cta} from '@/components/blocks/types'
import {BookADemoChoice, FloatingDemoButton, OpenCalendlyFromParam} from '@/components/pages/BookADemoChoice'
import {HeroColumns} from '@/components/pages/HeroColumns'
import {RatingRow} from '@/components/sections/RatingRow'

export const meta = {
  title: 'Book an iGuide Demo | iGuide',
  description:
    'Book an iGuide demo and let our professionals walk you though how our system delivers the capture data you need to deliver results for your business.',
  path: '/book-a-demo',
}

/** Live buttons on this page carry class `book-demo` (opens Calendly via the site-wide BookingPopup) */
const bookDemo: Cta = {label: 'Book a product tour', href: '/book-a-demo', className: 'book-demo'}

export const blocks: Block[] = [
  {
    type: 'custom',
    background: 'sky',
    children: (
      <>
        <HeroColumns heading="See how iGuide works for you" aside={<BookADemoChoice />}>
          <p className="text-xl leading-[30px]">iGuide delivers floor plans, virtual tours and accurate property data all in one visit.</p>
          <div className="pt-2">
            <RatingRow />
          </div>
        </HeroColumns>
        <OpenCalendlyFromParam />
        <FloatingDemoButton />
      </>
    ),
  },
  {
    type: 'logos',
    heading: 'Trusted by thousands of professionals worldwide',
    logos: [
      {src: '/assets/Pizza-Pizza-Logo.png', alt: 'logo - Pizza Pizza'},
      {src: '/assets/make-it-right.svg', alt: 'logo - Make it Right'},
      {src: '/assets/Uploads/bar_burrito-v3.png', alt: 'logo - BarBurrito'},
      {src: '/assets/Uploads/Scrolling-LogosRemax.png', alt: 'logo - RE/MAX'},
      {src: '/assets/Uploads/Scrolling-LogosKW.png', alt: 'logo - Keller Williams'},
      {src: '/assets/Uploads/Scrolling-LogosRoyalLePage.png', alt: 'logo - Royal LePage'},
      {src: '/assets/Uploads/loookinside-logo.png', alt: 'logo - logo - LooOK INside'},
      {src: '/assets/Uploads/Scrolling-LogosPrepTours.png', alt: 'logo - PREP Tours'},
      {src: '/assets/Uploads/Scrolling-LogosVisual.png', alt: 'logo - Visual Advantage'},
      {src: '/assets/Uploads/Scrolling-LogosDeft.png', alt: 'logo - Deft Group'},
      {src: '/assets/Uploads/Scrolling-LogosSeeknow.png', alt: 'logo - SeekNow'},
      {src: '/assets/Uploads/Scrolling-LogosGrindley.png', alt: 'logo - Grindley Williams'},
      {src: '/assets/Uploads/Scrolling-LogosPrepTours-v2.png', alt: 'logo - PuroClean'},
    ],
  },
  {
    type: 'featureTabs',
    id: 'first-look',
    heading: 'Get a first look at the full iGuide experience',
    subheading: 'The best way to understand iGuide is to experience it yourself.',
    label: 'The iGuide experience',
    items: [
      {
        id: 'capture',
        title: 'Quick, reliable capture',
        text: <p>Fast. Precise. Easy to use. See how the PLANIX R1 camera captures everything in minutes.</p>,
        media: {type: 'embed', src: 'https://www.youtube.com/embed/aEh08zsWO7E?si=oGdkc_bBEQJ6UEDw', title: 'YouTube video player'},
      },
      {
        id: 'experience',
        title: 'Immersive, easy-to-navigate experience',
        text: <p>Move through the space, see the data and understand how it all comes together.</p>,
        media: {type: 'embed', src: 'https://www.youtube.com/embed/T2SlcRZqXsE?si=mIv09EYnTFqlrwIA', title: 'YouTube video player'},
      },
      {
        // Live has no media for this step (its media container is empty)
        id: 'deliverables',
        title: 'Deliverables built for pros',
        text: <p>CAD files for architecture, engineering, and construction, floor plan sketches for insurance and restoration, and more.</p>,
      },
    ],
    ctas: [bookDemo],
  },
  {
    type: 'quotes',
    id: 'testimonials',
    heading: 'Don’t take our word for it, hear it from the pros.',
    subheading: 'Real stories from professionals using iGuide to win more business, save time, and deliver better results.',
    background: 'surface',
    link: {label: 'View customer stories', href: '/customer-stories'},
    quotes: [
      {
        quote:
          'iGuide allows potential buyers to capture an emotional attachment and picture themselves in the property. We have noticed that the more layers of visual tools our properties offer, the longer buyers stay on our site, dreaming of their dream house, and of course making that essential offer.',
        name: 'Maryna de Lannoy',
        role: 'Design Team & Client Care',
        company: 'Mark Richards Team, RE/MAX Hallmark Realty',
        logo: {src: '/assets/remax-logo-demo__FitMaxWzkzMCwzMzZd.png', alt: 'logo - ReMax', width: 930, height: 171},
      },
      {
        quote:
          'We are sold on this technology as it is the most robust way of giving a buyer a sense of space and layout without actually being on site. About half of our traffic comes from mobile, and this system allows us to display real estate most effectively online.',
        name: 'Desmond von Teichman',
        role: 'Broker of Record',
        company: 'Royal LePage Locations North',
        logo: {src: '/assets/royal-lepage-logo-demo.png', alt: 'logo - Royal LePage', width: 2400, height: 884},
      },
      {
        quote:
          'Before iGuide, we struggled with unreliable vendors, higher costs, and the need for repeat site visits. iGuide’s Service Pro network captures all the data we need, and iGuide delivers CAD drawings and 3D tours, streamlining our process. iGuide\'s fast, efficient, and affordable, saving us both time and money.',
        name: 'AR Eissa',
        role: 'Sr. Construction Manager',
        company: 'BarBurrito',
        logo: {src: '/assets/Uploads/bar_burrito-v3.png', alt: 'logo - Bar Burrito', width: 586, height: 172},
      },
      {
        quote:
          '10 adjusters and 9 of them don’t know how to frame a shot. If you let us take an iGuide virtual tour, then you’ll have a million still images. iGuide technology has given Deft a huge competitive advantage. Simply seeing how much value it’s brought to deft, we fell in love with it!',
        name: 'Jeremiah Kiefer',
        role: 'Founder & CEO',
        company: 'The Deft Group',
        logo: {src: '/assets/deft-logo-demo.png', alt: 'logo - The Deft Group', width: 1376, height: 544},
      },
    ],
  },
]
