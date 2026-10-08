/** /facility-management — copy, links and asset paths from the live page (checked 2026-10-07). */
import type {Block} from '@/components/blocks/Blocks'
import {book, shopCameras, tour} from './shared'

export const meta = {
  title: 'Facility Management Documentation & Floor Plans | iGUIDE',
  description:
    'Create accurate building records with floor plans, LiDAR measurements, and visual documentation. Reduce repeat site visits and support facility management across portfolios.',
  path: '/facility-management',
}

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Turn every site visit into a reliable building record',
    subheading: 'Document buildings once and reuse the data for assessments, planning and projects—without repeat site visits.',
    extra: <p>Facilities teams need building data they can trust long after the site visit.</p>,
    ctas: [book(), shopCameras],
    media: {
      type: 'embed',
      src: tour('https://youriguide.com/embed/v4H2RMIUYYJDD1?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF'),
      title: 'iGUIDE tour of a commercial facility',
    },
  },
  {
    type: 'quote',
    quote: {
      quote:
        'It’s a snapshot in time, but for mature clients we keep it current—post-renovation documentation, new builds, and ongoing updates as part of their programs.',
      name: 'Riley Mackey',
      role: 'Manager, Spatial Data',
      company: 'BGIS',
      photo: {src: '/assets/Uploads/Riley-Mackey-BGIS-headshot.jpg', alt: 'photo - Riley Mackey'},
    },
  },
  {
    type: 'cards',
    id: 'benefits',
    heading: 'Building documentation that supports every workflow',
    subheading:
      'Capture accurate building data in one visit and reuse it across assessments, planning and projects—reducing repeat site visits and improving coordination.',
    cards: [
      {
        title: 'Create reliable building records',
        text: 'Capture accurate floor plans, measurements and visual documentation in one system—so teams can validate layouts and reference trusted building data anytime.',
        icon: {src: '/assets/policy.svg', alt: 'icon - Documents in hand'},
      },
      {
        title: 'Reduce repeat site visits',
        text: 'Access detailed building data remotely to verify conditions, quantify assets and scope work—without returning to site or disrupting active facilities.',
        icon: {src: '/assets/spend-less-time-on-site.svg', alt: 'icon - Stop Watch'},
      },
      {
        title: 'Support assessments & capital planning',
        text: 'Thousands of lidar-based measurements per scan reduce human error and improve confidence in your documentation.',
        icon: {src: '/assets/contractors.svg', alt: 'icon - Measurements'},
      },
      {
        title: 'Scale across portfolios securely',
        text: 'Maintain consistent documentation across locations with controlled access and secure data sharing—supporting collaboration without exposing sensitive information.',
        icon: {src: '/assets/capture-comprehensive-data.svg', alt: 'icon - Clipboard'},
      },
    ],
    after: (
      <p>Facilities teams need consistent, accurate building documentation to plan confidently, reduce repeat site visits and keep projects moving.</p>
    ),
  },
  {
    type: 'steps',
    id: 'workflow',
    heading: 'How building documentation moves from site to planning with iGUIDE',
    subheading: 'iGUIDE fits into existing facilities management workflows—capturing, sharing and maintaining building records teams rely on every day.',
    showImages: false,
    steps: [
      {
        title: 'Capture accurate building conditions',
        body: 'Document active facilities using LiDAR and 360° imagery to create a dependable visual and spatial record in a single visit.',
      },
      {
        title: 'Generate usable floor plans and files',
        body: 'Produce accurate floor plans, measurements and exportable files like DWG to support assessments, scoping and planning workflows.',
      },
      {
        title: 'Share securely across teams',
        body: 'Provide controlled access to internal teams, vendors and stakeholders—so everyone works from the same trusted building record.',
      },
      {
        title: 'Update and reuse over time',
        body: 'Refresh documentation after renovations or changes, maintaining consistent building records across locations and programs.',
      },
    ],
  },
  {
    type: 'featureTabs',
    id: 'takeaways',
    background: 'surface',
    label: 'Facility documentation highlights',
    items: [
      {
        id: 'single-visit',
        title: 'Document active facilities in a single visit',
        text: (
          <p>
            Capture building conditions while sites remain operational. Create accurate floor plans and visual records that support assessments
            without repeated disruption.
          </p>
        ),
        media: {
          type: 'embed',
          src: 'https://www.youtube.com/embed/vxHUsp8DDtg?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=vxHUsp8DDtg&modestbranding=1&rel=0',
          title: 'Documenting an active facility with iGUIDE',
        },
      },
      {
        id: 'cad',
        title: 'Built for CAD and planning workflows',
        text: (
          <p>
            Export DWG and other files to support condition assessments, capital planning and renovation scoping. Teams can work in familiar tools
            without recreating measurements.
          </p>
        ),
        link: {label: 'Learn more about CAD deliverables', href: '/iguide/cad-deliverables'},
        media: {type: 'image', image: {src: '/assets/Uploads/Advanced_Drawing_Package_Commercial.png', alt: 'iGUIDE CAD deliverables'}},
      },
      {
        id: 'current',
        title: 'When buildings change, your records stay current',
        text: <p>Update documentation after renovations or new builds to maintain consistent building records across portfolios and programs.</p>,
        media: {type: 'image', image: {src: '/assets/Uploads/Industries-Facility-Managementmonitor-progress.png', alt: 'photo - man viewing laptop'}},
      },
    ],
  },
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'What is iGUIDE for facility management?',
        a: 'iGUIDE for facility management is a building documentation system that provides accurate floor plans, 3D visual documentation and measurable building data. It creates a digital record of a facility’s layout and components, helping facilities teams plan maintenance, validate conditions and manage assets more efficiently.',
      },
      {
        q: 'What are the benefits of using iGUIDE for facility management?',
        a: 'The benefits of using iGUIDE for facility management include accurate floor plans, 360° visual documentation and measurable building data in a single system. Facilities teams can reduce repeat site visits, support condition assessments, plan maintenance and track changes over time with greater confidence.',
      },
      {
        q: 'Is iGUIDE easy to use for facility managers?',
        a: 'Yes, iGUIDE is designed to be easy to use for facility managers and operations teams. The intuitive interface allows users to navigate floor plans, access measurements and review visual documentation without requiring advanced technical training.',
      },
      {
        q: 'Can iGUIDE integrate with existing facility management systems?',
        a: 'Yes, iGUIDE documentation can integrate into existing facility management and planning workflows through exportable files such as DWG floor plans. Teams can use iGUIDE data within familiar CAD or planning software without disrupting current processes.',
      },
      {
        q: 'How does iGUIDE help with space planning and utilization?',
        a: 'iGUIDE helps with space planning and utilization by providing accurate floor plans and measurements of building layouts. Facilities teams can optimize space allocation, plan reconfigurations and make informed decisions based on precise building data.',
      },
      {
        q: 'What types of facilities can benefit from iGUIDE?',
        a: 'Many types of facilities can benefit from iGUIDE, including office buildings, retail spaces, healthcare facilities, educational institutions and industrial properties. The system can be used across single sites or multi-location portfolios.',
      },
      {
        q: 'Is iGUIDE scalable for large facilities or portfolios?',
        a: 'Yes, iGUIDE is scalable for large facilities and multi-site portfolios. Facilities teams can standardize building documentation across locations, maintain consistent records and support portfolio-level planning and oversight.',
      },
      {
        q: 'How does iGUIDE support maintenance and asset management?',
        a: 'iGUIDE supports maintenance and asset management by providing detailed visual documentation and measurable building data. Teams can validate equipment locations, plan preventative maintenance and manage facility resources more efficiently.',
      },
      {
        q: 'What are the benefits of iGUIDE DWG floor plans for facility management?',
        a: 'The benefits of iGUIDE DWG floor plans for facility management include accurate digital layouts that can be used in CAD software for planning and renovation work. DWG files make it easier to update drawings, collaborate with contractors and streamline documentation workflows.',
      },
      {
        q: 'How long does it take to get an iGUIDE DWG floor plan?',
        a: 'The time it takes to receive an iGUIDE DWG floor plan typically ranges from 24 to 48 hours, depending on property size and complexity. Larger or more intricate facilities may require additional time.',
      },
      {
        q: 'How accurate is an iGUIDE DWG floor plan?',
        a: 'An iGUIDE DWG floor plan is accurate within industry-standard tolerances, typically within ±½ inch depending on conditions and measurement parameters. Final room dimensions may vary slightly based on wall thickness and maximum room dimensions.',
      },
      {
        q: 'Can I adjust the scaling in my iGUIDE DWG floor plan?',
        a: 'Yes, you can adjust the scaling in your iGUIDE DWG floor plan within your CAD software. iGUIDE DWG files are delivered at a 1:1 scale and can be modified as needed for specific project requirements.',
      },
      {
        q: 'Does an iGUIDE DWG floor plan use Metric or Imperial measurement?',
        a: 'An iGUIDE DWG floor plan can be delivered in either Metric or Imperial measurement units. The file will scale correctly within compatible CAD software.',
      },
    ],
  },
  {
    type: 'cta',
    heading: 'See how iGUIDE supports facilities workflows',
    text: 'Get a walkthrough of how iGUIDE helps facilities teams document buildings, support assessments and plan projects with accurate, reusable building records.',
    ctas: [book('Book a 15-minute walkthrough')],
  },
]
