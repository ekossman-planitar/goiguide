/** /architecture-engineering-construction — copy, links and asset paths from the live page (checked 2026-10-07). */
import type {Block} from '@/components/blocks/Blocks'
import {book, findPro, shopCameras, tour} from './shared'

export const meta = {
  title: 'Fast-Track Projects with iGUIDE’s DWG Floor Plans & 3D Models | iGUIDE',
  description: "Get your project on the fast track with iGUIDE's DWG floor plans & 3D models—perfect for saving time & boosting accuracy.",
  path: '/architecture-engineering-construction',
}

const drawingSample = 'https://planitar.sharepoint.com/:u:/s/iGUIDE-Resources-and-Assets/IQACZgIxsrJoT4e2YjfPZd-cAbpG2iksX_yaT9Ra9e3__ro?e=fgij9z'

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Site documentation built for architects, contractors and design teams',
    subheading:
      'From LiDAR scans to CAD-ready files, iGUIDE delivers everything you need to design, collaborate and build. Starting with just one visit.',
    ctas: [book(), {label: 'Download drawing sample', href: drawingSample, variant: 'secondary', newTab: true}],
    media: {
      type: 'embed',
      src: tour('https://youriguide.com/pre_and_post_construction?branded=1&autostart=1&bgcolor=FFFFFF'),
      title: 'iGUIDE tour: pre- and post-construction',
    },
  },
  {
    type: 'logos',
    heading: 'Trusted by thousands of AEC professionals worldwide',
    logos: [
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-MC3-Design.png', alt: 'logo - MC3 Design'},
      {src: '/assets/make-it-right.svg', alt: 'logo - Make it Right'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-UCGC.png', alt: 'logo - UCGC'},
      {src: '/assets/Uploads/bar_burrito-v3.png', alt: 'logo - BarBurrito'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-CS-Construction.png', alt: 'logo - CS Construction'},
      {src: '/assets/Pizza-Pizza-Logo.png', alt: 'logo - Pizza Pizza'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-Harder-Build-Construction.png', alt: 'logo - Harder Build Construction'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-Hills-Group.png', alt: 'logo - Hills Group'},
      {src: '/assets/Uploads/IGU-119-WEB-AEC-Industry-Page-Logos-Levitech-Acrchitects-Builders.png', alt: 'logo - Levitch Associates Inc.'},
      {src: '/assets/Uploads/CCS-Logo.png', alt: 'logo - CCS'},
      {src: '/assets/Uploads/RJM-Logo.png', alt: 'logo - RMJ'},
      {src: '/assets/Uploads/Sheffield-Homes-logo-v3.png', alt: 'logo - Sheffield Homes'},
      {src: '/assets/Uploads/Max-Returns-44.png', alt: 'logo - Max Returns Real Estate Investments'},
      {src: '/assets/Uploads/Tetsimonial-Logo-Master-Trades-Group.png', alt: 'logo - Master Trades Group'},
    ],
  },
  {
    type: 'cards',
    id: 'benefits',
    heading: 'From pre-design to handoff, iGUIDE accelerates every phase',
    subheading: 'Inaccurate as-builts. Missed dimensions. Repeat site visits. iGUIDE eliminates what slows you down.',
    columns: 3,
    cards: [
      {title: 'Spend less time on-site', text: 'Reduce field time by up to 50%', icon: {src: '/assets/spend-less-time-on-site.svg', alt: 'icon - Stop Watch'}},
      {title: 'Capture comprehensive data', text: 'Capture 1000s of measurements per scan', icon: {src: '/assets/capture-comprehensive-data.svg', alt: 'icon - Stamped Document'}},
      {title: 'Fast-track your CAD workflow', text: 'Generate CAD-ready files faster', icon: {src: '/assets/fasttrack-your-cad-workflow.svg', alt: 'icon - CAD File'}},
      {title: 'Work together from anywhere', text: 'Collaborate remotely with 3D walkthroughs', icon: {src: '/assets/work-together-from-anywhere.svg', alt: 'icon - Globe'}},
      {title: 'Stay on top of progress', text: 'Track build progress and tag walkthroughs with trade notes', icon: {src: '/assets/stay-on-top-of-progress.svg', alt: 'icon - Wall Clock'}},
      {title: 'Say goodbye to rework', text: 'Eliminate manual drafting and rework', icon: {src: '/assets/say-goodbye-to-rework.svg', alt: 'icon - Finger Point'}},
    ],
  },
  {
    type: 'quote',
    quote: {
      quote: 'With iGUIDE, we kicked off new projects 50% faster and never had to go back to site.',
      detail:
        'Using iGUIDE, MC3 Group cut fieldwork to just 1–2 hours with a single team member. Precise floor plans and 3D models are captured at once, eliminating manual steps. Unlike other tools that offer visuals or measurements, iGUIDE delivers both.',
      name: 'John McKenna',
      role: 'Owner & Architect',
      company: 'MC3 Design',
      photo: {src: '/assets/John-McKenna.jpeg', alt: 'photo - John McKenna'},
    },
  },
  {
    type: 'split',
    id: 'deliverables',
    heading: 'Everything your team needs in one deliverable',
    body: (
      <>
        <p>iGUIDE combines LiDAR scanning, 3D visualization and CAD-ready files into one package so you can move from capture to design without delay.</p>
        <p>
          <strong className="text-ink">Projects differ. So should your deliverables.</strong> Order an Advanced Drawing Package with a variety of
          flexible add-ons to match your project’s needs.
        </p>
      </>
    ),
    listHeading: 'Every Advanced Drawing Package includes:',
    list: ['Plotted Drawings (PDF)', '3D Virtual Walkthrough', 'CAD Floor Plans (DWG)', 'LiDAR Point Cloud (DXF)'],
    after: (
      <p>
        <strong className="text-ink">Available add-ons.</strong> Add the specific drawings your team needs. Get exactly what fits your project.
        CAD Floor Plan (DWG): drafted floor plan in DWG format with LOD 200 detail. Includes AIA standard layers, annotations and LiDAR point
        cloud data (DXF). Annotations are only included with iGUIDE Premium or Advanced Drawing Packages.
      </p>
    ),
    ctas: [{label: 'Download drawing sample', href: drawingSample, newTab: true}],
    media: {
      type: 'image',
      image: {src: '/assets/Uploads/Advanced_Drawing_Package_Commercial-v2.png', alt: 'image - Advanced Drawing Packages Sample Package'},
    },
  },
  {
    type: 'cards',
    id: 'document-every-stage',
    background: 'surface',
    heading: 'Document every stage of your build',
    subheading:
      'From initial site surveys to project close-out, iGUIDE delivers the visuals and measurements you need to document progress and ensure accuracy.',
    columns: 2,
    cards: [
      {title: 'Pre-construction', media: {type: 'image', image: {src: '/assets/Uploads/AEC-Images-Before.png', alt: 'Pre-construction'}}},
      {title: 'Post-construction', media: {type: 'image', image: {src: '/assets/Uploads/AEC-Images-After.png', alt: 'Post-construction'}}},
    ],
  },
  {
    type: 'quote',
    background: 'white',
    quote: {
      quote:
        'One of the smartest things you can do on any build is document what’s behind the walls. With iGUIDE, you can tag electrical, plumbing, and structural elements before they’re covered, so years later there’s no guessing. That’s priceless for maintenance and renovations.',
      name: 'Mike Holmes',
      role: 'Professional Contractor & TV Host',
      company: 'The Holmes Group',
      photo: {src: '/assets/mike-holmes-cta.png', alt: 'photo - Mike Holmes'},
    },
  },
  {
    type: 'steps',
    heading: 'From scan to CAD in three simple steps',
    steps: [
      {
        title: 'Capture',
        body: (
          <>
            Connect your iGUIDE PLANIX R1 camera to your device, create a project, and scan the site. Don’t want to buy a camera? Find{' '}
            <a href="https://ion.goiguide.com/" className="font-medium text-primary underline">
              your local iGUIDE Pro
            </a>{' '}
            to capture for you!
          </>
        ),
        image: {src: '/assets/Uploads/Capture_and_processing_150dpi.jpg', alt: 'photo - Capture Specialist'},
      },
      {
        title: 'Draft',
        body: 'Upload to the iGUIDE Portal directly from on-site. In 48–72* hours, your CAD files, 3D walkthrough and point cloud will be ready.',
        image: {src: '/assets/Uploads/Process_72dpi.jpg', alt: 'photo - PLANIX App in use'},
      },
      {
        title: 'Deliver',
        body: 'Your files arrive in days, not weeks. Ready for planning, design or review. *Deliverable timing varies depending on selection.',
        image: {src: '/assets/Uploads/Utilize_72dpi.jpg', alt: 'photo - Sharing an iGUIDE with the Team'},
      },
    ],
    ctas: [{...shopCameras, variant: 'primary'}, {...findPro, variant: 'secondary'}],
  },
  {
    type: 'logos',
    heading: 'Files delivered ready for',
    marquee: false,
    background: 'white',
    logos: [
      {src: '/assets/autocad-logo-aec.png', alt: 'AutoCAD'},
      {src: '/assets/revit-logo-aec.png', alt: 'Revit'},
      {src: '/assets/sketchup-logo-aec.png', alt: 'SketchUp'},
      {src: '/assets/chief-architect-logo-aec.png', alt: 'Chief Architect'},
      {src: '/assets/vectorworks-logo-aec.png', alt: 'Vectorworks'},
      {src: '/assets/xacimate-logo-aec.png', alt: 'Xactimate'},
    ],
  },
  {
    type: 'cards',
    id: 'customer-stories',
    background: 'surface',
    heading: 'See how iGUIDE helps firms work faster and smarter',
    columns: 3,
    link: {label: 'View all AEC customer stories', href: '/resource-center?tab=customer-stories&category=architecture-and-remodeling'},
    cards: [
      {
        title: 'Six months saved: Good Carbon Co.’s path to faster redevelopment with iGUIDE',
        media: {type: 'embed', src: 'https://www.youtube.com/embed/AWclYaVMK5E', title: 'Good Carbon Co. customer story video'},
        link: {label: 'Read their story', href: '/customer-stories/six-months-saved-good-carbon-co-s-path-to-faster-redevelopment-with-iguide'},
      },
      {
        title: 'Why Mike Holmes approved iGUIDE for accurate, defensible site documentation',
        media: {type: 'image', image: {src: '/assets/mike_holmes.png', alt: 'photo - Mike Holmes inspection'}},
        link: {label: 'Read their story', href: '/customer-stories/mike-holmes-approved-iguide-site-documentation'},
      },
      {
        title: 'How Duane Erb Construction captured a century-home café in 3 stages',
        media: {type: 'image', image: {src: '/assets/iGUIDE-case-study-Wild-and-Free-Cafe-exterior.png', alt: 'photo - Wild and Free Cafe exterior'}},
        link: {label: 'Read their story', href: '/customer-stories/century-home-cafe-renovation-documentation'},
      },
    ],
  },
  {
    type: 'faq',
    heading: 'Answers for architects, designers and construction pros',
    items: [
      {q: 'What types of files are available?', a: 'DXF, DWG, RVT, PDF and a 3D virtual walkthrough'},
      {
        q: 'How accurate is the data and how accurate are your drawings?',
        a: 'DWG floor plans have an acceptable tolerance for wall thicknesses of + or – 1/2”. This information is based upon the maximum dimensions of each room and will affect room dimensions, which can also vary.',
      },
      {
        q: 'Can I track progress over time?',
        a: 'Yes, iGUIDE can document different project stages and Real-Time Tags can be used to identify points of interest within the virtual walkthrough.',
      },
      {q: 'Is there a subscription?', a: 'No. All pricing is per project, and you own the data. You can download the project and host it yourself if you choose.'},
      {q: 'Do I need to do the scan myself?', a: 'No, our national network of iGUIDE Pros is ready to capture on-site data for you.'},
      {q: 'What’s the typical turnaround time?', a: 'Deliverables are available within days of capture, typically 48 to 72 hours post iGUIDE delivery.'},
      {
        q: 'Is these files compatible with my software? I use Chief Architect, Sketchup, etc.',
        a: 'Please download and open the sample files to test your software for compatibility.',
      },
    ],
  },
  // Live: "Talk to a product expert" opens a contact pop-up
  {type: 'cta', heading: 'Learn how iGUIDE can accelerate your projects with better site data', ctas: [book('Talk to a product expert')]},
]
