/**
 * The live paid-media landing pages (4 + the AU photographer page), as Sanity landing page documents.
 * Copy, images, forms and links from the live pages (checked 2026-10-14).
 * Image markers ({img: '/assets/…'}) are uploaded from public/ by
 * scripts/seed-landing-pages.mjs; {ref: id} becomes a Sanity reference.
 */
const img = (path, alt = '') => ({img: path, alt})
const ref = (id) => ({ref: id})
let keyCount = 0
const k = () => `s${(keyCount++).toString(36)}`
const btn = (label, action, url) => ({_type: 'lpButton', _key: k(), label, action: action ?? 'form', ...(url ? {url} : {})})
const tour = (url, title = 'iGuide 3D virtual tour') => ({_type: 'lpMedia', kind: 'tour', url, title})
const yt = (url, title) => ({_type: 'lpMedia', kind: 'youtube', url, title})
const image = (path, alt) => ({_type: 'lpMedia', kind: 'image', image: img(path, alt)})

const shared = {
  seoTitle: 'Experience iGuide: Precise floor plans & 3D virtual tours made easy | iGuide',
  metaDescription:
    'Quickly create 3D virtual tours, CAD floor plans and 3D models with the iGuide PLANIX camera system. Take 360° photos and 1,000s of measurements in minutes, capturing rich property data.',
  headerButton: {_type: 'lpButton', label: 'Book a demo', action: 'form'},
  live: true,
}

/** Testimonials used only on these pages (created if missing) */
export const testimonials = [
  {
    _id: 'testimonial-lp-daniel-nik',
    name: 'Daniel Nik',
    role: 'Director & Co-Founder',
    company: 'Logic Media',
    quote:
      'I feel that without high impact video to catch buyers attention, beautiful imagery to help them become emotionally connected, and an immersive iGuide tour to allow buyers to deeply explore the home, a listing isn’t complete.',
    photo: img('/assets/Testimonial-Headshots/Daniel-Nik-Logic-Media.png', 'photo - Daniel Nik'),
  },
  {
    _id: 'testimonial-lp-paul-maynard',
    name: 'Paul Maynard',
    company: 'Colorful Virtual Tours',
    quote: 'Adding iGuide virtual tours has helped my Realtor clients sell more properties, save more time by showing fewer properties that fit home buyer’s needs.',
    photo: img('/assets/paul.png', 'photo - Paul Maynard'),
  },
  {
    _id: 'testimonial-lp-todd-wasylyshyn',
    name: 'Todd Wasylyshyn',
    company: 'Nanaimo Photography',
    quote: 'I do photos and iGuide 3D tour with floor plan for almost every single listing I do. So, it gives me more revenue.',
    photo: img('/assets/todd.png', 'photo - Todd Wasylyshyn'),
  },
  {
    _id: 'testimonial-lp-joe-levitch',
    name: 'Joe Levitch',
    role: 'President',
    company: 'Levco Builders',
    quote: 'If time is money, which it is, I am saving beyond the costs of a draftsman when it comes to creating As-Built drawings.',
    photo: img('/assets/Joe-Levitch.png', 'Joe Levitch'),
  },
  {
    _id: 'testimonial-lp-john-mckenna',
    name: 'John McKenna',
    role: 'Principal Architect',
    company: 'MC3 Design',
    quote:
      'We’re saving a lot of time by getting our existing conditions accurately modeled. Having accurate field condition drawings has been a massive benefit to our clients, especially contractors.',
    photo: img('/assets/John-McKenna.jpeg', 'John McKenna'),
  },
]

const features = (heading, rows, extra = {}) => ({
  _type: 'lpFeatures',
  _key: k(),
  heading,
  columns: 4,
  items: rows.map(([title, text, icon]) => ({_type: 'feature', _key: k(), title, text, ...(icon ? {icon: img(icon)} : {})})),
  ...extra,
})

const repFeaturesA = [
  ['Grow your business', 'The ultimate tool for maximizing your income.', '/assets/Uploads/Icons-_Digital-Twin__FitMaxWzYwLDYwXQ.png'],
  ['Speed of capture', 'Create immersive 3D virtual tours in minutes with the PLANIX R1.', '/assets/Uploads/Icons_3D-Tour__FitMaxWzYwLDYwXQ.png'],
  ['No subscriptions', 'No recurring fees. Pay only for the processing and files you need.', '/assets/Uploads/Icons-_No-Fees__FitMaxWzYwLDYwXQ.png'],
  ['Data ownership', 'Keep a digital download or host your files on our secure platform.', '/assets/Uploads/Icons-_Your-Data__FitMaxWzYwLDYwXQ.png'],
]
const repFeaturesB = [
  ['Speed of capture', 'Capture 3D virtual tours and detailed floor plans in minutes, not hours', '/assets/Uploads/Icons_3D-Tour__FitMaxWzYwLDYwXQ.png'],
  ['No recurring fees', 'No subscriptions hosting fees, credits or other ongoing costs. Pay only for the processing and files you need.', '/assets/Uploads/Icons-_No-Fees__FitMaxWzYwLDYwXQ.png'],
  ['Data ownership', 'Keep a digital download or host your files on our secure platform.', '/assets/Uploads/Icons-_Your-Data__FitMaxWzYwLDYwXQ.png'],
  ['Professional quality', 'The PLANIX R1’s high-end camera with onboard LiDAR delivers better results than a smartphone or manual measurements.', '/assets/Uploads/Icons_Reliable__FitMaxWzYwLDYwXQ.png'],
]

const repTestimonials = () => ({_type: 'lpTestimonials', _key: k(), items: [ref('testimonial-lp-paul-maynard'), ref('testimonial-lp-todd-wasylyshyn')]})

const repA = {
  _id: 'landingPage-get-iguide-rep-learn-more',
  title: 'REP: learn more (current, A)',
  path: '/get-iguide/rep/learn-more',
  layout: 'lead-form',
  ...shared,
  sections: [
    {
      _type: 'lpHero',
      _key: k(),
      style: 'form',
      heading: 'Boost your revenue potential',
      subheading: 'Expand your services with iGuide 3D virtual tours, precise floor plans and qualified leads',
      formHeading: 'Connect with an iGuide Specialist!',
      hubspotFormId: '0d755dfc-cbcb-4c65-9344-b0634832680d',
    },
    {_type: 'lpLogos', _key: k(), logosFrom: 'logoBand-real-estate'},
    features('Why Real Estate Photographers choose iGuide', repFeaturesA, {background: 'surface'}),
    {
      _type: 'lpStats',
      _key: k(),
      items: [
        {_type: 'stat', _key: k(), value: '10X Growth', text: 'That’s how much our business has scaled since integrating iGuide into our services! (Lauren Murphy, Monster Media House)'},
      ],
      background: 'sky',
    },
    {
      _type: 'lpSplit',
      _key: k(),
      heading: 'Experience every angle',
      body: 'Use the iGuide PLANIX R1 camera system to accurately document spaces and create an iGuide in minutes. It’s the perfect 3D Camera for Real Estate Photographers. Each iGuide provides:',
      bullets: ['An immersive 3D tour', 'Accurate lidar measurement within 0.5%', 'ANSI-Z765-2021 2D floor plans', 'Comprehensive documentation'],
      media: yt('https://www.youtube.com/watch?v=waROUizarks', 'iGuide PLANIX R1'),
    },
    {
      _type: 'lpSplit',
      _key: k(),
      heading: 'Dive into the iGuide experience',
      body: 'It takes 15 minutes to measure, document and photograph a 3,000 sq ft space simultaneously. Deliver floor plans, room dimensions, square footage and more in less than 24 hours.*',
      footnote: '*Delivery time is estimated dependent on the complexity of the file.',
      media: tour('https://youriguide.com/embed/100_chattel_st_haverhill_ma?unbranded=1', 'iGuide 3D tour of 100 Chattel St, Haverhill MA'),
      mediaSide: 'left',
      background: 'surface',
    },
    repTestimonials(),
    {
      _type: 'lpSteps',
      _key: k(),
      heading: 'Interactive floor plans as easy as 1-2-3',
      steps: [
        {_type: 'step', _key: k(), title: 'Capture', text: 'Connect your iGuide PLANIX R1 camera system to your smart device, create a new project and start scanning the property.'},
        {_type: 'step', _key: k(), title: 'Process', text: 'Via the iGuide Portal request your iGuide floor plan, virtual tour and feature sheet.'},
        {_type: 'step', _key: k(), title: 'Utilize', text: 'Easily share your files, post on social media, or upload to your website. iGuide file formats integrate with smart devices and web platforms.'},
      ],
    },
    {
      _type: 'lpVideos',
      _key: k(),
      heading: 'Realtors ask for iGuide by name',
      videos: [
        {_type: 'video', _key: k(), title: 'Realtors on iGuide', url: 'https://www.youtube.com/watch?v=x9v7pueympg'},
        {_type: 'video', _key: k(), title: 'Why agents ask for iGuide', url: 'https://www.youtube.com/watch?v=CYngkpi09Wk'},
      ],
    },
    {
      _type: 'lpForm',
      _key: k(),
      heading: 'Download our Free Brochure',
      subheading: 'Create the ultimate homebuyer experience',
      hubspotFormId: 'a9c05de6-a150-4940-91c6-b6d1e2982ee5',
      background: 'sky',
    },
  ],
}

const repB = {
  _id: 'landingPage-get-iguide-rep-learn-more-b',
  title: 'REP: learn more (updated, B)',
  path: '/get-iguide/rep/learn-more-b',
  layout: 'lead-form',
  variantOf: ref('landingPage-get-iguide-rep-learn-more'),
  ...shared,
  sections: [
    {
      _type: 'lpHero',
      _key: k(),
      style: 'form',
      heading: 'Capture professional 3D tours and detailed floor plans in one shoot.',
      subheading: 'Scan a 3,000 sq ft home in as little as 15 minutes with deliverables in 24 hours. No monthly subscriptions. No hosting fees.',
      formHeading: 'Connect with an iGuide Specialist!',
      hubspotFormId: '0d755dfc-cbcb-4c65-9344-b0634832680d',
    },
    {_type: 'lpLogos', _key: k(), logosFrom: 'logoBand-real-estate'},
    features('Why Real Estate Photographers choose iGuide', repFeaturesB, {background: 'surface'}),
    {
      _type: 'lpSplit',
      _key: k(),
      heading: 'The real estate camera for floor plans and tours',
      body: 'The PLANIX R1 camera system captures 360° images and LiDAR measurements of each room it’s in to create an iGuide in minutes. It’s the perfect 3D Camera for Real Estate Photographers.\n\nThe PLANIX R1 delivers:',
      bullets: [
        'Easy set up: Simply connect the camera to your smart device, create a new project and start scanning.',
        'Fast capture: It only takes 15-20 minutes to measure, document and photograph 3,000 sq ft.',
        'Quick turnaround: Get floor plans, room dimensions, square footage and more in less than 24 hours*.',
      ],
      footnote: '*Delivery time is estimated dependent on the complexity of the file.',
      media: yt('https://www.youtube.com/watch?v=waROUizarks', 'iGuide PLANIX R1'),
    },
    {
      _type: 'lpSplit',
      _key: k(),
      heading: 'The iGuide experience',
      body: 'The completed iGuide is an accurate and detailed floor plan accompanied by an interactive high-resolution 3D visualization of the property.\n\nEach iGuide provides:',
      bullets: ['3D virtual walkthrough', 'Color-coded 2D floor plans', 'ANSI-Z765 / RMS compliant 2D square footage calculations', 'Comprehensive documentation', 'Downloadable offline file'],
      media: tour('https://youriguide.com/embed/100_chattel_st_haverhill_ma?unbranded=1', 'iGuide 3D tour of 100 Chattel St, Haverhill MA'),
      mediaSide: 'left',
      background: 'surface',
    },
    repTestimonials(),
    {
      _type: 'lpSteps',
      _key: k(),
      heading: 'iGuide is as easy as 1-2-3',
      steps: [
        {_type: 'step', _key: k(), title: 'Capture', text: 'Connect your iGuide camera to your smart device, create a new project & start scanning the property.'},
        {_type: 'step', _key: k(), title: 'Process', text: 'Go to the iGuide Portal and request your iGuide floor plan, virtual tour and feature sheet.'},
        {_type: 'step', _key: k(), title: 'Utilize', text: 'Share, post, upload or download your files. iGuide integrates with the MLS systems, listing portals and software you already use.'},
      ],
    },
  ],
}

const aecFeatures = (rows) =>
  features('Why AEC professionals trust iGuide', rows, {
    columns: 3,
    footnote: '*Delivery time is dependent on property size and complexity and may exceed 48 hours. Excluding Sundays, holidays, and outside office hours (Mon – Fri, 9am – 5pm EST).',
    background: 'surface',
  })

const aecTabs = (withIntro) => ({
  _type: 'lpTabs',
  _key: k(),
  heading: 'Experience iGuide',
  ...(withIntro ? {subheading: 'Every project is different. Explore the deliverables that work best for your needs.'} : {}),
  tabs: [
    {
      _type: 'tab',
      _key: k(),
      label: 'iGuide Virtual Walkthrough',
      text: 'Easily track, document and share project progress to support remote collaboration and faster decision-making, no site revisit required.',
      media: tour('https://youriguide.com/pre_and_post_construction', 'iGuide walkthrough: pre and post construction'),
    },
    {
      _type: 'tab',
      _key: k(),
      label: 'iGuide DWG Add-on',
      text: 'DWG Floor Plans can be added to any iGuide Standard or Premium. Simply request the DWG Add-on when creating an iGuide Standard or Premium and your DWG file will be delivered in 48 hours or less.³',
      media: image('/assets/Uploads/DWG-v3.png', 'DWG Example'),
      buttons: [
        btn('Commercial Premium DWG', 'url', '/assets/Sample-Drawing-Packages/Commercial-Premium-DWG.zip'),
        btn('Commercial iGuide', 'url', 'https://youriguide.com/145_pioneer_st/'),
        btn('Residential Premium DWG', 'url', '/assets/Sample-Drawing-Packages/Residential-Premium-DWG.zip'),
        btn('Residential iGuide', 'url', 'https://youriguide.com/vPMVUZ9FZB3DD1'),
      ],
    },
    {
      _type: 'tab',
      _key: k(),
      label: 'iGuide RVT Add-on',
      text: 'Significantly reducing design process timelines, the iGuide RVT Add-on⁴ can be requested with any iGuide Premium.',
      media: image('/assets/Uploads/RVT-v3.png', 'RVT Example'),
      buttons: [btn('Commercial RVT sample', 'url', '/assets/Sample-Drawing-Packages/Commercial-RVT.zip'), btn('Download brochure', 'url', '/assets/brochures/iGUIDE_RVT_Add-on_1-Pager-1.pdf')],
    },
    {
      _type: 'tab',
      _key: k(),
      label: 'CAD Deliverables',
      text: 'Unlock a property’s full potential. This package pairs iGuide’s immersive experience with 2D CAD (DWG) and 3D Model (Revit) deliverables, detailed Plotted PDFs, plus a Roof Plan and Exterior Elevation Drawing to provide comprehensive documentation of your property.',
      media: image('/assets/Uploads/image.png', 'CAD Example'),
      // Live also links "3D CAD Package Deliverables" (/assets/brochures/3D-CAD-Package-Deliverables.pdf), which 404s on live: left out
      buttons: [btn('Commercial sample', 'url', '/assets/Sample-Files/3D-CAD-commercial.zip'), btn('Residential sample', 'url', '/assets/Sample-Files/3D-CAD-Residential.zip')],
    },
  ],
})

const aecTestimonials = () => ({_type: 'lpTestimonials', _key: k(), items: [ref('testimonial-lp-joe-levitch'), ref('testimonial-lp-john-mckenna')]})
const aecHero = () => ({
  _type: 'lpHero',
  _key: k(),
  style: 'form',
  heading: 'Streamline your next project with accurate floor plans',
  formHeading: 'Book your demo today',
  hubspotFormId: 'ef0fe7a6-b994-4c5c-91c1-740bd8b0550a',
})

const aecA = {
  _id: 'landingPage-get-iguide-aec-learn-more',
  title: 'AEC: learn more (current, A)',
  path: '/get-iguide/aec/learn-more',
  layout: 'deliverables',
  ...shared,
  sections: [
    aecHero(),
    {_type: 'lpLogos', _key: k(), logosFrom: 'logoBand-aec-customers'},
    aecFeatures([
      ['Skip the tape measure', 'Capture 1,000s of measurements in a single scan'],
      ['Quick turnarounds', 'Get accurate floor plans and virtual walkthroughs in 48 hours or less*'],
      ['Seamless collaboration', 'Share iGuide Walkthroughs for precise estimates and better communication'],
      ['Boost client satisfaction', 'Minimize errors with clear, detailed visualizations'],
      ['Dependable accuracy', '0.5% or better uncertainty in distance measurements on a floor plan'],
    ]),
    aecTestimonials(),
    features('From a head-start to complete drawing packages, iGuide delivers!', [
      ['Fast and easy', 'Just press a button, and the PLANIX camera system handles the rest', '/assets/Icons/Icon-300x300_Compliant-Solution__FitMaxWzYwLDYwXQ.png'],
      ['Accuracy at its core', 'LiDAR technology captures 1,000s of measurements with every scan', '/assets/Icons/Icon-300x300_Accurate-Measurements-v2__FitMaxWzYwLDYwXQ.png'],
      ['Professional Draft Team', 'Our team quickly processes the data to deliver your project files', '/assets/Icons/Icon-300x300_Superior-Navigation__FitMaxWzYwLDYwXQ.png'],
      ['LOD 200 & AIA-Compliant', 'iGuide CAD floor plans meet LOD 200 standards and include AIA-compliant layers', '/assets/Icons/Icon-300x300_Value_Accurate-floor-plans__FitMaxWzYwLDYwXQ.png'],
    ]),
    {_type: 'lpCta', _key: k(), heading: 'Kickstart your next project today!', buttons: [btn('Get started', 'url', 'https://share.hsforms.com/19Vt1VnnASLGIVQaIY_DEQg42d3n')]},
    aecTabs(false),
    {
      _type: 'lpVideos',
      _key: k(),
      heading: 'What makes iGuide the top choice for professionals',
      videos: [
        {_type: 'video', _key: k(), title: 'MC3 Design shares their iGuide experience', url: 'https://www.youtube.com/watch?v=6VXKsBK0DnE'},
        {_type: 'video', _key: k(), title: 'Levco Builders shares their iGuide experience', url: 'https://www.youtube.com/watch?v=MFywiM0oFwc'},
      ],
    },
    {
      _type: 'lpFaq',
      _key: k(),
      heading: 'Frequently asked questions',
      items: [
        [
          'How does iGuide ensure accuracy in measurements and floor plans?',
          'iGuide captures data using the PLANIX camera system, a proprietary device combining time-of-flight LiDAR technology with a 360° RICOH THETA X camera. This powerful integration rapidly collects the information needed to create accurate floor plans, drawing packages, rich property data and immersive 3D virtual walkthroughs.',
        ],
        [
          'Can iGuide be integrated with existing construction and architecture software?',
          'Yes, iGuide is compatible with many popular construction and architecture software solutions, including AutoCAD, Chief Architect and SketchUp (along with others), allowing seamless integration into existing workflows for enhanced productivity and collaboration.',
        ],
        [
          'What is the price of iGuide Processing?',
          'iGuide pricing is based on the square footage of the property, a one-time cost with no ongoing subscription fees. You own the data for every project. Get detailed pricing and estimate the cost of your project at goiguide.com/pricing.',
        ],
        [
          'What is iGuide and how can it benefit professionals in AEC?',
          'iGuide is a comprehensive indoor mapping solution that delivers accurate floor plans, precise measurements and immersive 3D virtual walkthroughs. It helps construction, engineering and architecture professionals jumpstart as-built drawings, streamline renovation planning and enhance stakeholder collaboration. iGuide can also deliver complete CAD packages, making it a powerful tool for documenting existing structures and planning projects with confidence.',
        ],
      ].map(([question, answer]) => ({_type: 'qa', _key: k(), question, answer})),
    },
  ],
}

const aecB = {
  _id: 'landingPage-get-iguide-aec-learn-more-b',
  title: 'AEC: learn more (updated, B)',
  path: '/get-iguide/aec/learn-more-b',
  layout: 'deliverables',
  variantOf: ref('landingPage-get-iguide-aec-learn-more'),
  ...shared,
  sections: [
    aecHero(),
    {_type: 'lpLogos', _key: k(), logosFrom: 'logoBand-aec-customers'},
    aecFeatures([
      ['Fast capture technology', 'Capture 1,000s of LiDAR measurements per scan in a single click.'],
      ['Quick turnarounds', 'CAD-ready DWG + 3D walkthrough in 48 hours or less*.'],
      ['Seamless collaboration', 'Easily share iGuide walkthroughs with clients, team members and inspectors.'],
      ['Boost client satisfaction', 'Get projects done faster and more accurately with fewer errors or revisits.'],
      ['Dependable accuracy', '0.5%+ uncertainty in distance measurements on a floor plan; meets LOD 200 / AIA-compliant layers.'],
      ['Less time on-site', 'Fast, comprehensive digital capture eliminates slow manual processes and the need for repeated site visits.'],
    ]),
    aecTestimonials(),
    features('Professionally drafted and compliant drawings', [
      ['Professional Draft Team', 'iGuide’s draft team is professionally trained to process and deliver your data quickly and accurately.', '/assets/Icons/Icon-300x300_Compliant-Solution__FitMaxWzYwLDYwXQ.png'],
      ['Standards Compliance', 'iGuide CAD floor plans meet LOD 200 standards and include AIA-compliant layers.', '/assets/Icons/Icon-300x300_Accurate-Measurements-v2__FitMaxWzYwLDYwXQ.png'],
      ['Software Compatibility', 'iGuide seamlessly integrates with many popular construction and architecture software solutions.', '/assets/Icons/Icon-300x300_Superior-Navigation__FitMaxWzYwLDYwXQ.png'],
      ['Fast and easy to use', 'The PLANIX camera system captures visuals and measurements with a simple press a button.', '/assets/Icons/Icon-300x300_Compliant-Solution__FitMaxWzYwLDYwXQ.png'],
    ]),
    {_type: 'lpLogos', _key: k(), heading: 'Files delivered ready for', logosFrom: 'logoBand-cad-software'},
    aecTabs(true),
  ],
}

const terms = '/au/immersive-campaign-terms-and-conditions'

const auRep = {
  _id: 'landingPage-get-iguide-rep-iguide-for-real-estate-photographers-au',
  title: 'AU: REP photographers (ad page)',
  path: '/get-iguide/rep/iguide-for-real-estate-photographers-au',
  layout: 'lead-form',
  ...shared,
  seoTitle: 'iGuide for Real Estate Photographers Australia | Virtual Tours & Floor Plans | iGuide',
  metaDescription: undefined,
  headerButton: btn('Book your personalized product tour', 'demo'),
  sections: [
    {
      _type: 'lpHero',
      _key: k(),
      style: 'form',
      heading: 'The all-in-one upgrade for your photography business',
      subheading: 'Expand your services with iGuide virtual tours, accurate floor plans and Site Plans.',
      showRating: true,
      formHeading: 'Book your personalized product tour',
      hubspotFormId: '1dc1581f-c103-43b0-bef2-3d274daa7fa5',
    },
    {
      _type: 'lpSplit',
      _key: k(),
      heading: 'realestate.com.au is covering iGuide processing',
      body: 'From September 1st, 2026 to March 31st, 2027, processing on eligible residential iGuide Premium and Site Plan orders is funded by realestate.com.au nationally. Add iGuide to your service with that cost off the table.\n\nHow it works:',
      bullets: [
        'Shoot the iGuide as part of your normal workflow. Nothing changes for you or the agent.',
        'Upload to the listing within 60 days of creating the iGuide, on realestate.com.au.',
        'Processing is covered by realestate.com.au. If a job isn’t uploaded in time, standard processing charges apply.',
      ],
      footnote:
        'Already set up? Add iGuide to your next listing. iGuide Processing: Complimentary processing applies to residential iGuide Instant, Express, Standard or Premium and Site Plan Add-on orders uploaded to realestate.com.au within 60 days of creation. Limit of one processing credit per listing. Offer ends 31 March 2027 and may be withdrawn earlier on 14 days’ notice. Terms & Conditions apply.',
      buttons: [btn('Book your demo today', 'url', 'https://calendly.com/d/ctsc-x7b-xzg/iguide-demo'), btn('Full terms', 'url', terms)],
      media: image('/assets/Australia/iGUIDE-REA-Chris.webp', 'iGuide PLANIX R1 camera'),
      background: 'surface',
    },
    features(
      'Why Australian real estate photographers choose iGuide',
      [
        ['Grow your business', 'Help Australian agents stand out with immersive listing assets they’re increasingly demanding.'],
        ['Speed of capture', 'Capture virtual tours, floor plans and Site Plans in as little as 15 minutes.'],
        ['No subscriptions', 'No recurring fees. Simple pay-per-project pricing. Scale your business without unexpected costs.'],
        ['Data ownership', 'Download your files or host them on our secure platform.'],
      ],
    ),
    {_type: 'lpTestimonials', _key: k(), items: [ref('testimonial-lp-daniel-nik')]},
    {
      _type: 'lpSplit',
      _key: k(),
      heading: 'The only solution to meet the requirements of the Australian market',
      body: 'Each iGuide provides:',
      bullets: [
        'An immersive 3D tour',
        'Accurate lidar measurement within 0.5%',
        'Floor plans built for realestate.com.au’s NextGen listing experience',
        'Site Plans that deliver full exterior context',
      ],
      media: {_type: 'lpMedia', kind: 'video', url: 'https://goiguide.com/assets/Australia/iGUIDE-Australia-Launch-Video.mp4', title: 'iGuide Australia launch video'},
    },
    {
      _type: 'lpSplit',
      _key: k(),
      heading: 'Give agents something worth paying more for',
      body: 'Branded Property Overviews turn your iGuide capture into a polished, client-ready deliverable agents can share with confidence, helping you stand out and increase your value per shoot.',
      media: image('/assets/Branded-Property-Overviews.png', 'img - Branded Property Overviews'),
      mediaSide: 'left',
      background: 'surface',
    },
    {
      _type: 'lpSteps',
      _key: k(),
      heading: 'Interactive floor plans as easy as 1-2-3',
      steps: [
        {_type: 'step', _key: k(), title: 'Capture', text: 'Connect your iGuide PLANIX R1 camera system to your smart device, create a new project and start scanning the property.', image: img('/assets/rx-camera-small.png', 'photo - Capture Specialist')},
        {_type: 'step', _key: k(), title: 'Process', text: 'Via the iGuide Portal request your iGuide floor plan, virtual tour and feature sheet.', image: img('/assets/Uploads/Process_72dpi.jpg', 'photo - PLANIX App in use')},
        {_type: 'step', _key: k(), title: 'Explore', text: 'Easily share your files, post on social media, or upload to your website. iGuide file formats integrate with smart devices and web platforms.', image: img('/assets/Uploads/Utilize_72dpi.jpg', 'photo - Sharing an iGuide with the Team')},
      ],
    },
    {
      _type: 'lpCta',
      _key: k(),
      heading: 'Ready to see it in action?',
      text: 'Book a 15-minute walkthrough and see how iGuide fits your workflow.',
      buttons: [btn('Book a 15-minute walkthrough', 'demo'), btn('Shop cameras', 'url', 'https://store.goiguide.com/')],
    },
  ],
}

export const pages = [repA, repB, aecA, aecB, auRep]
