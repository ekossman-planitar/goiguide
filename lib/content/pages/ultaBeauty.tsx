/** /ulta-beauty — copy, links and asset paths from the live page (checked 2026-10-21). */
import type {Block} from '@/components/blocks/Blocks'
import {PackageTabs, type PackageTab} from '@/components/blocks/PackageTabs'
import {FormHero} from '@/components/pages/FormHero'
import {FallbackImage} from '@/components/ui/FallbackImage'

export const meta = {
  title: 'Ulta Beauty | iGuide',
  // As on live (it describes an iGuide Live session, not this page)
  description:
    'Join iGuide Live for a practical year-end session covering 2025 highlights, 2026 roadmap insights, workflow tips and exclusive updates for operators.',
  path: '/ulta-beauty',
}

/** HubSpot form in the live hero */
const FORM_ID = '3c2ba364-b25d-4e5b-be87-a400760ebe97'

const walkthrough = 'https://youriguide.com/3d3dbfc9-dfee-4c4e-be34-1233d5bf1fe3'

const packageTabs: PackageTab[] = [
  {
    id: 'advanced',
    label: 'Advanced Drawing Package',
    heading: 'Advanced Drawing Package',
    text: 'For comprehensive property understanding, each iGuide CAD package includes comprehensive property documentation.',
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
    image: {src: '/assets/advanced.png', alt: 'Floor plan preview', width: 1068, height: 837},
    links: [
      {label: '3D Virtual Walkthrough', href: walkthrough},
      {label: 'Equipment Photo Tags', href: `${walkthrough}?inittaglist`},
      {label: 'Plot PDF', href: 'https://planitar.sharepoint.com/:b:/s/PlanitarExternal/IQD0E1UURjrLT7-8UmkiNoXJAVIBNLga8DubX_jxAImkGuM?e=DCdlcE'},
      {label: 'CAD File', href: 'https://planitar.sharepoint.com/:u:/s/PlanitarExternal/IQCLjRJRIaoKSonMiOMQEojAAVBBIp810e5HnBj11UgtdTY?e=GFzpY3'},
      {label: 'RVT File', href: 'https://planitar.sharepoint.com/:u:/s/PlanitarExternal/IQBS-MaV_PqbQa-HlBmot0NRAa8homQRgmsgei2V_jBdboQ?e=5R0r5C'},
    ],
  },
  {
    id: 'cad-addons',
    label: 'iGuide CAD Add-ons',
    heading: 'iGuide CAD Add-ons',
    text: 'iGuide offers specialized deliverables beyond standard floor plans and walkthroughs to support planning, design, construction and facility management, added individually or combined into a package tailored to your project.',
    list: [
      'Exterior Elevation Plans',
      'Rooftop Documentation – plans and equipment tags',
      'Reflected Ceiling Plans (RCP)',
      'Site Documentation – aerial and schematic plans',
      'Revit Models (RVT)',
    ],
    image: {src: '/assets/ulta_addons.png', alt: 'CAD add-ons preview', width: 865, height: 678},
    links: [
      {
        label: 'Exterior Elevation Plans',
        href: 'https://planitar.sharepoint.com/:u:/s/PlanitarExternal/IQAPPBgdosTLRqPsrAsYWlaeAbIAm_ldXeMq0KU5bJg3r4M?e=qDpqcv',
      },
      {label: 'Rooftop Plan', href: 'https://planitar.sharepoint.com/:u:/s/PlanitarExternal/IQAXOwtPpKW-RptCpaWDjQCSAZINzuCxncvYKom7Wt-OHcw?e=NDOxZC'},
      {
        label: 'Reflected Ceiling Plan',
        href: 'https://planitar.sharepoint.com/:u:/s/PlanitarExternal/IQDAZB1UG2ArT5i92RuyspaQAWsx3XR2N7AvE-SjpLt_E1g?e=RloxgQ',
      },
      {label: 'Revit Model', href: 'https://planitar.sharepoint.com/:u:/s/PlanitarExternal/IQBS-MaV_PqbQa-HlBmot0NRAa8homQRgmsgei2V_jBdboQ?e=5R0r5C'},
    ],
  },
  {
    id: 'premium',
    label: 'iGuide Premium',
    heading: 'iGuide Premium',
    text: 'Provide an immersive virtual experience that lets colleagues, partners and contractors explore your site 24/7 from any location.',
    list: [
      '3D Virtual walkthrough',
      'Advanced measurements',
      'Room dimensions',
      'Floor area calculations',
      'Equipment photo tags (Make, serial numbers)',
      'Downloadable offline file (self-hosting)',
      'Detailed Schematic Floor Plans with fixtures and appliances',
      'Photo gallery & slide show',
    ],
    image: {src: '/assets/ulta_prem.png', alt: 'Premium preview', width: 970, height: 719},
    links: [
      {label: '3D Virtual Walkthrough', href: walkthrough},
      {label: 'Equipment Photo Tags', href: `${walkthrough}?inittaglist`},
      {label: 'Measured Drawings', href: 'https://planitar.sharepoint.com/:b:/s/PlanitarExternal/IQDvHSAGKhe7SYIKD81UnM5HAd1xLvcbetZ2_G8i3RSLqDg?e=yztfmz'},
    ],
  },
  {
    id: 'radix',
    label: 'iGuide Radix',
    heading: 'iGuide Radix',
    text: 'iGuide RADIX provides fast and efficient site visual documentation. The online interface with lidar point cloud is shareable and can be used to view a site and measure in 3D space.',
    list: ['Lidar Point Cloud (DXF)', '3D Virtual walkthrough', 'Advanced on-screen measurements'],
    image: {src: '/assets/ulta-prem.jpg', alt: 'Radix preview', width: 1079, height: 835},
    links: [
      {label: '3D Virtual Walkthrough', href: 'https://iguideradix.com/wingstop-radix-sample'},
      {label: 'DXF Point Cloud File', href: '/assets/Radix-Sample-DXF-file.zip'},
      {label: 'Construction Verification', href: '/assets/Sample-Files/Point-Cloud-Overlay.pdf'},
    ],
  },
]

const delivery = [
  {title: '2,500+ Capture Professionals', text: 'Local capture pros available across North America.'},
  {title: 'Single Point of Coordination', text: 'Dedicated project management support for scheduling, communication and delivery.'},
  {title: 'Standardized Deliverables', text: 'Consistent outputs regardless of location, market or field technician.'},
  {title: 'Consistent Timelines', text: 'Site visits completed within 5 business days, delivery within 7 business days (post site visit).'},
]

/** Live: name, role, phone and email shown as plain text */
const team = [
  {name: 'Pallavi Gor', role: 'Projects Lead', phone: '404.934.4044', email: 'pgor@planitar.com', photo: '/assets/433a5b944e/pav.png'},
  {name: 'Moyo Akinbola', role: 'Projects Manager', phone: '226-220-5126', email: 'makinbola@planitar.com', photo: '/assets/0807955cff/moyo.png'},
  {name: 'Kevin Klages', role: 'Projects Lead', phone: '519-574-4957', email: 'kklages@planitar.com', photo: '/assets/4c9b44d922/kevin.png'},
]

export const blocks: Block[] = [
  {
    type: 'custom',
    children: (
      <FormHero
        heading="Site Survey Services"
        subheading="iGuide captures accurate, standardized LiDAR site surveys across every location, providing one consistent data set that architects, contractors, and facility teams can all work from. No platform lock-in. No surprises during construction."
        formId={FORM_ID}
      />
    ),
  },
  {
    type: 'cards',
    heading: 'Start projects faster, with fewer unknowns',
    align: 'center',
    columns: 3,
    cards: [
      {title: 'Start Faster', text: 'Design-ready site data collected before design begins.'},
      {title: 'Reduce Unknowns', text: 'Minimize surprises and rework during active projects.'},
      {title: 'Standardized collaboration', text: 'A single source of truth dataset for all stakeholders.'},
      {title: 'Scale consistently', text: 'Standardized deliverables and execution across markets.'},
      {title: 'Retain ownership', text: 'All data and deliverables belong to you, no platform lock-in.'},
    ],
  },
  {
    type: 'split',
    heading: 'Consistent delivery across North America',
    body: (
      <dl className="space-y-5">
        {delivery.map((d) => (
          <div key={d.title}>
            <dt className="text-xl font-semibold text-ink">{d.title}</dt>
            <dd className="mt-1">{d.text}</dd>
          </div>
        ))}
      </dl>
    ),
    media: {type: 'image', image: {src: '/assets/941f1db70d/USA_Map.png', alt: 'Map - iGuide Capture Coverage Across North America', width: 1612, height: 975}},
    background: 'surface',
  },
  {
    type: 'custom',
    id: 'iguide_packages',
    heading: 'iGuide Packages',
    subheading: 'You’re covered from site selection to pre-design, construction and occupancy.',
    align: 'center',
    children: <PackageTabs label="Package tabs" tabs={packageTabs} />,
  },
  {
    type: 'quote',
    background: 'surface',
    quote: {
      quote:
        'When I don’t have sufficient or accurate base building information, I reach out to iGuide. Their walkthroughs and drawings help me move forward with confidence.',
      name: 'Tayyab Ali',
      role: 'Construction Design Manager',
      company: 'Pizza Pizza',
      photo: {src: '/assets/Tayyab-.jpg', alt: 'photo - Tayyab Ali'},
      link: {label: 'Read their story', href: '/customer-stories/cutting-delays-boosting-design-pizza-pizzas-path-to-faster-openings'},
    },
  },
  {
    type: 'custom',
    heading: 'The iGuide Project Management Team',
    subheading: 'Get to know the experts leading this session.',
    align: 'center',
    children: (
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((p) => (
          <li key={p.name} className="flex flex-col items-center rounded-2xl border border-line bg-white p-6 text-center shadow-card">
            <FallbackImage src={p.photo} alt={p.name} width={160} height={158} className="h-40 w-40 rounded-full object-cover" fallback={null} />
            <h3 className="type-heading-sm mt-5 text-ink">{p.name}</h3>
            <p className="mt-1 text-base text-muted">{p.role}</p>
            <p className="text-base text-muted">{p.phone}</p>
            <p className="text-base text-muted">{p.email}</p>
          </li>
        ))}
      </ul>
    ),
  },
]
