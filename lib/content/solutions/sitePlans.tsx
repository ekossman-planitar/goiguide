/** /iguide/site-plans — copy, links and asset paths from the live page (checked 2026-10-07). */
import {book} from './shared'

export const sitePlans = {
  meta: {
    title: 'Site Plans for Real Estate Listings | Show the Full Property with iGUIDE | iGUIDE',
    description:
      'Add exterior context to your listings with iGUIDE Site Plans. Show how a home sits on the property, connect interior and exterior spaces, and deliver a complete real estate listing from one capture.',
    path: '/iguide/site-plans',
    ogImage: '/assets/Solutions_Site-Plans.png',
  },
  hero: {
    eyebrow: {label: 'New: Site Plans for residential listings'},
    heading: 'Complete the listing. Inside and out.',
    subheading:
      'Capture once and deliver immersive tours and Site Plans for real estate listings—expanding the listing assets you can offer, all aligned from a single source of truth.',
    extra: 'Most listings stop at the interior. Site Plans helps you present the full property story—inside and out.',
    // Live hero pop-up offers "I'd like to book a personalized demo" / "I'm just looking to learn more"
    ctas: [book()],
    video: {src: '/assets/Site-Plans-Feature-Launch-Video.mp4', label: 'iGUIDE Site Plans feature launch video'},
  },
  logos: {
    heading: 'Trusted by thousands of creators worldwide',
    items: [
      {src: '/assets/Uploads/Scrolling-LogosRemax.png', alt: 'logo - RE/MAX'},
      {src: '/assets/Uploads/Scrolling-LogosKW.png', alt: 'logo - Keller Williams'},
      {src: '/assets/Uploads/Scrolling-LogosRoyalLePage.png', alt: 'logo - Royal LePage'},
      {src: '/assets/Uploads/loookinside-logo.png', alt: 'logo - LooOK INside'},
      {src: '/assets/Uploads/Scrolling-LogosSeeknow.png', alt: 'logo - SeekNow'},
      {src: '/assets/Uploads/Scrolling-LogosPrepTours.png', alt: 'logo - PREP Tours'},
      {src: '/assets/Uploads/Scrolling-LogosVisual.png', alt: 'logo - Visual Advantage'},
    ],
  },
  context: {
    heading: 'See the space. Understand the full property with Site Plans.',
    body: 'Immersive tours changed how buyers explore homes. But they don’t always answer the questions that come up—especially when exterior context is missing.',
    listHeading: 'Questions agents and buyers still need answered:',
    list: ['How the home sits on the property', 'How interior and exterior spaces connect', 'What’s included—and what isn’t'],
    after:
      'iGUIDE Site Plans extend immersive listings beyond the interior, showing the full property context buyers usually have to imagine. Listings feel more complete, transparent and easier to trust.',
    gif: {src: '/assets/Site_Plan_Screen_Recording_9x16.gif', alt: 'Site Plans screen recording', width: 540, height: 960},
  },
  explore: {
    eyebrow: 'Explore Site Plans for residential listings',
    heading: 'What buyers usually have to imagine about a property, Site Plans make clear for real estate listings.',
    subheading:
      'Site Plans for real estate listings surface what’s often missing from listings clearly and upfront—giving you a simple way to add exterior context without adding complexity.',
    tour: {
      src: 'https://youriguide.com/334_south_lake_shore_drive_thousand_oaks?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF&__avoid-embed-load__&nosplash',
      title: 'iGUIDE tour with Site Plan of 334 South Lake Shore Drive, Thousand Oaks',
    },
  },
  oneCapture: {
    heading: 'One capture. One complete listing.',
    body: 'iGUIDE Site Plans are generated from the same capture as the immersive walkthrough, so interior and exterior context stay aligned from a single session.',
    listHeading: 'From the same source of truth, you get:',
    list: ['Interior and exterior stay aligned', 'Exterior context buyers don’t have to imagine', 'One consistent listing experience with fewer questions'],
    after: 'When everything comes from one capture, buyers feel more confident and can move forward with fewer unknowns.',
    image: {src: '/assets/Solutions_Site-Plans.png', alt: 'img - Site Plans'},
  },
  testimonial: {
    quote:
      "I think it's cool because it gives buyers a chance to really look at the property. Sometimes the angle you grab in a photo can make the backyard look huge or really small—and then you walk out there and it's not what you expected. With a Site Plan, they can actually see what they're getting before they ever step foot on the property.",
    name: 'Mike Martin',
    role: 'Agent',
    company: 'InMotion Real Estate',
    photo: {src: '/assets/Testimonial-Headshots/Mike-Martin.jpg', alt: 'photo - Mike Martin'},
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {q: 'What is a Site Plan in real estate?', a: 'A Site Plan in real estate shows how a property sits on the land — including the building footprint, access points, and surrounding outdoor features. Unlike floor plans, which focus on the interior, Site Plans provide exterior context to help buyers understand the full property.'},
      {q: 'How is a Site Plan different from a floor plan?', a: 'A Site Plan is different from a floor plan because it shows exterior layout and land context, while a floor plan shows the interior layout of a home. Used together, floor plans explain what’s inside, and Site Plans show how the home fits on the property.'},
      {q: 'Are iGUIDE Site Plans surveys or permit drawings?', a: 'No — iGUIDE Site Plans are not surveys or permit drawings. iGUIDE Site Plans are schematic, marketing-focused visuals designed to support buyer understanding and property listings, not technical or regulatory submissions.'},
      {q: 'How are Site Plans created with iGUIDE?', a: 'Site Plans are created from the same iGUIDE capture used to generate floor plans and walkthroughs. Because everything comes from a single source of truth, Site Plans are produced without requiring an additional site visit or extra coordination.'},
      {q: 'Do Site Plans include measurements?', a: 'Site Plans show visual layout and relative spatial relationships to help buyers understand the property. They are schematic, marketing-focused visuals and should not be used as certified measurements or legal representations.'},
      {q: 'Who should use Site Plans?', a: 'Site Plans are used by real estate photographers, agents, and brokerages who want to provide buyers with clearer exterior context. They are especially useful for listings where land, access, or layout play an important role in understanding the property.'},
      {q: 'What is a Branded Property Overview?', a: 'A Branded Property Overview is an optional, buyer-facing presentation that allows agents to add their branding to select listing assets. Site Plans can be included in a Branded Property Overview to create a clean, branded version that’s easy to share with buyers.'},
      {q: 'Are Site Plans required to use a Branded Property Overview?', a: 'No — Site Plans are not required to use a Branded Property Overview. Branded Property Overview is an optional add-on for agents who want a branded, marketing-ready presentation and Site Plans can be included when relevant.'},
      {
        q: 'How is Site Plans pricing structured for real estate photographers?',
        a: (
          <>
            <p>
              Site Plans are offered as a per-property add-on to iGUIDE Standard and Premium, giving real estate photographers a
              straightforward way to expand what they deliver on each shoot. Pricing is set per property and varies by region. As a
              reference, Site Plans are typically priced at:
            </p>
            <ul>
              <li>$25 AUD</li>
              <li>$35 USD</li>
              <li>$45 CAD</li>
            </ul>
            <p>
              Because Site Plans are generated from the same iGUIDE capture, they can be added without additional time onsite, making
              them a simple, high-value deliverable photographers can offer to clients.
            </p>
          </>
        ),
      },
      {q: 'How accurate are the boundaries?', a: 'Boundary lines are estimates based on third-party data and are not guaranteed.'},
      {q: 'What is the processing time for an iGUIDE with a Site Plan Add-on?', a: 'iGUIDEs with a Site Plan Add‑on for conventional lot sizes will be processed within 24 hours when all required data is uploaded to the iGUIDE Portal; however, this timeline may not apply to properties with more than 10,000 sq ft (929 sq m) of interior space, extensive acreage or complex site features. In such cases, delivery of the iGUIDE + Site Plan Add-on will depend on overall size and complexity and may exceed 48 hours.'},
    ],
  },
  cta: {
    heading: 'See how Site Plans fit into your listings',
    text: 'Take a quick look at how Site Plans add exterior context and pair with floor plans—no prep required.',
    ctas: [book('Book a 15-minute walkthrough')],
  },
}
