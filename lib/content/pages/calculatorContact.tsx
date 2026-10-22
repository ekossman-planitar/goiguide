/** /calculator-contact — copy, links and asset paths from the live page (checked 2026-10-21). */
import type {Block} from '@/components/blocks/Blocks'
import type {Quote} from '@/components/blocks/Testimonials'

export const meta = {
  title: 'Questions? iGuide Contact Info is Just a Click Away! | iGuide',
  description: 'Got Questions? Our iGuide experts are here to help. Click for quick answers and contact info. Your inquiries matter to us!',
  path: '/calculator-contact',
}

const icon = (src: string) => ({src, alt: '', width: 60, height: 60})
const logo = (file: string, alt: string, width: number) => ({src: `/assets/Uploads/Tetsimonial-Logo-${file}.png`, alt, width, height: 44})

const quotes: Quote[] = [
  {
    quote:
      'I can confidently say that the iGuide technology has given Deft a huge competitive advantage. Even a very good adjuster who knows how to use a laser can’t match the accuracy we’ll get from iGuide. Simply seeing how much value it’s brought to Deft, we fell in love with it!',
    name: 'Jeremiah Kiefer',
    role: 'Founder & CEO',
    company: 'The Deft Group',
    logo: logo('Deft', 'logo - Deft Group', 109),
  },
  {
    quote:
      'It used to take me over two-and-a-half hours to go into a home and just do measurements and manually insert them into floor plans. But, with iGuide, it was all so quick and easy. I have been able to grow my business by a whopping 375% using iGuide, and the cost of the camera has paid for itself a hundredfold, many times over!',
    name: 'Julie Pringle',
    company: 'Snap Photography',
    logo: logo('Snap-Photo', 'Snap Photography', 170),
  },
  {
    quote:
      'Adding iGuide virtual tours has helped my Realtor clients sell more properties, save more time by showing fewer properties that fit home buyer’s needs that they are excited to see and separate themselves from their competition when doing listing presentations.',
    name: 'Paul Maynard',
    company: 'Colorful Virtual Tours',
    logo: logo('Colorful-Virtual-Tours', 'Colorful Virtual Tours', 163),
  },
  {
    quote:
      'Upon our introduction with the iGuide platform we were immediate blown away by the innovative technology, never seen before in the marketplace. iGuide provided our team with great efficiency in the overall process, allowing us to invest our time and focus in better servicing our clients.',
    name: 'Cliff Rego',
    company: 'Cliff Rego Team, Rego Realty Inc.',
    logo: logo('Rego-Realty', 'Rego Realty Inc.', 95),
  },
  {
    quote: 'If time is money, which it is, I am saving beyond the costs of a draftsman when it comes to creating As-Built drawings [using iGuide].',
    name: 'Joe Levitch',
    role: 'President',
    company: 'Levco Builders',
    logo: logo('Levco', 'Levco Builders', 86),
  },
]

const contacts: {heading: string; lines: string[]}[] = [
  {heading: 'Headquarters', lines: ['560 Parkside Drive, Unit 401', 'Waterloo, ON, Canada N2L 5Z4']},
  {heading: 'General Inquiries & Sales', lines: ['1-844-568-1723', 'Mon–Fri: 9AM–5PM ET']},
  {heading: 'iGuide Operator Support', lines: ['1-855-505-1723', 'Mon–Sat: 9AM–5PM ET']},
]

export const blocks: Block[] = [
  {
    type: 'hero',
    heading: 'Enter a new dimension',
    subheading: 'Connect with an iGuide Specialist and unlock the potential for your business',
    media: {type: 'image', image: {src: '/assets/Uploads/Contact-Header-Image.png', alt: '', width: 1600, height: 800}},
  },
  {
    type: 'cards',
    heading: 'Increase the value of your services',
    subheading: 'By implementing iGuide you can impress clients with streamlined service and communication, reduce time spent on-site and boost revenue.',
    align: 'center',
    background: 'surface',
    columns: 4,
    cards: [
      {title: 'Fast', text: '3D virtual tours and 2D floor plans', icon: icon('/assets/Uploads/Icons_Processing-Time__FitMaxWzYwLDYwXQ.png')},
      {title: 'Accurate', text: 'Measurement within 0.5%', icon: icon('/assets/Uploads/Icons-Floor-Plans__FitMaxWzYwLDYwXQ.png')},
      {title: 'Reliable', text: 'Easy one-button capture', icon: icon('/assets/Uploads/Icons_Reliable__FitMaxWzYwLDYwXQ.png')},
      {title: 'Secure', text: 'You control your data', icon: icon('/assets/Uploads/Icons_Secure__FitMaxWzYwLDYwXQ.png')},
    ],
  },
  {
    type: 'custom',
    id: 'meet',
    children: (
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div>
          <h2 className="text-balance text-[32px] leading-[normal] font-semibold text-ink md:text-5xl md:leading-[normal]">
            For specific questions, get in touch below
          </h2>
          <dl className="mt-8 space-y-6 text-lg leading-7 text-body">
            {contacts.map((c) => (
              <div key={c.heading}>
                <dt className="font-semibold text-ink">{c.heading}</dt>
                {c.lines.map((line) => (
                  <dd key={line}>{line}</dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
        <div className="min-w-0">
          <h2 className="mb-6 text-[28px] leading-tight font-semibold text-ink md:text-[32px]">Meet with an iGuide Specialist</h2>
          {/* HubSpot meetings booking calendar (live: HubSpot's meetings embed script) */}
          <iframe
            src="https://meetings.planitar.com/meetings/iguidesales/meet-with-iguide?embed=true"
            title="Book a time with an iGuide Specialist"
            className="h-[690px] w-full rounded-2xl border border-line bg-white"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {type: 'quotes', heading: 'Trusted by industry professionals', align: 'center', background: 'surface', quotes},
]
