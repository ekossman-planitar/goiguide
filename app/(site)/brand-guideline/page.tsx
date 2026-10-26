import {
  Archive,
  Award,
  CalendarDays,
  Camera,
  Check,
  Clock,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Heart,
  MapPin,
  Mic,
  Play,
  Search,
  Share2,
  Store,
  Ticket,
  Users,
  X,
  ZoomIn,
  type LucideIcon,
} from 'lucide-react'
import type {Metadata} from 'next'
import Image from 'next/image'
import type {ReactNode} from 'react'
import {CardGrid} from '@/components/blocks/CardGrid'
import {CheckList} from '@/components/blocks/CheckList'
import {PillTabs} from '@/components/blocks/PillTabs'
import {Section} from '@/components/blocks/Section'
import {Testimonials} from '@/components/blocks/Testimonials'
import {ResourceCard} from '@/components/resources/ResourceCard'
import {SelectDemos} from '@/components/pages/BrandGuideDemos'
import {Button, buttonClass} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {Pill} from '@/components/ui/Pill'
import {QuoteMark} from '@/components/ui/QuoteMark'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight, ChevronDown, ChevronLeft, ChevronRight, CloseIcon, MenuIcon, Star} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {pageMetadata} from '@/lib/pageMetadata'
import {fetchSanity} from '@/sanity/lib/fetch'
import {RESOURCES_OF_TYPE_QUERY} from '@/sanity/lib/queries'
import type {ResourceCardData} from '@/sanity/lib/types'

/** Internal reference page: never indexed, not in the sitemap (Evan, 2026-10-23). */
export const metadata: Metadata = {
  ...pageMetadata({title: 'Brand guideline | iGuide', path: '/brand-guideline'}),
  robots: {index: false, follow: false},
}

const nav = [
  ['principles', 'Principles'],
  ['logo', 'Logo'],
  ['colour', 'Colour'],
  ['type', 'Typography'],
  ['layout', 'Layout & spacing'],
  ['buttons', 'Buttons'],
  ['links', 'Links'],
  ['pills', 'Pills'],
  ['tabs', 'Tabs'],
  ['forms', 'Forms & dropdowns'],
  ['accordions', 'Accordions'],
  ['cards', 'Cards'],
  ['quotes', 'Quotes'],
  ['icons', 'Icons'],
  ['states', 'States & motion'],
  ['accessibility', 'Accessibility'],
  ['resources', 'Resources'],
] as const

const principleList = [
  'Design values: clarity, simplicity, efficiency, honest design and empathy (from the iGuide Foundations design system).',
  'REA Pangea is the only typeface, everywhere: headings, body, buttons and HubSpot forms.',
  'Snowgum 700 is the “black”. Red is for accents only: every hover and active highlight is REA Red.',
  'One way to do each thing: one button set, one tab style, one dropdown, one accordion, one card.',
  'Sentence case for headings and buttons. Buttons start with a verb and are 2 to 4 words.',
  'Plain links in sentences are underlined. Standalone text links are not; they carry an arrow.',
  'Everything clickable shows a hand cursor and a visible focus outline for keyboard users.',
  'White and Mist sections alternate; never two Mist sections in a row.',
  'Avoid introducing additional red elements that compete with the primary red brand mark. Reserve red for key highlights to maintain visual hierarchy.',
  'Preserve the existing WCAG accessibility notes throughout the design system.',
  'Use WCAG 2.2 as the baseline for design decisions, particularly when evaluating visual treatments or proposed styling changes.',
  'Ensure text links, colour contrast, focus states and other interactive elements meet accessibility requirements.',
]
const principles = [principleList.slice(0, 6), principleList.slice(6)]

/** Lucide icons the site uses today (the wrappers in components/ui/icons are Lucide too) */
const iconSet: [string, LucideIcon | typeof ArrowRight][] = [
  ['Arrow', ArrowRight],
  ['Chevron down', ChevronDown],
  ['Chevron left', ChevronLeft],
  ['Chevron right', ChevronRight],
  ['Menu', MenuIcon],
  ['Close', CloseIcon],
  ['Check', Check],
  ['Cross', X],
  ['Search', Search],
  ['Zoom', ZoomIn],
  ['Download', Download],
  ['Copy', Copy],
  ['External link', ExternalLink],
  ['Calendar', CalendarDays],
  ['Time', Clock],
  ['Location', MapPin],
  ['Language', Globe],
  ['Play', Play],
  ['Document', FileText],
  ['Archive', Archive],
  ['Camera', Camera],
  ['Store', Store],
  ['Ticket', Ticket],
  ['Speaker', Mic],
  ['People', Users],
  ['Award', Award],
  ['Share', Share2],
  ['Favourite', Heart],
  ['Rating', Star],
]

const colours = [
  {
    name: 'REA Red',
    token: 'primary-hover / rea-red',
    hex: '#E4002B',
    use: 'Hover and active highlights, quote marks, required-field marks. Accents only, never large areas.',
    swatch: 'bg-rea-red',
  },
  {
    name: 'Snowgum 700',
    token: 'primary / ink / body',
    hex: '#2E2C30',
    use: 'Buttons, links, headings and body text. The default “black”.',
    swatch: 'bg-snowgum-700',
  },
  {name: 'Snowgum 400', token: 'muted', hex: '#716E75', use: 'Secondary text: subheadings, captions, roles, form field borders.', swatch: 'bg-snowgum-400'},
  {name: 'White', token: 'white', hex: '#FFFFFF', use: 'Page and card background.', swatch: 'bg-white border border-line'},
  {name: 'Mist', token: 'surface / sky / cream', hex: '#F3F2F5', use: 'Alternating section background, pills, tab tracks, step badges.', swatch: 'bg-mist'},
  {
    name: 'Hairline',
    token: 'line',
    hex: '#E4E4E7',
    use: 'Website only: borders and dividers. Not part of the brand palette, so never use it in print or other brand work.',
    websiteOnly: true,
    swatch: 'bg-line',
  },
  {name: 'Blueprint', token: 'blueprint', hex: '#5B8FDB', use: 'Secondary palette: charts and illustrations only.', swatch: 'bg-blueprint'},
  {name: 'Laser', token: 'laser', hex: '#9FD356', use: 'Secondary palette: charts and illustrations only.', swatch: 'bg-laser'},
  {name: 'Slate', token: 'slate', hex: '#3E5C76', use: 'Secondary palette: charts and illustrations only.', swatch: 'bg-slate'},
  {
    name: 'Error',
    token: 'error',
    hex: '#B42318',
    use: 'Website only: form error messages and invalid fields. Not part of the brand palette.',
    websiteOnly: true,
    swatch: 'bg-error',
  },
  {name: 'Star', token: 'star', hex: '#F59E0B', use: 'Website only: review stars. Not part of the brand palette.', websiteOnly: true, swatch: 'bg-star'},
]

const typeScale = [
  {cls: 'type-display', size: '40 → 56px', lh: '1.15', use: 'Page title in a hero (h1). One per page.', sample: 'Accurate floor plans & 3D tours'},
  {cls: 'type-title', size: '36 → 48px', lh: '1.2', use: 'Page title on text-led pages: legal, Help Center, articles, events (h1).', sample: 'Terms of use'},
  {cls: 'type-h2', size: '32 → 48px', lh: '1.2', use: 'Section heading (h2). Always through <SectionHeading> / <Section>.', sample: 'How iGuide works'},
  {
    cls: 'type-heading-lg',
    size: '28 → 32px',
    lh: '1.25',
    use: 'Heading inside a banner or panel: closing CTA, Help CTA, pop-ups.',
    sample: 'Ready to get started?',
  },
  {cls: 'type-heading-md', size: '24 → 28px', lh: '1.3', use: 'Sub-section heading, form title, group of cards.', sample: 'Book a product tour'},
  {cls: 'type-heading-sm', size: '20px', lh: '28px', use: 'Card title, footer column heading.', sample: 'Floor plans'},
  {cls: 'type-heading-xs', size: '18px', lh: '28px', use: 'Accordion question, list item title.', sample: 'How accurate is iGuide?'},
  {
    cls: 'type-lead',
    size: '20px',
    lh: '30px',
    use: 'Subheading under an h1 or h2 (Snowgum 400).',
    sample: 'One sentence that explains the heading above it.',
  },
  {cls: 'type-body', size: '16px', lh: '24px', use: 'All body copy.', sample: 'Every iGuide includes a 3D virtual tour.'},
  {
    cls: 'type-small',
    size: '14px',
    lh: '20px',
    use: 'Form labels, legal notes, captions under media, card meta.',
    sample: 'Prices in CAD/USD exclude applicable taxes.',
  },
  {cls: 'type-caption', size: '12px', lh: '18px', use: 'Pills and tiny labels only.', sample: 'New: Site Plans'},
  {cls: 'type-overline', size: '14px caps', lh: '20px', use: 'Small group label above a list (Snowgum 400).', sample: 'Resources'},
]

function Demo({label, children, className}: Readonly<{label: string; children: ReactNode; className?: string}>) {
  return (
    <div className={cn('rounded-2xl border border-line bg-white p-6 shadow-card', className)}>
      <p className="type-overline mb-4 text-muted">{label}</p>
      {children}
    </div>
  )
}

function Spec({children}: Readonly<{children: ReactNode}>) {
  return <p className="type-small mt-3 text-muted">{children}</p>
}

export const revalidate = 60

export default async function BrandGuidelinePage() {
  // Three newest blog posts, shown with the real blog card
  const posts = (await fetchSanity<ResourceCardData[]>(RESOURCES_OF_TYPE_QUERY, [], {type: 'blogPost'})).slice(0, 3)
  return (
    <>
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <Pill label="Internal reference · not indexed" tone="white" />
          <h1 className="type-display mt-6 text-ink">iGuide brand guideline</h1>
          <p className="type-lead mt-4 max-w-3xl text-muted">
            How goiguide.com looks and behaves: colour, type, layout and every shared component, shown with the real components. If something on the site
            differs from this page, this page wins.
          </p>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
            {nav.map(([id, label]) => (
              <SmartLink
                key={id}
                href={`#${id}`}
                className="type-small rounded-[28px] bg-white px-3 py-2 font-semibold text-ink transition-colors hover:text-primary-hover"
              >
                {label}
              </SmartLink>
            ))}
          </nav>
        </Container>
      </section>

      <Section id="principles" heading="Principles" subheading="The rules every page follows.">
        <div className="grid gap-x-10 gap-y-2.5 md:grid-cols-2">
          {principles.map((col, i) => (
            <CheckList key={i} items={col} />
          ))}
        </div>
      </Section>

      <Section id="logo" heading="Logo" subheading="Always use the supplied logo file. Never redraw, retype or edit it." background="surface">
        <div className="grid gap-6 lg:grid-cols-2">
          <Demo label="Primary logo">
            <div className="flex h-40 items-center justify-center rounded-2xl border border-line bg-white">
              <Image src="/iGUIDE-Logo.svg" alt="iGuide" width={1330} height={368} className="h-auto w-[200px]" />
            </div>
            <Spec>Website file: /iGUIDE-Logo.svg. Shown 150px wide in the site header. Place it on white or Mist.</Spec>
          </Demo>
          <Demo label="Logo rules">
            <CheckList
              items={[
                'Use the supplied file only. Ask Marketing for other formats.',
                'Keep clear space around it; never crowd it with text or images.',
                'Never stretch, rotate, recolour, outline or add shadows or effects.',
                'Never rebuild the wordmark in a font or place it on a busy photo.',
                'In running text, write the name as “iGuide”.',
              ]}
            />
          </Demo>
        </div>
      </Section>

      <Section id="colour" heading="Colour" subheading="From the iGuide Brand Quick Guide (2026). Use the token, never a hex value.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colours
            .filter((c) => !c.websiteOnly)
            .map((c) => (
              <li key={c.name} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <div className={cn('h-20', c.swatch)} />
                <div className="p-5">
                  <p className="type-heading-xs text-ink">{c.name}</p>
                  <p className="type-small text-muted">
                    {c.hex} · <code>{c.token}</code>
                  </p>
                  <p className="type-small mt-2 text-body">{c.use}</p>
                </div>
              </li>
            ))}
        </ul>
        <h3 className="type-heading-md mt-12 text-ink">Website only</h3>
        <p className="type-body mt-2 max-w-3xl text-muted">
          These colours exist only for the website’s interface. They are not brand colours: never use them in print, decks, ads or other brand work.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colours
            .filter((c) => c.websiteOnly)
            .map((c) => (
              <li key={c.name} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                <div className={cn('h-20', c.swatch)} />
                <div className="p-5">
                  <p className="type-heading-xs text-ink">{c.name}</p>
                  <p className="type-small text-muted">
                    {c.hex} · <code>{c.token}</code>
                  </p>
                  <p className="type-small mt-2 text-body">{c.use}</p>
                </div>
              </li>
            ))}
        </ul>
      </Section>

      <Section
        id="type"
        heading="Typography"
        subheading="REA Pangea. Display cut for everything; the Text cut (font-text) is available for very small sizes."
        background="surface"
      >
        <div className="grid gap-4 sm:grid-cols-5">
          {[300, 400, 500, 600, 700].map((w) => (
            <div key={w} className="rounded-2xl border border-line p-5">
              <p className="text-3xl text-ink" style={{fontWeight: w}}>
                Aa
              </p>
              <p className="type-small mt-2 text-muted">
                {{300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold'}[w]} {w}
              </p>
            </div>
          ))}
        </div>
        <Spec>
          Regular 400 for body copy. Medium 500 for inline links and labels. SemiBold 600 for headings, buttons, tabs and text links. Bold 700 only for big
          figures (stats, prices). Light is not used.
        </Spec>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {typeScale.map((t) => (
            <div key={t.cls} className="grid gap-3 py-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
              <p className={cn(t.cls, t.cls === 'type-lead' || t.cls === 'type-overline' ? 'text-muted' : 'text-ink')}>{t.sample}</p>
              <div className="type-small text-muted">
                <p className="font-semibold text-ink">
                  <code>{t.cls}</code> · {t.size} · line {t.lh}
                </p>
                <p className="mt-1">{t.use}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="layout" heading="Layout, spacing and elevation">
        <div className="grid gap-6 lg:grid-cols-2">
          <Demo label="Page width and grid">
            <ul className="type-body space-y-2 text-body">
              <li>Default container: 640 / 768 / 1024 / 1280 / 1536px at each breakpoint, 16px side padding.</li>
              <li>Reading width (legal, articles): 768px. Medium 896px, wide 1024px.</li>
              <li>Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536px.</li>
              <li>Card grids: 1 column on phones, 2 on tablets, 3 or 4 on desktop, 24px gap.</li>
            </ul>
          </Demo>
          <Demo label="Spacing (8-point grid)">
            <div className="flex flex-wrap items-end gap-3">
              {[4, 8, 16, 24, 32, 40, 48, 64].map((n) => (
                <div key={n} className="text-center">
                  <div className="bg-rea-red/15" style={{width: n, height: n}} />
                  <p className="type-caption mt-1 text-muted">{n}</p>
                </div>
              ))}
            </div>
            <Spec>
              Every size, padding and gap is a multiple of 8px (4px for fine adjustments). Sections: 64px top and bottom on phones, 60px on desktop. Heading to
              content 40px, pill to heading 24px, heading to subheading 16px. Card padding 24px (32px on large cards).
            </Spec>
          </Demo>
          <Demo label="Corner radius">
            <div className="flex flex-wrap items-start gap-6">
              {[
                ['rounded-lg', '8px', 'Buttons, fields, dropdowns'],
                ['rounded-2xl', '16px', 'Cards, accordions, panels, media'],
                ['rounded-full', 'Full', 'Pills, tabs, avatars'],
              ].map(([r, px, use]) => (
                <div key={r} className="w-36">
                  <div className={cn('h-14 w-28 border-2 border-primary bg-mist', r)} />
                  <p className="type-small mt-3 font-semibold text-ink">{px}</p>
                  <p className="type-small text-muted">{use}</p>
                </div>
              ))}
            </div>
            <Spec>Only these three. Rows inside a card or menu may use 12px.</Spec>
          </Demo>
          <Demo label="Elevation (three levels)">
            <div className="flex flex-wrap gap-6">
              {[
                ['shadow-card', 'Low', 'Resting cards, panels, accordions'],
                ['shadow-lg', 'Medium', 'Hovered cards, open dropdowns and menus'],
                ['shadow-xl', 'High', 'Pop-ups, dialogs, the mega menu'],
              ].map(([s, level, use]) => (
                <div key={s} className="w-36">
                  <div className={cn('h-16 rounded-2xl border border-line bg-white', s)} />
                  <p className="type-small mt-3 font-semibold text-ink">
                    {level} · <code>{s}</code>
                  </p>
                  <p className="type-small text-muted">{use}</p>
                </div>
              ))}
            </div>
          </Demo>
          <Demo label="Effects" className="lg:col-span-2">
            <p className="type-body text-body">
              One effect only: sticky bars (landing page header, in-page menus) are 95% white with a background blur, so content scrolls softly underneath. No
              gradients on buttons, no glows, no drop shadows on text.
            </p>
          </Demo>
        </div>
      </Section>

      <Section
        id="buttons"
        heading="Buttons"
        subheading="Two styles, two sizes. Snowgum 700 at rest, REA Red on hover. 8px radius, SemiBold 16px."
        background="surface"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Demo label="Primary">
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#buttons" size="lg">
                Book a demo
              </Button>
              <Button href="#buttons">Shop now</Button>
            </div>
            <Spec>Large (12×24px padding) on pages. Medium (8×16px) in the header and tight spaces. One primary button per group.</Spec>
          </Demo>
          <Demo label="Secondary">
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#buttons" size="lg" variant="secondary">
                Find an iGuide Pro
              </Button>
              <Button href="#buttons" variant="secondary">
                Download sample
              </Button>
            </div>
            <Spec>Next to a primary button, or for a lesser action. White fill, Snowgum 700 border and text.</Spec>
          </Demo>
        </div>
        <Demo label="States" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Default', buttonClass('primary', 'lg'), buttonClass('secondary', 'lg')],
              [
                'Hover',
                cn(buttonClass('primary', 'lg'), 'border-primary-hover bg-primary-hover'),
                cn(buttonClass('secondary', 'lg'), 'border-primary-hover text-primary-hover'),
              ],
              [
                'Keyboard focus',
                cn(buttonClass('primary', 'lg'), 'outline-2 outline-offset-2 outline-primary'),
                cn(buttonClass('secondary', 'lg'), 'outline-2 outline-offset-2 outline-primary'),
              ],
              [
                'Disabled',
                cn(buttonClass('primary', 'lg'), 'pointer-events-none opacity-50'),
                cn(buttonClass('secondary', 'lg'), 'pointer-events-none opacity-50'),
              ],
            ].map(([state, primary, secondary]) => (
              <div key={state}>
                <p className="type-small mb-3 font-semibold text-ink">{state}</p>
                <div className="flex flex-col items-start gap-3">
                  <span className={primary}>Book a demo</span>
                  <span className={secondary}>Learn more</span>
                </div>
              </div>
            ))}
          </div>
          <Spec>
            Colour changes take 150ms. Disabled buttons are 50% opacity with no hover. A form&apos;s HubSpot submit button uses the same primary style.
          </Spec>
        </Demo>
      </Section>

      <Section id="links" heading="Links">
        <div className="grid gap-6 lg:grid-cols-2">
          <Demo label="Text link (standalone)">
            <div className="flex flex-col items-start gap-4">
              <SmartLink href="#links" className="text-link">
                View customer stories
                <ArrowRight width={16} height={16} className="link-arrow" />
              </SmartLink>
              <span className="text-link text-primary-hover">
                Hover state
                <ArrowRight width={16} height={16} className="link-arrow translate-x-1" />
              </span>
            </div>
            <Spec>
              SemiBold, no underline, trailing arrow. On hover the text turns red and the arrow moves 4px right. Inside a clickable card, hovering the card does
              the same.
            </Spec>
          </Demo>
          <Demo label="Inline link (in a sentence)">
            <p className="type-body text-body [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-primary-hover">
              See the <a href="#links">pricing page</a> for package details.
            </p>
            <Spec>Underlined (WCAG: never colour alone), Medium 500, red on hover. Applied automatically to plain links in body copy.</Spec>
          </Demo>
        </div>
      </Section>

      <Section id="pills" heading="Pills" background="surface">
        <Demo label="Callout pill above a heading">
          <div className="flex flex-wrap items-center gap-4">
            <Pill label="New" />
            <Pill label="Read the 2026 report" href="#pills" />
            <span className="rounded-2xl bg-surface p-3">
              <Pill label="On a Mist section" tone="white" />
            </span>
          </div>
          <Spec>12px SemiBold, Mist fill (white on a Mist section), full radius. As a link: red text and arrow nudge on hover.</Spec>
        </Demo>
      </Section>

      <Section id="tabs" heading="Tabs">
        <Demo label="Pill tabs">
          <PillTabs
            label="Package"
            tabs={[
              {id: 'bg-standard', label: 'Standard', content: <p className="type-body text-center text-body">Panel content for the first tab.</p>},
              {
                id: 'bg-premium',
                label: 'Premium',
                content: <p className="type-body text-center text-body">Panel content for the second tab.</p>,
              },
              {id: 'bg-cad', label: 'CAD', content: <p className="type-body text-center text-body">Panel content for the third tab.</p>},
            ]}
          />
          <Spec>
            Track: Mist with a hairline border. Active: Snowgum 700 fill, white text. Inactive: white with a hairline border; red border and text on hover. 16px
            SemiBold, 20×10px padding. Arrow keys move between tabs. All panels stay in the HTML.
          </Spec>
        </Demo>
      </Section>

      <Section
        id="forms"
        heading="Forms and dropdowns"
        subheading="HubSpot forms are restyled to match. Labels above fields, never inside only."
        background="surface"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Demo label="Form fields">
            <form className="hs-form" action="#">
              <div className="hs-form-field">
                <label htmlFor="bg-email">
                  <span>Email</span>
                  <span className="hs-form-required">*</span>
                </label>
                <input id="bg-email" className="hs-input" type="email" placeholder="you@company.com" />
              </div>
              <div className="hs-form-field">
                <label htmlFor="bg-company">
                  <span>Company</span>
                </label>
                <input id="bg-company" className="hs-input invalid error" type="text" defaultValue="" />
                <ul className="hs-error-msgs">
                  <li>
                    <label className="hs-error-msg">Please complete this required field.</label>
                  </li>
                </ul>
              </div>
              <ul className="inputs-list">
                <li>
                  <label className="hs-form-booleancheckbox-display">
                    <input type="checkbox" />
                    <span>I agree to receive marketing emails.</span>
                  </label>
                </li>
              </ul>
              <div className="hs-submit">
                <button type="button" className="hs-button">
                  Submit
                </button>
              </div>
            </form>
            <Spec>Fields: 48px, 8px radius, Snowgum 400 border, 2px Snowgum 700 focus outline. Labels 14px Medium. Required mark and errors in red.</Spec>
          </Demo>
          <Demo label="Dropdowns">
            <SelectDemos />
            <Spec>
              Always the site&apos;s own dropdown, never the browser&apos;s. Opens below, keyboard friendly, the chosen option is ticked. Use the form-field
              version inside forms.
            </Spec>
            <p className="type-overline mt-8 mb-3 text-muted">Search field</p>
            <div className="relative">
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="search"
                aria-label="Search (example)"
                placeholder="Search resources"
                className="h-12 w-full rounded-lg border border-muted bg-white pr-3 pl-10 text-base text-ink placeholder:text-muted focus:border-primary focus:outline-2 focus:outline-offset-1 focus:outline-primary"
              />
            </div>
            <Spec>The standard search field (proposed): same size and border as form fields, icon on the left.</Spec>
          </Demo>
        </div>
      </Section>

      <Section id="accordions" heading="Accordions">
        <ul className="max-w-3xl space-y-3">
          {[
            [
              'How does the pricing work?',
              'iGuide processing fees are based on billable area per project. When hiring a provider, their capture fee is separate and varies by location.',
            ],
            [
              'Can I brand the virtual tour or floor plan?',
              'Yes, iGuide lets you add your logo and customize the virtual tour and floor plans with branding options including company logo, contact information and customized colour schemes.',
            ],
          ].map(([q, a], i) => (
            <li key={q}>
              <details className="group rounded-2xl border border-line bg-white shadow-card" open={i === 0}>
                <summary className="type-heading-xs flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-ink transition-colors hover:text-primary-hover [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown width={20} height={20} className="shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="type-body px-6 pb-6 text-body">{a}</div>
              </details>
            </li>
          ))}
        </ul>
        <Spec>16px radius, card shadow, 18px SemiBold question that turns red on hover, chevron rotates when open. FAQs show 3, then “Show more”.</Spec>
      </Section>

      <Section id="cards" heading="Cards" subheading="White, hairline border, 16px radius, card shadow. Five types, one look." background="surface">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="type-overline mb-3 text-muted">Image card</p>
            <CardGrid
              columns={1}
              cards={[
                {
                  title: 'PLANIX R1',
                  image: {src: '/assets/PLANIX-R1.png', alt: 'iGuide PLANIX R1 camera'},
                  text: 'One or two sentences of card text.',
                  link: {label: 'Shop cameras', href: '#cards'},
                },
              ]}
            />
          </div>
          <div>
            <p className="type-overline mb-3 text-muted">Icon card</p>
            <div className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <FileText width={24} height={24} aria-hidden />
              </span>
              <h3 className="type-heading-sm text-ink">Reports</h3>
              <p className="type-body mt-2 flex-1 text-body">One or two sentences of card text.</p>
              <SmartLink href="#cards" className="text-link mt-5">
                Learn more
                <ArrowRight width={16} height={16} />
              </SmartLink>
            </div>
            <Spec>A Lucide icon, 24px, in a 48px Mist square.</Spec>
          </div>
          <div>
            <p className="type-overline mb-3 text-muted">Video card</p>
            <CardGrid
              columns={1}
              cards={[
                {
                  title: 'Site Plans',
                  media: {type: 'video', src: '/assets/Site-Plans-Feature-Launch-Video.mp4', label: 'iGuide Site Plans feature video', controls: true},
                  text: 'One or two sentences of card text.',
                },
              ]}
            />
          </div>
          <div>
            <p className="type-overline mb-3 text-muted">Text-only card</p>
            <CardGrid
              columns={1}
              cards={[{title: 'Floor plans', text: 'One or two sentences of card text.', link: {label: 'Explore floor plans', href: '#cards'}}]}
            />
          </div>
        </div>
        <p className="type-overline mt-10 mb-3 text-muted">Blog card</p>
        {posts.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post._id}>
                <ResourceCard item={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="type-body text-muted">The latest blog posts appear here.</p>
        )}
        <Spec>
          Blog cards are the same for every Resource Center type: image with a type pill, date, title, short description and link. A card that is one big link:
          on hover the shadow grows to shadow-lg, the title and text link turn red and the arrow nudges right. Cards with several links don&apos;t change on
          hover; only their links do.
        </Spec>
      </Section>

      <Section id="quotes" heading="Quotes">
        <div className="mb-8 flex items-center gap-4">
          <QuoteMark />
          <p className="type-small text-muted">The one quote mark: REA Red, 32px, above the quote. Never typed “quotes” around the text.</p>
        </div>
        <Testimonials
          bare
          quotes={[
            {
              quote: 'I want something that’s really straightforward and that doesn’t carry constant fees.',
              name: 'Brian Charlton',
              role: 'Owner and Founder',
              company: 'CMC Photo',
            },
            {
              quote: 'We’ve had our measurements challenged at least 200 times. Every single time, iGuide has been accurate. Not once has it been wrong.',
              name: 'Ryan Hagel',
              role: 'Owner',
              company: 'Calgary Real Estate Photos',
            },
          ]}
        />
      </Section>

      <Section id="icons" heading="Icons" subheading="One icon set for everything: Lucide." background="surface">
        <div className="grid gap-6 lg:grid-cols-2">
          <Demo label="Why Lucide">
            <ul className="type-body space-y-2 text-body">
              <li>
                Free for any use, including commercial, under the ISC open-source licence. Any team can use it on the website, in decks, documents, ads and
                print.
              </li>
              <li>Over 1,500 icons in one consistent line style, matching REA Pangea’s weight. Download SVG or PNG from lucide.dev.</li>
              <li>
                Apple SF Symbols (used in the old product foundation) are licensed for Apple-platform apps only, so they must not be used on the website or in
                marketing.
              </li>
            </ul>
            <SmartLink href="https://lucide.dev/icons/" className="text-link mt-4" target="_blank" rel="noopener noreferrer">
              Browse the icon set
              <ArrowRight width={16} height={16} />
            </SmartLink>
          </Demo>
          <Demo label="Rules">
            <CheckList
              items={[
                'Lucide only. Never mix in another set or draw a one-off icon.',
                'Line style as supplied: 2px stroke (2.5px for ticks), rounded ends. Don’t fill, outline or add effects.',
                'Sizes: 16px next to text, 20px in fields and buttons, 24px on their own.',
                'Colour: Snowgum 700 (or white on dark). Red only on hover or for the active state.',
                'Icons support words, never replace them. An icon on its own needs a hidden label.',
                'Use each icon for one meaning everywhere (a calendar always means booking or dates).',
              ]}
            />
          </Demo>
        </div>
        <Demo label="Icons in use on the site" className="mt-6">
          <ul className="grid grid-cols-3 gap-4 text-ink sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {iconSet.map(([name, Icon]) => (
              <li key={name} className="flex flex-col items-center gap-2 rounded-lg p-2 text-center">
                <Icon width={24} height={24} aria-hidden />
                <span className="type-caption text-muted">{name}</span>
              </li>
            ))}
          </ul>
        </Demo>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Demo label="Brand and partner logos">
            <p className="type-body text-body">Social, partner and integration logos are not icons: use each company’s official logo file, unaltered.</p>
          </Demo>
          <Demo label="Product tag icons">
            <p className="type-body text-body">
              The PLANIX and iGuide tag icons (utilities, safety, rooms) belong to the product. Use them only to show the product itself.
            </p>
          </Demo>
          <Demo label="Illustrations">
            <p className="type-body text-body">
              Larger drawings, like the homepage industry pictures, are illustrations, not icons. Line work in Snowgum 700 with a red accent.
            </p>
          </Demo>
        </div>
        <Demo label="Check list" className="mt-6">
          <CheckList items={['No subscriptions', 'Pay per project', 'A 3D virtual tour with every iGuide']} />
          <Spec>Benefit lists use the Snowgum 700 tick. Plain lists use standard bullets.</Spec>
        </Demo>
      </Section>

      <Section id="states" heading="States and motion">
        <div className="grid gap-6 md:grid-cols-3">
          <Demo label="Hover">
            <p className="type-body text-body">
              Everything interactive turns REA Red on hover: buttons fill red, links and tabs turn red, clickable cards raise their shadow.
            </p>
          </Demo>
          <Demo label="Active and selected">
            <p className="type-body text-body">
              The selected tab, filter or toggle is filled Snowgum 700 with white text. The current page in a menu is Snowgum 700 SemiBold.
            </p>
          </Demo>
          <Demo label="Focus">
            <p className="type-body text-body">Keyboard focus shows a 2px Snowgum 700 outline, 2px off the element. Never remove it.</p>
          </Demo>
          <Demo label="Motion">
            <p className="type-body text-body">Colour changes 150ms. Arrows nudge 4px. Chevrons rotate 180°. Nothing moves for visitors who turn motion off.</p>
          </Demo>
          <Demo label="Cursor">
            <p className="type-body text-body">Hand cursor on every link, button, tab, dropdown, checkbox and accordion.</p>
          </Demo>
          <Demo label="Disabled">
            <p className="type-body text-body">50% opacity, no hover change, default cursor.</p>
          </Demo>
        </div>
      </Section>

      <Section
        id="accessibility"
        heading="Accessibility"
        subheading="Every page must work for everyone, by keyboard and screen reader (WCAG 2.2 AA)."
        background="surface"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            ['Contrast', 'Body text Snowgum 700 on white or Mist. Secondary text Snowgum 400 on white only, never on Mist or photos.'],
            ['Links', 'Links in sentences are underlined. Never use colour alone to show something is clickable.'],
            ['Images', 'Every meaningful image has alt text that says what it shows. Decorative images have empty alt text.'],
            ['Headings', 'One h1 per page, then h2, h3 in order. Never pick a heading level for its size; use the type classes.'],
            ['Forms', 'Every field has a visible label. Errors say what to fix. Consent boxes are never pre-ticked.'],
            ['Motion', 'Nothing flashes. Animation stops for visitors who ask for reduced motion.'],
          ].map(([title, text]) => (
            <Demo key={title} label={title}>
              <p className="type-body text-body">{text}</p>
            </Demo>
          ))}
        </div>
      </Section>

      <Section id="resources" heading="Resources" subheading="Everything here is free for every team to use.">
        <ul className="grid gap-6 md:grid-cols-3">
          {[
            ['Icons', 'Lucide icon set (ISC licence).', 'https://lucide.dev/icons/', 'lucide.dev'],
            ['Logo and fonts', 'Logo files and the REA Pangea font come from Marketing. Check the font licence before using it outside the website.', '', ''],
            [
              'This page',
              'Bookmark /brand-guideline. It shows the live components, so it is always current.',
              '/brand-guideline',
              'goiguide.com/brand-guideline',
            ],
          ].map(([title, text, href, linkLabel]) => (
            <li key={title}>
              <Demo label={title} className="h-full">
                <p className="type-body text-body">{text}</p>
                {href && (
                  <SmartLink href={href} className="text-link mt-4" {...(href.startsWith('http') ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>
                    {linkLabel}
                    <ArrowRight width={16} height={16} />
                  </SmartLink>
                )}
              </Demo>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
