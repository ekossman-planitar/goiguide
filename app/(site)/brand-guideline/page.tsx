import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import {CardGrid} from '@/components/blocks/CardGrid'
import {CheckList} from '@/components/blocks/CheckList'
import {PillTabs} from '@/components/blocks/PillTabs'
import {Section} from '@/components/blocks/Section'
import {Testimonials} from '@/components/blocks/Testimonials'
import {SelectDemos} from '@/components/pages/BrandGuideDemos'
import {Button, buttonClass} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {Pill} from '@/components/ui/Pill'
import {QuoteMark} from '@/components/ui/QuoteMark'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight, ChevronDown, ChevronLeft, ChevronRight, CloseIcon, MenuIcon, Star} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {pageMetadata} from '@/lib/pageMetadata'

/** Internal reference page: never indexed, not in the sitemap (Evan, 2026-10-23). */
export const metadata: Metadata = {
  ...pageMetadata({title: 'Brand guideline | iGuide', path: '/brand-guideline'}),
  robots: {index: false, follow: false},
}

const nav = [
  ['principles', 'Principles'],
  ['colour', 'Colour'],
  ['type', 'Typography'],
  ['layout', 'Layout'],
  ['buttons', 'Buttons'],
  ['links', 'Links'],
  ['pills', 'Pills'],
  ['tabs', 'Tabs'],
  ['forms', 'Forms & dropdowns'],
  ['accordions', 'Accordions'],
  ['cards', 'Cards'],
  ['quotes', 'Quotes'],
  ['icons', 'Icons & lists'],
  ['states', 'States & motion'],
  ['audit', 'Not yet consistent'],
] as const

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
  {name: 'Hairline', token: 'line', hex: '#E4E4E7', use: 'Borders and dividers (not in the brand guide).', swatch: 'bg-line'},
  {name: 'Blueprint', token: 'blueprint', hex: '#5B8FDB', use: 'Secondary palette: charts and illustrations only.', swatch: 'bg-blueprint'},
  {name: 'Laser', token: 'laser', hex: '#9FD356', use: 'Secondary palette: charts and illustrations only.', swatch: 'bg-laser'},
  {name: 'Slate', token: 'slate', hex: '#3E5C76', use: 'Secondary palette: charts and illustrations only.', swatch: 'bg-slate'},
  {name: 'Error', token: 'error', hex: '#B42318', use: 'Form error messages and invalid fields only (not in the brand guide).', swatch: 'bg-error'},
  {name: 'Star', token: 'star', hex: '#F59E0B', use: 'Review stars only (not in the brand guide).', swatch: 'bg-star'},
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

const audit: {area: string; now: string; proposal: string}[] = [
  {
    area: 'Page titles (h1)',
    now: '26 page titles use 9 different size and line-height pairs: 34/44, 36/48, 40/48 and 40/56px with leading 1.15, 1.25 or normal, plus 48–72px bold on the ad landing hero.',
    proposal: 'Heroes use type-display (40/56). Text-led pages (legal, Help Center, articles, events, resource listings) use type-title (36/48).',
  },
  {
    area: 'Headings (h2, h3)',
    now: 'About 45 h2s in about 20 combinations (22 to 48px), and h3s in 15+ combinations.',
    proposal: 'Section headings: type-h2. Banners and panels: type-heading-lg. Sub-sections and forms: type-heading-md. Card titles: type-heading-sm or -xs.',
  },
  {
    area: 'Hand-built buttons',
    now: '6 buttons copy the button styles by hand with different padding and sizes: industry picker CTA, catalogue “copy code”, pricing calculator submit, Help “Join the forum”, Help “Submit a request”, cookie preferences.',
    proposal: 'Use <Button> or buttonClass(). Their own IDs and class names stay, so GTM keeps working.',
  },
  {
    area: 'Search fields',
    now: '4 styles: events (44px, 14px text, hairline border), catalogue (48px, strong border), reseller directory (pill, red border on hover), Help Center search.',
    proposal:
      'One search field: 48px, 8px radius, Snowgum 400 border, 16px text, icon on the left, 2px focus outline. The Help Center hero search can stay larger.',
  },
  {
    area: 'Accordions',
    now: '3 styles: FAQs (12px radius, no hover colour), specs (16px radius, red hover), landing page FAQs (compact 16px text).',
    proposal: 'One accordion: 16px radius, card shadow, 18px question that turns red on hover, chevron rotates when open.',
  },
  {
    area: 'Clickable cards',
    now: '5 hover behaviours: red border, red border + lift + large shadow, lift + shadow tint, shadow only, none.',
    proposal: 'Whole-card links: shadow grows (shadow-lg), title and text link turn red, arrow nudges right. No lift, no red border.',
  },
  {
    area: 'Card shadows',
    now: 'Resting cards use the card shadow (31 places), shadow-sm (14) or shadow-lg (some static cards).',
    proposal: 'Resting cards: shadow-card. Larger shadows only on hover, open menus and dialogs.',
  },
  {
    area: 'Bold (700)',
    now: 'font-bold appears in 23 files (stat numbers, prices, step numbers, mega-menu titles, announcement bar, pop-ups).',
    proposal: 'SemiBold (600) everywhere. Bold only for big figures: stats, prices, countdown digits.',
  },
  {
    area: 'Section spacing',
    now: '6 vertical padding pairs on sections (py-10, 12, 14, 16, 20 with lg 16, 20 or 60px).',
    proposal: 'Standard section: 64px → 60px (py-16 lg:py-[60px]). Compact band (logo strips, CTA banners): 40px → 60px.',
  },
  {
    area: 'Tabs',
    now: 'The tour showcase tabs are 24×12px padding; every other tab set is 20×10px.',
    proposal: 'All pill tabs 20×10px.',
  },
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

export default function BrandGuidelinePage() {
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
        <CheckList
          className="max-w-3xl"
          items={[
            'REA Pangea is the only typeface, everywhere: headings, body, buttons and HubSpot forms.',
            'Snowgum 700 is the “black”. Red is for accents only: every hover and active highlight is REA Red.',
            'One way to do each thing: one button set, one tab style, one dropdown, one accordion, one card.',
            'Sentence case for headings and buttons. Buttons start with a verb and are 2 to 4 words.',
            'Plain links in sentences are underlined. Standalone text links are not; they carry an arrow.',
            'Everything clickable shows a hand cursor and a visible focus outline for keyboard users.',
            'White and Mist sections alternate; never two Mist sections in a row.',
          ]}
        />
      </Section>

      <Section id="colour" heading="Colour" subheading="From the iGuide Brand Quick Guide (2026). Use the token, never a hex value." background="surface">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colours.map((c) => (
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

      <Section id="type" heading="Typography" subheading="REA Pangea. Display cut for everything; the Text cut (font-text) is available for very small sizes.">
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

      <Section id="layout" heading="Layout and spacing" background="surface">
        <div className="grid gap-6 lg:grid-cols-2">
          <Demo label="Page width">
            <ul className="type-body space-y-2 text-body">
              <li>Default container: 640 / 768 / 1024 / 1280 / 1536px at each breakpoint, 16px side padding.</li>
              <li>Reading width (legal, articles): 768px (narrow). Medium 896px, wide 1024px.</li>
              <li>Breakpoints: sm 640, md 768, lg 1024, xl 1280, 2xl 1536px.</li>
            </ul>
          </Demo>
          <Demo label="Vertical rhythm">
            <ul className="type-body space-y-2 text-body">
              <li>Section: 64px top and bottom on mobile, 60px on desktop.</li>
              <li>Section heading to content: 40px. Pill to heading: 24px. Heading to subheading: 16px.</li>
              <li>Card grids: 24px gap. Card padding: 24px (32px on large cards).</li>
            </ul>
          </Demo>
          <Demo label="Corner radius">
            <div className="flex flex-wrap items-end gap-6">
              {[
                ['rounded-lg', '8px', 'Buttons, fields, dropdowns'],
                ['rounded-2xl', '16px', 'Cards, accordions, panels, media'],
                ['rounded-full', 'Full', 'Pills, tabs, avatars'],
              ].map(([r, px, use]) => (
                <div key={r} className="w-36">
                  <div className={cn('h-16 w-16 border-2 border-primary bg-mist', r)} />
                  <p className="type-small mt-2 font-semibold text-ink">{px}</p>
                  <p className="type-small text-muted">{use}</p>
                </div>
              ))}
            </div>
          </Demo>
          <Demo label="Elevation">
            <div className="flex flex-wrap gap-6">
              {[
                ['shadow-card', 'Resting card'],
                ['shadow-lg', 'Hover, open menu, dialog'],
              ].map(([s, use]) => (
                <div key={s} className="w-40">
                  <div className={cn('h-16 rounded-2xl border border-line bg-white', s)} />
                  <p className="type-small mt-3 font-semibold text-ink">{s}</p>
                  <p className="type-small text-muted">{use}</p>
                </div>
              ))}
            </div>
          </Demo>
        </div>
      </Section>

      <Section id="buttons" heading="Buttons" subheading="Two styles, two sizes. Snowgum 700 at rest, REA Red on hover. 8px radius, SemiBold 16px.">
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

      <Section id="links" heading="Links" background="surface">
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

      <Section id="pills" heading="Pills">
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

      <Section id="tabs" heading="Tabs" background="surface">
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

      <Section id="forms" heading="Forms and dropdowns" subheading="HubSpot forms are restyled to match. Labels above fields, never inside only.">
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
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
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

      <Section id="accordions" heading="Accordions" background="surface">
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

      <Section id="cards" heading="Cards" subheading="White, hairline border, 16px radius, card shadow.">
        <CardGrid
          columns={3}
          cards={[
            {title: 'Floor plans', text: 'One or two sentences of card text.', link: {label: 'Explore floor plans', href: '#cards'}},
            {title: '3D virtual tours', text: 'One or two sentences of card text.', link: {label: 'Explore 3D tours', href: '#cards'}},
            {title: 'CAD deliverables', text: 'One or two sentences of card text.', link: {label: 'Explore CAD', href: '#cards'}},
          ]}
        />
        <Spec>
          A card that is one big link: on hover the shadow grows to shadow-lg, the title and text link turn red and the arrow nudges right. Cards with several
          links do not change on hover; only their links do.
        </Spec>
      </Section>

      <Section id="quotes" heading="Quotes" background="surface">
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

      <Section id="icons" heading="Icons and lists">
        <div className="grid gap-6 lg:grid-cols-2">
          <Demo label="Interface icons">
            <ul className="flex flex-wrap gap-6 text-ink">
              {[
                ['Chevron down', <ChevronDown key="d" width={24} height={24} />],
                ['Chevron left', <ChevronLeft key="l" width={24} height={24} />],
                ['Chevron right', <ChevronRight key="r" width={24} height={24} />],
                ['Arrow', <ArrowRight key="a" width={24} height={24} />],
                ['Menu', <MenuIcon key="m" width={24} height={24} />],
                ['Close', <CloseIcon key="c" width={24} height={24} />],
                ['Star', <Star key="s" width={24} height={24} className="text-star" />],
              ].map(([name, icon]) => (
                <li key={name as string} className="flex w-20 flex-col items-center gap-2 text-center">
                  {icon}
                  <span className="type-caption text-muted">{name}</span>
                </li>
              ))}
            </ul>
            <Spec>Line icons, 2px stroke, rounded ends, currentColor. 16px next to text, 20–24px on their own.</Spec>
          </Demo>
          <Demo label="Check list">
            <CheckList items={['No subscriptions', 'Pay per project', 'A 3D virtual tour with every iGuide']} />
            <Spec>Benefit lists use the Snowgum 700 tick. Plain lists use standard bullets.</Spec>
          </Demo>
        </div>
      </Section>

      <Section id="states" heading="States and motion" background="surface">
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
        id="audit"
        heading="Not yet consistent"
        subheading="Where the site differs from this guideline today (checked 2026-10-23). Approve or adjust, and the site is brought in line in one pass."
      >
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="type-small w-full min-w-[720px] text-left">
            <thead className="bg-surface text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Area</th>
                <th className="px-4 py-3 font-semibold">On the site now</th>
                <th className="px-4 py-3 font-semibold">Proposed standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-body">
              {audit.map((row) => (
                <tr key={row.area} className="align-top">
                  <td className="px-4 py-4 font-semibold text-ink">{row.area}</td>
                  <td className="px-4 py-4">{row.now}</td>
                  <td className="px-4 py-4">{row.proposal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  )
}
