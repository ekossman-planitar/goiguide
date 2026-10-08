/** /forensic-investigation — copy, links and asset paths from the live page (checked 2026-10-07). */
import type {Block} from '@/components/blocks/Blocks'
import {book, findPro, instantPackage, ircLogos, premiumPackage, standardPackage, tour} from './shared'

export const meta = {
  title: 'Document fire scenes with speed, accuracy and detail | iGUIDE',
  description: 'Capture fire scenes with speed and accuracy. Get measurements, floor plans, and visuals ready for analysis and courtroom use.',
  path: '/forensic-investigation',
}

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Document fire and crime scenes with speed, accuracy and detail',
    subheading:
      'Capture accurate measurements, floor plans and immersive visuals in a single visit. Ready for analysis, reporting or courtroom presentation.',
    ctas: [book(), {label: 'Download iGUIDE Premium sample', href: '/assets/PREMIUM_SKETCH.ESX.zip', variant: 'secondary'}],
    media: {
      type: 'embed',
      src: tour('https://youriguide.com/embed/664e7263-4c29-4c6a-9b35-b4b98cf8bf57?unbranded=1&autostart=1&bgcolor=FFFFFF'),
      title: 'iGUIDE tour of a documented fire scene',
    },
  },
  {type: 'logos', heading: 'Trusted by thousands of IRC professionals worldwide', logos: ircLogos},
  {
    type: 'cards',
    id: 'benefits',
    heading: 'Who benefits from accurate floor plans with an integrated iGUIDE virtual walkthrough',
    subheading: 'Accurate measurements, floor plans and comprehensive images benefit anyone who needs to document a scene precisely.',
    cards: [
      {title: 'Get to analysis faster', text: 'Fast turnaround so you can move to analysis sooner', icon: {src: '/assets/fasttrack-your-cad-workflow.svg', alt: 'icon - Property Data Sheet'}},
      {title: 'Defensible, court-ready reports', text: 'LiDAR-accurate measurements stand up in court', icon: {src: '/assets/capture-comprehensive-data.svg', alt: 'icon - Stamped Document'}},
      {title: 'Preserve evidence for the long term', text: 'Detailed visual records for long-term storage and review', icon: {src: '/assets/forensics.svg', alt: 'icon - Photos'}},
      {title: 'Own your data with no ongoing fees', text: 'Pay per project with full data ownership and download rights', icon: {src: '/assets/Icons/cloud.png', alt: 'icon - Connected to the Cloud'}},
    ],
  },
  {
    type: 'quote',
    quote: {
      quote:
        'Accurately documenting fire scenes can be a challenge, but iGUIDE has changed that for us. The setup is simple, the deliverables are fast, and the value is unmatched.',
      name: 'Todd Estes',
      role: 'Division Chief - Planning, Investigations',
      company: 'Noblesville Fire Department',
      photo: {src: '/assets/Todd-Estes.png', alt: 'photo - Todd Estes'},
    },
  },
  {
    type: 'split',
    id: 'deliverables',
    heading: 'Capture, measure and share with complete confidence',
    body: <p>When accuracy, speed and data integrity are critical, iGUIDE makes documenting complex scenes straightforward.</p>,
    listHeading: 'Why fire investigators choose iGUIDE',
    list: [
      'Set up in minutes and start collecting accurate evidence faster than ever',
      'Capture photos, notes and videos with Real-Time Tags',
      'Reliable measurements and floor area calculations that stand up in court',
      'Complete control over your data with secure hosting and offline downloads',
      'SOC 2 Type II certified — annual third-party audits with zero exceptions, meeting globally recognized Trust Services Principles',
    ],
    ctas: [
      {
        label: 'Listen - Fire Investigation Podcast',
        href: 'https://podcasts.apple.com/ca/podcast/s2-ep-9-iguide-3d-camera-efficient-fire-investigation/id1739288903?i=1000706642586',
        variant: 'secondary',
        newTab: true,
      },
    ],
    media: {type: 'image', image: {src: '/assets/irc.jpg', alt: 'iGUIDE'}},
  },
  {
    type: 'packages',
    id: 'packages',
    background: 'surface',
    heading: 'Find the right fit for your project',
    subheading: 'See and compare what you get with each type of iGUIDE.',
    columns: 4,
    items: [
      {
        title: 'iGUIDE RADIX',
        image: {src: '/assets/Homepage-iguide-Radix__FitMaxWzkzMCwzMzZd.png', alt: 'iGUIDE RADIX', width: 930, height: 336},
        includesLabel: 'Includes:',
        includes: ['3D virtual walkthrough with point cloud', 'Downloadable file for self-hosting', 'Downloadable DXF file'],
        cta: {label: 'View sample RADIX', href: 'https://iguideradix.com/4c99c640-7f84-4003-b48d-cc2faa902ac0', newTab: true},
      },
      {...instantPackage, includes: [...instantPackage.includes, '$20 offline zip file download add-on']},
      standardPackage,
      premiumPackage,
    ],
  },
  {
    type: 'steps',
    id: 'steps',
    heading: 'From capture to case-ready in three steps',
    steps: [
      {
        title: 'Capture',
        body: 'Use the iGUIDE PLANIX R1 camera system to scan the space in minutes, adding real-time tags for points of interest.',
        image: {src: '/assets/capture_72dpi.jpg', alt: 'photo - iGUIDE Capture Specialist'},
      },
      {
        title: 'Draft',
        body: 'Submit the data for processing and choose the iGUIDE that fits your project.',
        image: {src: '/assets/Uploads/Process_72dpi.jpg', alt: 'photo - PLANIX App in Use'},
      },
      {
        title: 'Deliver',
        body: 'Receive your files within the specified turnaround time—ready to use in your preferred workflow.',
        image: {src: '/assets/Xactimate_72dpi.jpg', alt: 'photo - Verisk Xactimate Integration on Computer'},
      },
    ],
    // Live: "Lets chat about iGUIDE" opens a "Get in touch" pop-up
    ctas: [book('Lets chat about iGUIDE'), {...findPro, variant: 'secondary'}],
  },
  {
    type: 'quotes',
    id: 'customer-stories',
    background: 'surface',
    heading: 'See how iGUIDE helps firms work faster and smarter',
    link: {label: 'View all IRC customer stories', href: '/customer-stories?category=insurance-and-restoration'},
    quotes: [
      {
        quote:
          "This product amazes me every time I use it. It works so flawlessly and it's such a joy to have and use for my work. I shot a 53,000 sq ft office space and although it took a while, it was so easy and took little effort on my part aside from moving around the 5-story building.",
        name: 'Roger Thorpe',
        role: 'Fire investigator',
        company: 'Joseph Myers Investigations LLC',
        media: {type: 'embed', src: 'https://www.youtube.com/embed/2Qbinadn9Q0', title: 'Roger Thorpe, Joseph Myers Investigations, on iGUIDE'},
      },
      {
        quote:
          'One of our clients told us, ‘Every fire I send you on, I want an iGUIDE.’ That’s how valuable it has become. Now we scan every scene. If it ends up in litigation? We’ve got exactly what we need ready to go.',
        name: 'Bob Toth',
        role: 'Owner & Certified Fire Investigator',
        company: 'IRIS Fire',
        media: {type: 'image', image: {src: '/assets/Uploads/iris_fire_customerstory.png', alt: 'IRIS Fire Story'}},
      },
    ],
  },
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'Who typically uses iGUIDE for forensic documentation?',
        a: (
          <>
            <p>iGUIDE is used by professionals in both public and private investigations, including:</p>
            <ul>
              <li>Private fire origin and cause firms</li>
              <li>Public fire departments</li>
              <li>Departments of Justice (DOJ)</li>
              <li>Public police departments</li>
            </ul>
          </>
        ),
      },
      {q: 'What files are included?', a: 'PDF floor plans, DXF, DWG, ESX, point cloud, 3D walkthrough and image set.'},
      {q: 'How accurate is the data?', a: 'Measurements to walls have an uncertainty of ±1 cm; floor plans have acceptable tolerance for wall thicknesses of ±1/2".'},
      {q: 'Can I self-host the data?', a: 'Yes—projects can be downloaded and stored securely offline.'},
      {q: 'Is there a subscription?', a: 'No—pricing is per project and you own the data.'},
      {
        q: 'Do I need to do the scan myself?',
        a: 'No—our national network of iGUIDE Pros can capture for you if you don’t want to purchase your own PLANIX R1 Camera System.',
      },
      {q: 'Typical turnaround time?', a: 'Instant sketch: minutes; iGUIDE Standard and Premium Sketches: within 24 hours.'},
      {
        q: 'What is the iGUIDE Portal and how do Essentials and Enterprise differ?',
        a: (
          <p>
            The iGUIDE Portal is an online software interface for submitting and managing iGUIDE project data before and after processing. iGUIDE
            project data can be interpreted into various deliverables, ranging from simple to complex. The iGUIDE Essentials Portal is used by most
            iGUIDE users because of its features and lower price. The iGUIDE Enterprise Portal has enhanced data management and security features in
            addition to what the Essentials Portal offers at a premium price. Download the{' '}
            <a href="/assets/Uploads/iGUIDE_Portal_Brochure_Final.pdf">the iGUIDE Portal brochure</a> to learn more.
          </p>
        ),
      },
    ],
  },
  // Live: "Talk to a product expert" opens a contact pop-up
  {type: 'cta', heading: 'Start your next investigation with better site data', ctas: [book('Talk to a product expert')]},
]
