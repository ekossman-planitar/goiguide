/** /get-iguide/iguide/lead-magnet — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {MediaView} from '@/components/blocks/MediaView'
import {FormDialogButton} from '@/components/pages/FormDialogButton'
import {FallbackImage} from '@/components/ui/FallbackImage'

export const meta = {
  title: 'Experience iGuide: Precise floor plans & 3D virtual tours made easy | iGuide',
  description:
    'Quickly create 3D virtual tours, CAD floor plans and 3D models with the iGuide PLANIX camera system. Take 360° photos and 1,000s of measurements in minutes, capturing rich property data.',
  path: '/get-iguide/iguide/lead-magnet',
}

const findProvider = {label: 'Find an iGuide Service Provider', href: 'https://ion.goiguide.com/', newTab: true}

/** Live "Learn more" buttons open this HubSpot form in a pop-up */
const learnMore = (variant: 'primary' | 'secondary') => (
  <FormDialogButton label="Learn more" title="Start generating more leads today" formId="701e7e0e-3b71-4c20-9d44-f6de1f5a0ff6" variant={variant} />
)

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'A 24/7 virtual open house',
    subheading: 'Turn your 3D Tour into a lead capture machine!',
    extra: (
      <div className="mt-4 flex flex-wrap gap-3">
        <CtaButtons ctas={[findProvider]} />
        {learnMore('secondary')}
      </div>
    ),
    media: {type: 'video', src: '/assets/Uploads/iGUIDE-Lead-Magnet-2.mp4', label: 'iGuide Lead Magnet video'},
  },
  {
    type: 'logos',
    logos: [
      {src: '/assets/Uploads/Scrolling-LogosVisual.png', alt: ''},
      {src: '/assets/Uploads/Scrolling-LogosRemax.png', alt: ''},
      {src: '/assets/Uploads/Scrolling-LogosRoyalLePage.png', alt: ''},
      {src: '/assets/Uploads/Scrolling-LogosKW.png', alt: ''},
      {src: '/assets/Uploads/Scrolling-LogosPrepTours.png', alt: ''},
      {src: '/assets/Uploads/look-v2.png', alt: ''},
    ],
  },
  {
    type: 'cards',
    heading: 'Why use iGuide Lead Magnet?',
    align: 'center',
    columns: 3,
    cards: [
      {
        title: 'Lead gen',
        text: 'Interested prospects can connect with you directly via your iGuide 3D Virtual Tour.',
        icon: {src: '/assets/Icons/Icon-Master_300x300_Value_Content-delivery-system__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Real-time feedback',
        text: 'Level up your listing reports and include real-time feedback from buyers.',
        icon: {src: '/assets/Icons/Icon_300x300_Reseller_Marketing-tools__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
      {
        title: 'Easy access',
        text: 'Boost your digital footprint, making your online listing more discoverable to potential buyers.',
        icon: {src: '/assets/Icons/Icon-300x300_Superior-Navigation__FitMaxWzYwLDYwXQ.png', alt: ''},
      },
    ],
    after: <h3 className="text-2xl font-semibold text-ink">The best part? It’s INSTANT!</h3>,
  },
  {
    type: 'custom',
    background: 'surface',
    children: (
      <div className="mx-auto max-w-4xl">
        <MediaView media={{type: 'embed', src: 'https://www.youtube.com/embed/AzHvyH_otyU?si=R86S0_Dc0GWw-eYz', title: 'iGuide Lead Magnet video'}} />
      </div>
    ),
  },
  {
    type: 'steps',
    heading: 'How it works',
    subheading:
      'The iGuide Lead Magnet is a quick and simple way to connect with interested buyers and prospects. It instantly captures their details and makes the connection.',
    steps: [
      {
        title: 'Connect',
        body: 'Your iGuide Service Provider creates two views of your iGuide 3D Virtual Tour (teaser and detailed).',
        image: {src: '/assets/Uploads/2536825a-5c9e-41a6-bb61-0e810681a7b0.jpg', alt: ''},
      },
      {
        title: 'Get leads',
        body: 'Prospects are shown the iGuide teaser view and complete the form to request access to the detailed view.',
        image: {src: '/assets/Uploads/b19c6449-53f1-4923-a67d-c3576e343345.jpg', alt: ''},
      },
      {
        title: 'Close deals',
        body: 'Leads are delivered to your inbox without having to lift a finger.',
        image: {src: '/assets/3-clients.jpg', alt: ''},
      },
    ],
  },
  {
    type: 'cta',
    heading: 'Find an iGuide Service Provider',
    text: 'Ready to experience the power of iGuide? Connect with an iGuide Service Provider to get started.',
    ctas: [{label: 'Find an iGuide Service Provider', href: 'https://ion.goiguide.com/'}],
  },
  {
    type: 'custom',
    children: (
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <h2 className="text-balance text-[32px] font-semibold leading-[normal] text-ink md:text-5xl md:leading-[normal]">Your lead generation machine</h2>
          <p className="mt-5 text-lg leading-7 text-body">
            We&apos;ve built it with you in mind. During peak seasons, use the automated response to provide everything they need without missing
            a beat. Buyers have the information they’re looking for in seconds and an introduction is made each time!
          </p>
          <div className="mt-8">{learnMore('primary')}</div>
        </div>
        <div className="relative min-w-0">
          <FallbackImage src="/assets/Uploads/house_2.jpg" alt="" width={1200} height={900} className="h-auto w-full rounded-2xl" />
          <FallbackImage
            src="/assets/Uploads/laptop.png"
            alt=""
            width={800}
            height={500}
            className="absolute right-[-4%] bottom-[-8%] h-auto w-[60%] drop-shadow-xl"
          />
        </div>
      </div>
    ),
  },
  {
    type: 'custom',
    background: 'sky',
    children: (
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <h2 className="text-balance text-[32px] font-semibold leading-[normal] text-ink md:text-5xl md:leading-[normal]">Download our Free Brochure:</h2>
          <p className="mt-4 text-xl leading-[30px] text-muted">Start generating more leads today</p>
          <div className="mt-8">
            <FormDialogButton label="Get the brochure" title="Download our free brochure" formId="1b53d8ab-4d1d-47b7-8d15-2b0e38f94053" />
          </div>
        </div>
        <FallbackImage src="/assets/lead-magnet.jpg" alt="" width={1200} height={800} className="h-auto w-full rounded-2xl" />
      </div>
    ),
  },
  {
    type: 'quotes',
    heading: 'Trusted by industry professionals',
    align: 'center',
    background: 'surface',
    quotes: [
      {
        quote:
          'It used to take me over two-and-a-half hours to go into a home and just do measurements and manually insert them into floor plans. But, with iGuide, it was all so quick and easy. I have been able to grow my business by a whopping 375% using iGuide, and the cost of the camera has paid for itself a hundredfold, many times over!',
        name: 'Julie Pringle',
        company: 'Snap Photography',
        logo: {src: '/assets/Uploads/Tetsimonial-Logo-Snap-Photo.png', alt: ''},
      },
      {
        quote:
          'Even after working day & night, I was unable to grow my business. With the hours I was working, it was just not scalable. That is when I came across Planitar and decided to buy an iGuide Camera. I am six times faster than before, the market is huge, and with iGuide by my side, I know I’m ready for it.',
        name: 'Alden Morris',
        company: 'Alden Morris Photo',
        logo: {src: '/assets/Uploads/Tetsimonial-Logo-Alden-Morris.png', alt: ''},
      },
      {
        quote:
          'Can you imagine the industry and an industry player moving in opposite directions? Well, that’s exactly what iGuide did to my business. Even during the Real Estate downturn in 2018, I saw a stupendous 255% upward growth. My clients absolutely loved what I was able to offer - great photography, immersive virtual tours, and that too, with a turnaround of fewer than 24 hours. It is a winning combination!',
        name: 'Kyle Ketchel',
        company: 'Visual Properties LLC',
        logo: {src: '/assets/Uploads/Tetsimonial-Logo-Visual-Properties.png', alt: ''},
      },
      {
        quote:
          "Adding iGuide virtual tours has helped my Realtor clients sell more properties, save more time by showing fewer properties that fit home buyer's needs that they are excited to see and separate themselves from their competition when doing listing presentations.",
        name: 'Paul Maynard',
        company: 'Colorful Virtual Tours',
        logo: {src: '/assets/Uploads/Tetsimonial-Logo-Colorful-Virtual-Tours.png', alt: ''},
      },
      {
        quote: 'I do photos and iGuide 3D tour with floor plan for almost every single listing I do. So, it gives me more revenue.',
        name: 'Todd Wasylyshyn',
        company: 'Nanaimo Photography',
        logo: {src: '/assets/Uploads/Tetsimonial-Logo-Nanaimo-Photo.png', alt: ''},
      },
      {
        quote:
          "I don't want to go to eight houses and shoot photos, I want to go to three houses and shoot photos and video. Now I do more per house and less traveling and bigger invoices.",
        name: 'Fred Light',
        company: 'Nashua Video Tours',
        logo: {src: '/assets/Uploads/Tetsimonial-Logo-Nashua-Video-Tours.png', alt: ''},
      },
    ],
  },
]
