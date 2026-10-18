/** /how-to-build-a-thriving-real-estate-photography-business-in-2025 — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {CheckList} from '@/components/blocks/CheckList'
import {HeroFormColumns} from '@/components/pages/HeroFormColumns'

export const meta = {
  title: 'Watch on-demand: 2025 Real Estate Photography Business Webinar | iGuide',
  description:
    "In this 1-hour webinar experts share real strategies to land clients, shoot smarter and earn more, whether you're just starting out or ready to scale.",
  path: '/how-to-build-a-thriving-real-estate-photography-business-in-2025',
  ogImage: '/assets/Picture_Profits_1280x400-Export-V2-2.jpg',
}

const speaker = (role: string, bio: string) => (
  <>
    <span className="block font-semibold text-muted">{role}</span>
    <span className="mt-3 block">{bio}</span>
  </>
)

export const blocks: Block[] = [
  {
    type: 'custom',
    background: 'surface',
    children: (
      <HeroFormColumns
        heading="Watch on-demand:"
        subheading="How to build a thriving real estate photography business in 2025"
        formHeading="Don’t miss out: access the webinar instantly"
        formId="b6b81548-b9c5-48f7-b340-41de91873ef8"
      />
    ),
  },
  {
    type: 'cards',
    heading: 'Meet the speakers',
    subheading: 'Real experts. Real experience.',
    align: 'center',
    columns: 3,
    cards: [
      {
        title: 'Alex Coombs',
        image: {src: '/assets/Uploads/a.png', alt: ''},
        text: speaker(
          'Founder & President at Northern Spruce Media',
          'Alex turned her love for photography and teaching into a thriving media business that helps agents market homes with purpose.',
        ),
      },
      {
        title: 'Jonathan Lee',
        image: {src: '/assets/Uploads/j.png', alt: ''},
        text: speaker(
          'J.W.Lee Media & Pres. North Florida Photographers',
          'Former Navy mechanic turned real estate media pro, Jonathan captures spaces with clarity, detail, and purpose.',
        ),
      },
      {
        title: 'Chris White',
        image: {src: '/assets/Uploads/chris.png', alt: ''},
        text: speaker(
          'Product Marketing Manager',
          'Seasoned photographer and gear junkie, Chris champions the needs of real estate photographers at iGuide.',
        ),
      },
    ],
  },
  {
    type: 'custom',
    background: 'sky',
    heading: 'Built for real estate photographers like you...',
    children: (
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="text-2xl font-semibold text-ink">Here’s why you don’t want to miss it</h3>
          <p className="mt-4 text-lg leading-7 text-body">
            This isn’t your typical “how to get started” webinar. It’s a real-world session for real estate photographers who want to scale a
            business that’s creative, client-focused, and built to last.
          </p>
          <CheckList
            className="mt-6"
            items={[
              'Streamline your photography business operations',
              'Win more clients through relationship-based marketing',
              'Future-proof your services with 3D tours and floor plans',
              'Capture high-quality, listing photos that help homes sell faster',
              'Make confident decisions about your pricing, branding, and offerings',
              'Avoid mistakes that make buyers wonder, “Wait, is that the same house?”',
            ]}
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-ink">Is this for you?</h3>
          <div className="mt-4 space-y-4 text-lg leading-7 text-body">
            <p>
              Whether you’re just getting started or already shooting 100+ listings a year, this session is packed with tools, tactics, and real
              talk to help you grow and stand out.
            </p>
            <p>
              If you&apos;re aiming to attract better clients, sharpen your services, or stay competitive with the right tools and strategies,
              you’ll walk away with fresh ideas and practical insights you can use right away.
            </p>
          </div>
        </div>
      </div>
    ),
  },
]
