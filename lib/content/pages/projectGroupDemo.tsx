/** /project-group/demo — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {SmartLink} from '@/components/ui/SmartLink'
import {cn} from '@/lib/cn'

export const meta = {
  title: 'iGUIDE: A Leader in Site Surveys and As-Built Documentation | iGUIDE',
  description:
    'iGUIDE offers industry-leading site surveys and as-built documentation services, delivering precise, efficient solutions for your building and renovation needs.',
  path: '/project-group/demo',
  // Live og:image (file not yet in public/, see report)
  ogImage: '/assets/Uploads/Page_Header.png',
}

export const hero = {
  heading: 'iGUIDE: Leaders in Site Surveys & As-Built Documentation',
  /** Live hero background (file not yet in public/; the section falls back to the brand colour) */
  background: '/assets/Uploads/Commercial_design_150dpi.jpg',
  request: {label: 'Request a Project', href: '/projectrequest'},
  /** "Meet with a Project Manager" opens this HubSpot form in a pop-up titled "Connect with a Project Manager" */
  meet: {label: 'Meet with a Project Manager', title: 'Connect with a Project Manager', formId: '5b0256e9-202f-49a6-abae-16b9e322edc9'},
}

function Steps({items}: {items: {title: string; text: string}[]}) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="text-2xl font-semibold text-primary">{item.title}</h3>
          <p className="mt-2">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

type SampleLink = {label: string; href: string; newTab?: boolean; primary?: boolean}

function PackageText({intro, items, links}: {intro: string[]; items: string[]; links: SampleLink[]}) {
  return (
    <>
      {intro.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {items.map((item) => (
          <li key={item} className={item.startsWith('Add:') ? 'font-semibold' : undefined}>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-3">
        {links.map((link) => (
          <SmartLink
            key={link.label}
            href={link.href}
            className={cn(
              'inline-flex items-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold transition-colors',
              link.primary ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-white text-primary hover:border-primary-hover hover:text-primary-hover',
            )}
            {...(link.newTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
          >
            {link.label}
          </SmartLink>
        ))}
      </div>
    </>
  )
}

const virtualIntro = [
  'Provide an immersive virtual experience that lets colleagues, partners and contractors explore your site 24/7 from any location.',
  'What’s included…',
]

export const blocks: Block[] = [
  {
    type: 'split',
    id: 'steps',
    heading: 'Full site documentation in 3 easy steps',
    body: (
      <Steps
        items={[
          {title: '1. Kick-off', text: 'Tell us about your project (project purpose, desired elements, location) to get started.'},
          {title: '2. Site Visit', text: 'Our local Field Technician will visit your site(s) to collect, scan and document the property.'},
          {
            title: '3. Delivery',
            text: 'We’ll deliver your iGUIDE Report with downloadable drawing files, photos and links to your virtual walkthrough.',
          },
        ]}
      />
    ),
    media: {type: 'image', image: {src: '/assets/Uploads/Comprehensive_CAD_Package_r1_cd.png', alt: ''}},
  },
  {
    type: 'featureTabs',
    id: 'packages',
    background: 'surface',
    heading: 'iGUIDE Packages',
    subheading: "You're covered from site selection to pre-design, construction and occupancy!",
    label: 'iGUIDE Packages',
    items: [
      {
        id: 'cad-package',
        title: 'iGUIDE CAD Package',
        text: (
          <PackageText
            intro={['For comprehensive property understanding, each iGUIDE CAD package includes comprehensive property documentation.']}
            items={[
              'As-built Floor Plans',
              'Dimension Plans',
              '3D Virtual walkthrough',
              'Photo tags of building system equipment make, model and serial information',
              'Add: 3D Model (RVT File)',
              'Add: Reflected Ceiling Plans',
              'Add: Exterior Elevation Drawings',
            ]}
            links={[
              {label: 'Plotted PDF Sample', href: '/assets/Sample-Files/183-Weber-Plotted-PDF.pdf', newTab: true},
              {label: 'CAD Sample', href: '/assets/Sample-Files/183-Weber-CAD-Samples.zip'},
              {label: '3D Model Sample', href: '/assets/Sample-Files/183-Weber-3D-Model-Sample.zip'},
              {label: 'Sample Walkthrough', href: 'https://youriguide.com/8c750a93-a112-480a-9bde-394794a6c5e4', newTab: true},
              {label: 'Site Survey Checklist', href: '/assets/Sample-Files/iGUIDE-Site-Survey-Checklist.pdf', newTab: true},
            ]}
          />
        ),
        media: {type: 'image', image: {src: '/assets/Uploads/183-Weber.png', alt: ''}},
      },
      {
        id: 'premium',
        title: 'iGUIDE Premium',
        text: (
          <PackageText
            intro={virtualIntro}
            items={[
              '3D Virtual walkthrough',
              'Advanced on-screen measurements',
              'Room dimensions',
              'Floor area calculations',
              'Equipment photo tags (Make, model, serial numbers)',
              'Downloadable offline file (self-hosting)',
              'Detailed Schematic Floor Plans with fixtures and appliances (PDF, JPG, SVG formats)',
              'Photo gallery & slide show',
            ]}
            links={[
              {label: 'Virtual Walkthrough', href: 'https://youriguide.com/g8grv_330_phillip_st_waterloo_on', newTab: true, primary: true},
              {label: 'Floor Plan Sample', href: '/assets/Sample-Files/330-Phillip-st-floorplan.pdf', newTab: true, primary: true},
            ]}
          />
        ),
        media: {type: 'image', image: {src: '/assets/Uploads/premium_dentist.png', alt: ''}},
      },
      {
        id: 'standard',
        title: 'iGUIDE Standard',
        text: (
          <PackageText
            intro={virtualIntro}
            items={[
              '3D Virtual walkthrough',
              'Advanced on-screen measurements',
              'Room dimensions',
              'Floor area calculations',
              'Equipment photo tags (Make, model, serial numbers)',
              'Downloadable offline file (self-hosting)',
              'Schematic Floor Plans (PDF, JPG, SVG formats)',
              'Photo gallery & slide show',
            ]}
            links={[
              {label: 'Virtual Walkthrough', href: 'https://youriguide.com/skaq0_330_phillip_st_waterloo_on', newTab: true, primary: true},
              {label: 'Floor Plan Sample', href: '/assets/Sample-Files/330-Phillip-st-floorplan-standard.pdf', newTab: true, primary: true},
            ]}
          />
        ),
        media: {type: 'image', image: {src: '/assets/Uploads/standard_dentist-v2.png', alt: ''}},
      },
      {
        // Tab label on live is "iGUIDE Radix"; the panel heading reads "Radix Package"
        id: 'radix',
        title: 'iGUIDE Radix',
        text: (
          <PackageText
            intro={[
              'iGUIDE RADIX provides fast and efficient site visual documentation. The online interface with lidar point cloud is shareable and can be used to view a site and measure in 3D space.',
              'Deliverables include:',
            ]}
            items={['Lidar Point Cloud (DXF)', '3D Virtual walkthrough', 'Advanced on-screen measurements']}
            links={[{label: 'Radix Sample', href: 'https://iguideradix.com/1155_altec_dr_elizabethtown_ga', newTab: true, primary: true}]}
          />
        ),
        media: {type: 'image', image: {src: '/assets/Icons/radix-v2.png', alt: ''}},
      },
    ],
  },
  {
    type: 'cards',
    id: 'why-iguide',
    align: 'center',
    heading: 'Why choose iGUIDE?',
    columns: 3,
    cards: [
      {
        title: 'Enhanced Speed',
        text: 'Take site data collection from weeks to days.',
        icon: {src: '/assets/Uploads/Icons_Processing-Time__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Improved Accuracy',
        text: 'Ensure measurements and drawings are up-to-date and accurate.',
        icon: {src: '/assets/Icons/Icon-Master_300x300_Value_Accurate-measurements__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Immersive Visuals',
        text: 'Provide your design team with 360° visualization of the space inside and out.',
        icon: {src: '/assets/Icons/Icon-Master_300x300_Value_Superior-navigation__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Streamlined Execution',
        text: 'Avoid return trips to site for missing and incorrect information.',
        icon: {src: '/assets/Icons/Icon-300x300_Superior-Navigation__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Strengthened Collaboration',
        text: 'We ensure everyone on the project team is working from the same data set.',
        icon: {src: '/assets/Icons/Icon-300x300_Value_Own-your-data__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
    ],
  },
  {
    type: 'split',
    id: 'capture-network',
    background: 'surface',
    heading: 'A superior national capture network',
    body: (
      <Steps
        items={[
          {title: 'Professional iGUIDE Service Pros', text: 'Educated via iGUIDE Training Program'},
          {title: 'Nationwide Coverage', text: '2,500+ iGUIDE Service Pros coast-to-coast (Canada & United States)'},
          {title: 'Fast Response Time', text: 'Scheduling system manages requests in real-time'},
        ]}
      />
    ),
    media: {type: 'image', image: {src: '/assets/Uploads/map7.png', alt: ''}},
  },
  {
    type: 'cards',
    id: 'your-data',
    align: 'center',
    heading: 'Your project. Your data.',
    columns: 4,
    cards: [
      {
        title: 'Data ownership',
        text: 'Rest assured you own the data from each of your projects.',
        icon: {src: '/assets/Uploads/data-v2__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'No recurring fees',
        text: 'Pay for your project with no additional subscription fees attached.',
        icon: {src: '/assets/Uploads/Picture1-v2__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Hosting flexibility',
        text: 'We can host your project at no cost or download and host yourself.',
        icon: {src: '/assets/Uploads/cloud__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Data protection',
        text: 'Our information security program incorporates control principles from SOC 2.',
        icon: {src: '/assets/Uploads/privacy__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
    ],
  },
  {
    type: 'quotes',
    id: 'testimonials',
    background: 'surface',
    heading: 'Trusted by industry professionals',
    quotes: [
      {
        quote:
          'Before iGUIDE, we struggled with unreliable vendors, higher costs, and the need for repeat site visits. iGUIDE’s Service Pro network captures all the data we need, and iGUIDE delivers CAD drawings and 3D tours, streamlining our process. iGUIDE\'s fast, efficient, and affordable, saving us both time and money.',
        name: 'AR Eissa',
        role: 'Sr. Construction Manager',
        company: 'BarBurrito',
        logo: {src: '/assets/Uploads/bar_burrito-v3.png', alt: 'BarBurrito'},
      },
      {
        quote:
          'Whether it be with the contractors, architects or developers, using iGUIDE made it easy for everybody to understand the project. With the online floorplan, virtual tour and CAD, it’s easier to stay on the same page. iGUIDE is a game-changer for me.',
        name: 'Marcel Bradbury',
        role: 'President',
        company: 'Master Trades Group',
        logo: {src: '/assets/Uploads/master_trade_group.png', alt: 'Master Trades Group'},
      },
      {
        quote:
          'We have five people working in-house. We flipped the switch to utilizing the technology and we’re doing three to four times the amount of work with the same people.',
        name: 'Carl Bernat',
        role: 'President',
        company: 'CCS Engineering & Construction',
        logo: {src: '/assets/Uploads/CCS-Logo.png', alt: 'CCS Engineering & Construction'},
      },
    ],
  },
]
