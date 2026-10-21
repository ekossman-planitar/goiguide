/** /iguide-holmes-approved — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {MediaView} from '@/components/blocks/MediaView'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {FloatingBookButton} from '@/components/pages/FloatingBookButton'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {book, shopCameras} from '@/lib/content/industries/shared'

export const meta = {
  title: 'Make It Right with iGuide | Trusted by Mike Holmes for Accuracy and Documentation | iGuide',
  description:
    'Discover how iGuide helps builders and inspectors document every detail with precision. Trusted by professionals and approved by Mike Holmes, iGuide captures accurate floor plans, 3D tours, and measurement data that make it right the first time.',
  path: '/iguide-holmes-approved',
}

const drawingSample = {label: 'Download drawing sample', href: '/assets/RS0001-Advanced-Drawing-Package.zip', variant: 'secondary' as const}

/** Live: full-screen "Thanks! You're booked." screen shown by the booking pop-up script after a Calendly booking */
function BookedConfirmation() {
  return (
    <div
      id="custom-confirmation"
      className="fixed inset-0 z-[9999] hidden flex-col items-center justify-center bg-white text-center opacity-0 transition-opacity duration-300"
    >
      <div className="absolute top-0 left-0 h-1 w-full bg-line">
        <div id="progress-bar" className="h-full w-0 bg-primary transition-[width] duration-[3000ms] ease-linear" />
      </div>
      <div className="p-8">
        <h3 className="mb-4 text-2xl font-semibold text-ink">Thanks! You’re booked.</h3>
        <p className="text-lg text-body">We’ll follow up with you shortly. Check your inbox for confirmation.</p>
      </div>
    </div>
  )
}

export const blocks: Block[] = [
  {
    type: 'custom',
    id: 'hero',
    background: 'surface',
    children: (
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          <h1>
            <FallbackImage
              src="/assets/make-it-right-with-iguide-logo-centered.svg"
              alt="MAKE IT RIGHT WITH IGUIDE"
              width={560}
              height={220}
              priority
              unoptimized
              className="mx-auto h-auto w-full max-w-[520px] lg:mx-0"
            />
          </h1>
          <p className="mt-6 text-xl leading-[30px] font-semibold text-ink">Trusted by professionals. Proven by Mike Holmes.</p>
          <CtaButtons
            className="mt-8 justify-center lg:justify-start"
            ctas={[
              {label: "Mike's testimonial", href: '/iguide-holmes-approved#section-3'},
              {label: 'Watch the podcast', href: '/iguide-holmes-approved#section-8', variant: 'secondary'},
            ]}
          />
          <FloatingBookButton />
          <BookedConfirmation />
        </div>
        <FallbackImage
          src="/assets/mike-holmes-hero.png"
          alt="photo - Mike Holmes"
          width={1200}
          height={900}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full rounded-2xl object-cover"
        />
      </div>
    ),
  },
  {
    type: 'split',
    id: 'section-2',
    heading: 'Bad data builds bad projects',
    body: (
      <p>
        Most mistakes happen before the first hammer swings with missing photos, bad measurements and undocumented changes. iGuide captures it
        all in one scan, so you can focus on making it right, not backtracking.
      </p>
    ),
    ctas: [book(), drawingSample],
    media: {
      type: 'embed',
      src: 'https://youriguide.com/pre_and_post_construction?branded=1&autostart=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash',
      title: 'iGuide tour: pre and post construction',
      aspect: 'aspect-[4/3]',
    },
  },
  {
    type: 'quotes',
    id: 'section-3',
    background: 'surface',
    heading: 'You can’t make it right without accurate data',
    subheading:
      'We gave Mike and his team our PLANIX R1 Camera System to try out for a few weeks and give us their honest opinion. Here’s what they had to say about it.',
    quotes: [
      {
        quote: 'What sets iGuide apart is the deliverables. We’re talking floor plans in DWG, point-cloud DXF, 3D walkthroughs, annotated PDFs: the whole package.',
        name: 'Mike Holmes',
        photo: {src: '/assets/Mike-Construction.png', alt: 'Mike Construction'},
      },
      {
        quote:
          'The PLANIX R1 camera lets us measure, photograph, and document a space all at once, with no more tape measures, hand sketches, or missed dimensions. What used to take half a day now takes under an hour.',
        name: 'Michael Holmes Jr',
        photo: {src: '/assets/Michael-Construction.png', alt: 'Michael Construction'},
      },
      {
        quote:
          'We’ve tested iGuide’s measurements ourselves, and the accuracy is spot on. You can’t build, inspect, or design on guesswork. This gives us data we can rely on for planning, quoting, and execution.',
        name: 'Sherry Holmes',
        photo: {src: '/assets/Sherry-Construction.png', alt: 'Sherry Construction'},
      },
    ],
  },
  {
    type: 'steps',
    id: 'section-4',
    heading: 'How it works',
    subheading: 'From capture to delivery, here’s how iGuide fits into your workflow.',
    steps: [
      {
        title: 'Capture',
        body: (
          <>
            Connect your iGuide PLANIX R1 camera to your device, create a project, and scan the site. Don’t want to buy a camera? Find{' '}
            <a href="https://ion.goiguide.com/">your local iGuide Pro</a> to capture for you!
          </>
        ),
        image: {src: '/assets/Uploads/Capture_and_processing_150dpi.jpg', alt: 'photo - Capture Specialist'},
      },
      {
        title: 'Draft',
        body: 'Upload to the iGuide Portal directly from on-site. In 48–72* hours, your CAD files, 3D walkthrough and point cloud will be ready.',
        image: {src: '/assets/Uploads/Process_72dpi.jpg', alt: 'photo - PLANIX App in use'},
      },
      {
        title: 'Deliver',
        body: 'Your files arrive in days, not weeks. Ready for planning, design or review. *Deliverable timing varies depending on selection.',
        image: {src: '/assets/Uploads/Utilize_72dpi.jpg', alt: 'photo - Sharing an iGuide with the Team'},
      },
    ],
  },
  {
    type: 'cta',
    heading: 'Start your next project the right way',
    text: 'See how iGuide helps you capture, plan and deliver with confidence.',
    ctas: [book(), drawingSample],
  },
  {
    type: 'cards',
    heading: 'What you get with iGuide, trusted by the builders who make it right',
    columns: 4,
    cards: [
      {
        title: 'Reliable, standards-based floor plans',
        text: 'Deliver ANSI and RMS compliant layouts with verified square footage and as built measurements. Ensure your drawings, takeoffs and documentation meet professional standards every time.',
      },
      {
        title: 'Fast, ready-to-use formats from one capture',
        text: 'Scan once and get everything. Generate floor plans, measurements, and 3D models in hours, delivered as PDF, DWG, or RVT files. Easily integrate with your tools from AutoCAD and Revit to Xactimate.',
      },
      {
        title: 'Immersive 3D tours for design and review',
        text: 'View, verify and share interactive 3D tours to align stakeholders and avoid rework. Perfect for visual walkthroughs, remote inspections and project coordination.',
      },
      {
        title: 'Full data ownership, no subscriptions',
        text: 'Your scans, your files, your control. Receive all project data including floor plans, 3D tours, and reports, ready to share and archive without ongoing hosting or access fees.',
      },
    ],
  },
  {
    type: 'custom',
    id: 'section-8',
    background: 'surface',
    heading: 'Hear it from Mike on the Holmes on Homes Podcast',
    align: 'center',
    children: (
      <div className="mx-auto max-w-4xl">
        <MediaView media={{type: 'embed', src: 'https://www.youtube.com/embed/bSAKi6V6w8Y?si=6izr1ljlkOMNreDJ', title: 'Holmes on Homes Podcast with Mike Holmes'}} />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <a href="https://open.spotify.com/episode/6jgUcuYxzzZqXxFc8SNHfW?si=6f5JgB97QnSiBDAPklbC_A" target="_blank" rel="noopener noreferrer">
            <FallbackImage src="/assets/list-on-spotify-logo.png" alt="listen on Spotify" width={200} height={60} className="h-12 w-auto" />
          </a>
          <a href="https://www.youtube.com/watch?si=xnFkIg4heFCyHZ-V&v=bSAKi6V6w8Y&feature=youtu.be" target="_blank" rel="noopener noreferrer">
            <FallbackImage src="/assets/watch-on-youtube-logo.png" alt="watch on YouTube" width={200} height={60} className="h-12 w-auto" />
          </a>
        </div>
      </div>
    ),
  },
  {
    type: 'quote',
    quote: {
      quote:
        'One of the smartest things we can do on any build is document what’s behind the walls. iGuide lets us do that in 3D. We can tag the electrical, plumbing, or structural elements before they’re covered, so years from now, there’s no guessing where something is. That’s priceless for maintenance and renovations.',
      name: 'Mike Holmes',
      role: 'Professional Contractor and TV Host',
      company: 'The Holmes Group',
      photo: {src: '/assets/mike-holmes-cta.png', alt: 'photo - Mike Holmes'},
    },
  },
  {
    type: 'split',
    id: 'section-9',
    heading: 'PLANIX R1',
    body: (
      <>
        <FallbackImage src="/assets/Holmes-Approved-Logo.svg" alt="logo-Holmes Approved" width={160} height={160} unoptimized className="h-28 w-auto" />
        <p>
          Capture high-res 360° imagery and precise measurements in seconds with the all-in-one PLANIX R1, built for speed, accuracy, and scale.
        </p>
        <table className="w-full text-left text-base">
          <tbody>
            {[
              ['360° Camera', 'Ricoh Theta X'],
              ['Resolution', '60MP'],
              ['Scan speed', '8 sec*'],
              ['Size', '9.9 cm × 7.9 cm × 29.0 cm'],
              ['Weight', '725g'],
            ].map(([label, value]) => (
              <tr key={label} className="border-b border-line">
                <th scope="row" className="py-3 pr-4 font-semibold text-ink">
                  {label}
                </th>
                <td className="py-3 text-body">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-muted">*Scanning speed varies depending on chosen settings and lighting conditions.</p>
      </>
    ),
    ctas: [{...shopCameras, label: 'Shop PLANIX Camera Systems', variant: 'primary', newTab: true}],
    media: {type: 'image', image: {src: '/assets/Uploads/PLANIX_R1_Front_72dpi.png', alt: 'photo - iGuide PLANIX R1'}},
  },
  {
    type: 'custom',
    id: 'section-10',
    background: 'sky',
    children: (
      <div id="footer-form" className="mx-auto max-w-2xl rounded-2xl border border-line bg-white p-6 shadow-lg md:p-10">
        <h2 className="text-center text-[32px] font-semibold leading-[normal] text-ink md:text-5xl md:leading-[normal]">
          Ready to be like Mike and make it right?
        </h2>
        <HubSpotForm formId="4f4ebe1c-b17d-46b5-ae39-898a4d9be2a8" className="mt-8 min-h-[320px]" />
      </div>
    ),
  },
]
