/** /design-construction — copy, links and asset paths from the live page (checked 2026-10-07). */
import type {Block} from '@/components/blocks/Blocks'
import {CheckList} from '@/components/blocks/CheckList'
import {book} from './shared'

export const meta = {
  title: 'Commercial Site Surveys & As-Built Documentation | iGUIDE for Design Teams | iGUIDE',
  description:
    'Get accurate commercial site surveys and as-built documentation in days, not weeks. iGUIDE delivers consistent CAD files, precise measurements, and immersive walkthroughs for offices, retail, hospitality, and multi-location design projects.',
  path: '/design-construction',
}

// Live: "Request an iGUIDE Site Survey" opens a request pop-up
const requestSurvey = book('Request an iGUIDE Site Survey')
const packageSample = '/assets/183-Weber-Advanced-Drawing-Package.zip'

const samples = [
  {label: 'Download plotted PDF sample', href: '/assets/Sample-Files/Plotted-PDF-Sample.pdf'},
  {label: 'Download CAD sample', href: 'https://planitar.sharepoint.com/:u:/s/iGUIDE-Resources-and-Assets/IQAKknNDBH-yRJIJcrFh8q-eAbEKGgk6ECABHgW-FQB_GKg?e=0lh6cK'},
  {label: 'Download 3D model sample', href: 'https://planitar.sharepoint.com/:u:/s/iGUIDE-Resources-and-Assets/IQCooj0eaFhLSoH0Sxrh0Sc1AWTBJozXsZQFbOCOZJFHKpk?e=Zlx8a7'},
  {label: 'Sample walkthrough', href: 'https://youriguide.com/56c4afe2-1548-495b-ac08-44ef56cc979e'},
  {label: 'Site survey checklist', href: '/assets/Sample-Files/iGUIDE-Site-Survey-Checklist.pdf'},
]

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Fast, consistent site surveys for every location, nationwide',
    subheading: 'Purpose built for fast moving QSR and retail rollouts.',
    extra: (
      <>
        <p className="font-semibold text-ink">One standard. Every site. Every time.</p>
        <p className="mt-2">
          For fast-paced QSR and retail teams, iGUIDE provides reliable CAD files, measurements and virtual walkthroughs, standardized across all
          regions and store formats.
        </p>
        <CheckList
          className="mt-4 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2.5 sm:space-y-0"
          items={[
            'Standardized outputs across all markets',
            'Predictable timelines that keep openings on track',
            'LiDAR scanner delivers consistent, accuracy',
            'Built for rapid QSR + retail rollouts',
          ]}
        />
      </>
    ),
    ctas: [requestSurvey, {label: 'View iGUIDE CAD Package sample', href: packageSample, variant: 'secondary'}],
    media: {
      type: 'image',
      image: {src: '/assets/d772616a36/iguidespotlight_high.gif', alt: 'Photo - Advanced Drawing Packages Sample Package'},
    },
  },
  {
    type: 'logos',
    heading: 'Trusted by thousands of Design & Construction professionals worldwide',
    logos: [
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-MC3-Design.png', alt: 'logo - MC3 Design'},
      {src: '/assets/make-it-right.svg', alt: 'logo - Make it Right'},
      {src: '/assets/Chris_Fernandes_Design_Corp.png', alt: 'logo - Chris Fernandes'},
      {src: '/assets/Uploads/bar_burrito-v3.png', alt: 'logo - BarBurrito'},
      {src: '/assets/Pizza-Pizza-Logo.png', alt: 'logo - Pizza Pizza'},
      {src: '/assets/pds-logo.png', alt: 'logo - PDS Architecture'},
    ],
  },
  {
    type: 'quote',
    background: 'white',
    quote: {
      quote:
        'When I don’t have sufficient or accurate base building information, I reach out to iGUIDE. Their walkthroughs and drawings help me move forward with confidence.',
      name: 'Tayyab Ali',
      role: 'Construction Design Manager',
      company: 'Pizza Pizza',
      photo: {src: '/assets/Tayyab-.jpg', alt: 'photo - Tayyab Ali'},
      link: {label: 'Read their story', href: '/customer-stories/cutting-delays-boosting-design-pizza-pizzas-path-to-faster-openings'},
    },
  },
  {
    type: 'split',
    id: 'iguide_packages',
    background: 'surface',
    heading: 'iGUIDE Packages',
    body: (
      <>
        <p>You&apos;re covered from site selection to pre-design, construction and occupancy.</p>
        <p>
          <strong className="text-ink">Advanced Drawing Package.</strong> For comprehensive property understanding, each iGUIDE CAD package
          includes comprehensive property documentation.
        </p>
      </>
    ),
    list: [
      'As-Built Floor Plans',
      'Dimension Plans',
      '3D Virtual Walkthrough',
      'Photo Tags of Services & Equipment',
      'Downloadable Offline File (self-hosting)',
      'Add: Exterior Elevation Drawings',
      'Add: Roof Plans',
      'Add: Reflected Ceiling Plans',
      'Add: 3D Model (RVT File)',
    ],
    after: (
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base">
        {samples.map((s) => (
          <li key={s.label}>
            <a href={s.href} className="font-semibold text-primary hover:underline" {...(s.href.startsWith('http') ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    ),
    media: {type: 'image', image: {src: '/assets/plotted.png', alt: 'Floor plan preview'}},
  },
  {
    type: 'steps',
    id: 'steps',
    heading: 'Your commercial site survey delivered in days, not weeks',
    steps: [
      {
        title: 'Kick off',
        body: 'Submit a project request and our iGUIDE Project Management team will create your quote and launch the process.',
        image: {src: '/assets/Uploads/video-call-conference-online-meeting-virtual-peopl-2023-11-27-05-36-42-utc-v2.jpg', alt: 'photo - Project manager'},
      },
      {
        title: 'Site visit',
        body: 'Within five business days of approval, an iGUIDE Field Technician will scan and document your property.',
        image: {src: '/assets/Uploads/Capture_and_processing_150dpi.jpg', alt: 'photo - capture specialist'},
      },
      {
        title: 'Project delivery',
        body: 'Within 7 business days of the site visit, you’ll receive your iGUIDE Report with downloadable drawings, photos and a virtual walkthrough.',
        image: {src: '/assets/space-planning.png', alt: 'photo - Sharing an iGUIDE with the Team'},
      },
    ],
    ctas: [requestSurvey, {label: 'Download drawing sample', href: packageSample, variant: 'secondary'}],
  },
  {
    type: 'split',
    id: 'technology',
    background: 'sky',
    mediaSide: 'left',
    heading: 'Nationwide iGUIDE Field Techs are equipped with the PLANIX LiDAR system deliver fast, accurate site capture.',
    list: ['1% SF measurement uncertainty', '60MP high-clarity visuals', 'Pay-per-project—no subscriptions', 'Full data ownership, no lock-in'],
    media: {type: 'image', image: {src: '/assets/PLANIX-R1.png', alt: 'photo - iGUIDE PLANIX R1'}},
    mediaClassName: 'mx-auto max-w-md',
  },
  {
    type: 'cards',
    id: 'benefits',
    heading: 'Why design & construction teams rely on iGUIDE',
    subheading: 'Accurate base information reduces uncertainty, prevents re-visits and supports confident planning at every stage of your project.',
    columns: 3,
    cards: [
      {title: 'Enhanced speed', text: 'Fast turnaround times help teams stay ahead of tight commercial schedules.', icon: {src: '/assets/spend-less-time-on-site.svg', alt: 'icon - Stop Watch'}},
      {title: 'Improved consistency', text: 'Standardized survey outputs ensure consistency across every project and location.', icon: {src: '/assets/capture-comprehensive-data.svg', alt: 'icon - Stamped Document'}},
      {title: 'Immersive visuals', text: 'A 3D walkthrough gives your team the context needed to design accurately.', icon: {src: '/assets/Icons/tour.png', alt: 'icon - Tour'}},
      {title: 'Streamlined execution', text: 'A predictable workflow from kickoff to delivery keeps projects moving forward smoothly.', icon: {src: '/assets/stay-on-top-of-progress.svg', alt: 'icon - Wall Clock'}},
      {title: 'Organized deliverables', text: 'Everything you need—measurements, CAD files and visuals in one place.', icon: {src: '/assets/fasttrack-your-cad-workflow.svg', alt: 'icon - CAD File'}},
      {title: 'No project re-visits', text: 'Comprehensive capture reduces the risk of missing critical information and costly oversights.', icon: {src: '/assets/say-goodbye-to-rework.svg', alt: 'icon - Finger Point'}},
    ],
  },
  {
    type: 'quotes',
    id: 'testimonial-white',
    background: 'surface',
    quotes: [
      {
        quote:
          'iGUIDE and their Project Management Group offered a solution that could combine measurement, visual documentation, and CAD file delivery in a single visit.',
        name: 'Bryan Arnold',
        role: 'Project Manager',
        company: 'PDS Architecture',
        photo: {src: '/assets/Sample-Drawing-Packages/bryan.jpg', alt: 'logo - BarBurrito'}, // live alt text (wrong person)
        link: {label: 'Read their story', href: '/customer-stories/scaling-without-the-headcount-how-pds-architecture-modernized-site-documentation'},
      },
      {
        quote:
          'iGUIDE’s Service Pro network captures all the data we need and eliminates repeat site visits, reducing vendor costs and streamlining our construction workflow.',
        name: 'AR Eissa',
        role: 'Sr. Construction Manager',
        company: 'BarBurrito',
        logo: {src: '/assets/barburrito-block.png', alt: 'logo - BarBurrito'},
      },
    ],
  },
  {
    type: 'faq',
    heading: 'Answers for architects, designers and construction pros',
    items: [
      {
        q: 'How accurate are iGUIDE Site Surveys?',
        a: 'iGUIDE’s LiDAR camera system delivers floor plans with typical linear measurement uncertainty of 0.5% or better, giving you reliable data you can trust for design, construction and facility planning.',
      },
      {
        q: 'How quickly can I get my deliverables?',
        a: 'On-site surveys are typically completed within 5 business days, with deliverables delivered 7 business days after the site survey.',
      },
      {
        q: 'What deliverables are included?',
        a: 'Depending on project stage: CAD files (DWG, RVT, DXF), Plotted PDFs, point-cloud data, 3D virtual walkthroughs and photo-tagged equipment.',
      },
      {q: 'Do I need a subscription?', a: 'No. iGUIDE offers pay-per-project pricing with full data ownership.'},
    ],
  },
  // Live: "Get started" opens a contact pop-up
  {type: 'cta', heading: 'Connect with an iGUIDE Project Manager today', ctas: [book('Get started')]},
]
