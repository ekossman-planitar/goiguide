/** /real-estate-photography — copy, links and asset paths from the live page (checked 2026-10-07). */
import type {Block} from '@/components/blocks/Blocks'
import {book, instantPackage, premiumPackage, realEstateLogos, standardPackage, tour} from './shared'

export const meta = {
  title: 'Grow a Profitable Real Estate Photography Business | iGUIDE',
  description:
    'Capture once and deliver more with iGUIDE. Create virtual tours and accurate floor plans faster, reduce turnaround time and grow a profitable real estate photography business.',
  path: '/real-estate-photography',
}

const offer = (gets: string, why: string) => (
  <>
    <p>
      <strong>What the client gets:</strong> {gets}
    </p>
    <p>
      <strong>Why it helps you stand out:</strong> {why}
    </p>
  </>
)

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Grow a more profitable real estate photography business',
    subheading: 'Deliver higher-value listing assets for agents—without adding time, tools or complexity to your workflow.',
    ctas: [book(), {label: 'Watch testimonial', href: 'https://youtu.be/x9v7pueympg?si=kS2ccm6gQEEpjKd4', variant: 'secondary', newTab: true}],
    media: {
      type: 'embed',
      src: tour('https://youriguide.com/100_chattel_st_haverhill_ma?branded=1&autostart=1&nocontactform=1&bgcolor=FFFFFF'),
      title: 'iGUIDE 3D tour of 100 Chattel St, Haverhill MA',
    },
  },
  {type: 'logos', heading: 'Trusted by thousands of real estate photographers worldwide', logos: realEstateLogos},
  {
    type: 'cards',
    id: 'benefits',
    heading: 'Build a scalable, profitable photography workflow',
    subheading:
      'iGUIDE helps you deliver higher-value listing assets—including floor plans, virtual tours and Site Plans—while keeping your workflow simple and repeatable.',
    cards: [
      {
        title: 'Simple, repeatable capture workflow',
        text: 'Capture floor plans, Site Plans and visuals in a single visit using a consistent workflow you can rely on.',
        icon: {src: '/assets/Icons/camera-v2.png', alt: 'icon - camera'},
      },
      {
        title: 'Faster turnaround, less post',
        text: 'Spend less time stitching, editing and reworking files so you can deliver faster and take on more shoots each week.',
        icon: {src: '/assets/spend-less-time-on-site.svg', alt: 'icon - Stop Watch'},
      },
      {
        title: 'Stand out in listing presentations',
        text: 'Offer interactive floor plans, virtual tours and Site Plans that help agents stand out—and give you more to deliver.',
        icon: {src: '/assets/forensics.svg', alt: 'icon - Photos'},
      },
      {
        title: 'Support built for growing businesses',
        text: 'Access training, resources and support designed to help you price confidently, work faster and scale sustainably.',
        icon: {src: '/assets/Icons/photographers.png', alt: 'icon - photographers'},
      },
    ],
    after: (
      <p>
        <strong className="text-ink">One capture. Multiple deliverables. One scalable workflow.</strong> These offerings help you move beyond
        photos, differentiate your services and deliver higher-value listing assets with confidence.
      </p>
    ),
  },
  {
    type: 'quote',
    quote: {
      quote:
        'It used to take me over two-and-a-half hours to go into a home and just do measurements and manually insert them into floor plans. With iGUIDE, it was all so quick and easy. I’ve been able to grow my business by 375%, and the cost of the camera has paid for itself many times over.',
      name: 'Julie Pringle',
      role: 'Owner',
      company: 'Snap Commercial Photography',
      photo: {src: '/assets/Julie-Pringle.jpeg', alt: 'photo - Julie Pringle'},
    },
  },
  {
    type: 'split',
    heading: 'Tours show the home. Context helps you deliver more per shoot.',
    body: (
      <p>
        Interior tours show the home. Site Plans show how the home sits on the property—captured once and reused across deliverables, without
        adding time onsite.
      </p>
    ),
    listHeading: 'From the same source of truth, buyers get:',
    list: ['Fewer return visits or separate exterior captures', 'Fewer revisions and client follow-ups', 'Faster delivery with higher-value deliverables'],
    after: <p>One capture means fewer tools, less post-production, and the ability to deliver more on every job.</p>,
    ctas: [{label: 'Learn more about Site Plans', href: '/iguide/site-plans'}],
    media: {
      type: 'embed',
      src: tour('https://youriguide.com/334_south_lake_shore_drive_thousand_oaks?branded=1&minfp=1&autostart=1&bgcolor=FFFFFF'),
      title: 'iGUIDE tour with Site Plan of 334 South Lake Shore Drive, Thousand Oaks',
      aspect: 'aspect-[4/3]',
    },
  },
  {
    type: 'cards',
    id: 'offer',
    background: 'surface',
    heading: 'What real estate photographers can offer with iGUIDE—inside and out',
    subheading:
      'With iGUIDE, real estate photographers can bundle interactive virtual tours, accurate floor plans and Site Plans into high-value deliverables clients understand and use.',
    columns: 4,
    cards: [
      {
        title: 'Interactive 3D virtual tours',
        text: offer(
          'A walk-through experience that allows buyers to explore a property remotely.',
          'Positions you as a premium partner and keeps your work tied to the listing longer.',
        ),
      },
      {
        title: 'Accurate floor plans',
        text: offer(
          'Clear, easy-to-read floor plans with room dimensions and square footage.',
          'Adds credibility and trust while staying aligned with immersive tours and exterior Site Plans.',
        ),
      },
      {
        title: 'Property measurements',
        text: offer(
          'Reliable measurements for planning, marketing and property comparisons.',
          'Reduces guesswork and positions you as more than just a photographer.',
        ),
      },
      {
        title: 'Single-visit capture',
        text: offer(
          'Virtual tours, floor plans, Site Plans and data captured in one efficient visit.',
          'Saves time on site, shortens turnaround and makes your workflow easier to scale.',
        ),
      },
    ],
  },
  {
    type: 'cards',
    id: 'how-photographers-use-iguide',
    heading: 'How real estate photographers use iGUIDE',
    subheading:
      'Deliver listing-ready interior and exterior assets—including floor plans, measurements, virtual tours, and Site Plans—from a single capture.',
    columns: 2,
    cards: [
      {
        title: 'Capture all deliverables in one visit',
        text: 'Deliver floor plans, measurements, virtual tours and exterior Site Plans in a single on-site capture to support listings, marketing, and client needs.',
      },
      {
        title: 'Deliver assets realtors actually use',
        text: 'Provide listing-ready visuals that include interior clarity and exterior context, helping realtors market properties, win listings and keep coming back to you.',
      },
    ],
  },
  {
    type: 'packages',
    id: 'packages',
    background: 'surface',
    heading: 'Find the right iGUIDE package for your services',
    subheading: 'Compare iGUIDE options to match different property types and client needs.',
    items: [instantPackage, standardPackage, premiumPackage],
  },
  {
    type: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        q: 'What is iGUIDE and how does it work?',
        a: 'iGUIDE is a capture and delivery system designed for real estate photographers. Using the iGUIDE PLANIX camera system, you capture a property in one visit and receive interactive 3D virtual tours, accurate floor plans, and measurements that are ready to share with clients.',
      },
      {
        q: 'What are the benefits of using iGUIDE for real estate photography?',
        a: 'iGUIDE helps real estate photographers deliver more value without adding complexity. You can capture once, reduce time on site, speed up turnaround and offer bundled deliverables that help you stand out, price confidently and build stronger relationships with realtors.',
      },
      {
        q: 'How fast is the iGUIDE PLANIX camera system’s rate of capture?',
        a: "The iGUIDE PLANIX camera system's rate of capture is exceptionally fast, with arguably the fastest capture time in the 3D modeling space. With a 10-16 second scan time, a property of 3,000 sq ft can be completed in as little as 20 minutes.",
      },
      {
        q: 'How long does it take to create an iGUIDE for a property?',
        a: (
          <>
            <p>
              The time required to create an iGUIDE for a property depends on the size and complexity of the property. On average you can capture
              a 3,000 sq ft space in as little as 20 minutes.
            </p>
            <p>
              However, in general, the process of capturing images and generating the 3D tour and floor plans can typically be completed within a
              few hours. After that, the iGUIDE is processed and ready to be shared within 24 hours.
            </p>
          </>
        ),
      },
      {
        q: 'What is the turnaround time for iGUIDE?',
        a: 'Your iGUIDE floor plans are drafted and 3D virtual tours are delivered within 24 hours after uploading your data to the iGUIDE Portal.',
      },
      {
        q: 'Are there hosting fees associated with iGUIDE?',
        a: (
          <p>
            iGUIDE uses simple, <a href="/pricing">pay-per-project pricing</a>. There are no required subscriptions or ongoing hosting fees,
            allowing real estate photographers to control costs and pay only for the projects they deliver.
          </p>
        ),
      },
      {
        q: 'Are there any ongoing costs associated with using the iGUIDE PLANIX camera system?',
        a: 'Beyond per-project processing, there are no mandatory recurring fees. This makes it easier for real estate photographers to calculate ROI, price their services confidently, and scale their business without unexpected expenses.',
      },
      {
        q: 'Can iGUIDE be integrated with other real estate marketing platforms?',
        a: (
          <p>
            Yes. iGUIDE virtual tours and floor plans are designed to fit seamlessly into common{' '}
            <a href="/iguide/integrations">real estate marketing workflows</a>, making it easy to share assets alongside listings, websites, and
            other client-facing tools.
          </p>
        ),
      },
      {
        q: 'Does the iGUIDE PLANIX camera system work in exterior spaces?',
        a: 'The iGUIDE PLANIX camera system is optimized for interior spaces, where it delivers the most accurate floor plans and measurements. Exterior documentation has different requirements, and support for exterior spaces depends on the specific use case and output needed within the iGUIDE ecosystem.',
      },
      {
        q: 'How does iGUIDE capture and deliver property context inside and out?',
        a: (
          <>
            <p>
              iGUIDE captures both interior and exterior property context from a single visit. In addition to immersive interior tours and floor
              plans, Site Plans show how the home sits on the property and how interior and exterior spaces connect.
            </p>
            <p>
              This allows real estate photographers to deliver listing-ready assets that provide full property context—without requiring separate
              tools, workflows, or return visits.
            </p>
          </>
        ),
      },
    ],
  },
  {
    type: 'cta',
    heading: 'Grow your real estate photography business with iGUIDE',
    text: 'See how iGUIDE fits into your workflow to help you deliver more value, stand out to realtors and scale your services.',
    ctas: [book('Book a 15-minute walkthrough')],
  },
]
