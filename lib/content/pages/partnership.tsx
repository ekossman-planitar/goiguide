/** /partnership — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {CheckList} from '@/components/blocks/CheckList'
import {HeroColumns} from '@/components/pages/HeroColumns'

export const meta = {
  title: 'Dream Big, Earn Bigger - Become an iGuide Partner Now | iGuide',
  description: 'Make your business dreams come true as an iGuide Partner. Join our partner program today and start earning what you deserve!',
  path: '/partnership',
}

/** "Request to join" HubSpot form (inline on live, and in the pop-up opened by the Partner Program banner button) */
const PARTNER_FORM_ID = 'd798b8e8-6887-49df-9378-a24e0a6b2069'

const icon = (src: string) => ({src, alt: '', width: 60, height: 60})

export const blocks: Block[] = [
  {
    type: 'custom',
    children: (
      <HeroColumns
        heading="Turn your passion into revenue"
        aside={
          <div id="request-to-join" className="scroll-mt-28 rounded-2xl bg-surface p-8">
            <h2 className="type-h2 pb-6 text-ink">Request to join</h2>
            <HubSpotForm formId={PARTNER_FORM_ID} />
          </div>
        }
      >
        <h2 className="type-heading-lg form-title text-ink">Grow your business by partnering with iGuide</h2>
        <p>
          Are you interested in expanding your product offering and growing your business? iGuide is actively seeking partners across the globe to
          join our network as part of our Affiliate and Reseller programs.
        </p>
        <p>Interested in learning more? Contact an iGuide professional today!</p>
      </HeroColumns>
    ),
  },
  {
    type: 'cards',
    id: 'why-iguide',
    heading: 'Why choose iGuide?',
    align: 'center',
    background: 'surface',
    columns: 3,
    cards: [
      {
        title: 'Potential increased revenue',
        text: 'Partnering with iGuide means a potential increase in revenue for your business. As a partner, you’ll also enjoy exclusive discounts and benefits.',
        icon: icon('/assets/Uploads/Icons_Revenue-Growth__FitMaxWzYwLDYwXQ.png'),
      },
      {
        title: 'Library of resources',
        text: 'Gain access to a wealth of tools designed to support your sales efforts including sales enablement materials.',
        icon: icon('/assets/Uploads/Icons-_Detailed-Reports__FitMaxWzYwLDYwXQ.png'),
      },
      {
        title: 'Dedicated support',
        text: 'Connect with our best-in-class support team and get equipped with valuable resources, instructional videos and dedicated assistance to ensure your success.',
        icon: icon('/assets/Uploads/Icons_Support__FitMaxWzYwLDYwXQ.png'),
      },
      {
        title: 'Marketing tools',
        text: 'Seize the chance to be showcased in co-branded social content, tap into our collection of iGuide branded assets, utilize templated emails and content and elevate your marketing efforts.',
        icon: icon('/assets/Uploads/Icons_Marketing-tools__FitMaxWzYwLDYwXQ.png'),
      },
      {
        title: 'Inside access',
        text: 'Join us in shaping iGuide innovation. Participate in technology and hardware testing, provide valuable feedback and enjoy partner discounts.',
        icon: icon('/assets/Uploads/Icons_Troubleshooting__FitMaxWzYwLDYwXQ.png'),
      },
    ],
  },
  {
    type: 'custom',
    id: 'programs',
    heading: 'Which program is right for you?',
    align: 'center',
    children: (
      <div className="grid gap-6 md:grid-cols-2 lg:gap-16">
        <div className="rounded-2xl bg-surface p-8">
          <h3 className="type-heading-md text-ink">Affiliate Program</h3>
          <p className="mt-2 text-lg leading-7 text-body">For iGuide enthusiasts looking to grow their business without carrying inventory.</p>
          <CheckList
            className="mt-6"
            items={[
              'Branded tracking code',
              'No inventory to manage',
              'Landing page framework',
              'Dedicated support',
              'Digital marketing materials',
              'Guest blogging opportunities',
            ]}
          />
        </div>
        <div className="rounded-2xl bg-surface p-8">
          <h3 className="type-heading-md text-ink">Reseller Program</h3>
          <p className="mt-2 text-lg leading-7 text-body">An excellent opportunity for businesses with an established storefront.</p>
          <CheckList
            className="mt-6"
            items={[
              'Inventory control',
              'Feature iGuide in your product line-up/catalog',
              'Cobranded reseller marketing library',
              'Dedicated support',
              'Guest blogging opportunities',
              'Promotional assets',
            ]}
          />
        </div>
      </div>
    ),
  },
  {
    type: 'split',
    id: 'partner-program',
    heading: 'Partner Program',
    body: <p>To join the program, simply fill out the form below and speak with an iGuide Specialist. It’s that easy!</p>,
    // Live: this button opens the same HubSpot form in a pop-up; here it jumps to the form at the top of the page
    ctas: [{label: 'Request to join', href: '#request-to-join'}],
    media: {type: 'image', image: {src: '/assets/Uploads/Order-iGUIDE-Store-CTA.png', alt: '', width: 1600, height: 800}},
    mediaClassName: 'rounded-2xl',
    background: 'sky',
  },
]
