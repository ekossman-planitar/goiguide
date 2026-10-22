import {CheckList} from '@/components/blocks/CheckList'
import {CtaButtons} from '@/components/blocks/CtaButtons'
import {MediaView} from '@/components/blocks/MediaView'
import {PillTabs} from '@/components/blocks/PillTabs'
import {Section, type SectionBg} from '@/components/blocks/Section'
import {EmailReportEmbed} from '@/components/pages/EmailReportEmbed'
import {Container} from '@/components/ui/Container'
import {FallbackImage} from '@/components/ui/FallbackImage'
import {cn} from '@/lib/cn'
import {RegionSwitch} from './RegionSwitch'
import {reportSampleHtml} from '@/lib/landingPages/reportSampleHtml'
import {agreementHtml} from '@/lib/landingPages/agreementHtml'
import {LegalPage} from '@/components/pages/LegalPage'
import {HubSpotForm} from '@/components/forms/HubSpotForm'
import {FormPlaceholder} from './LpHero'
import {reportSampleLabel} from '@/lib/landingPages/reportSamples'
import {lpCtas, lpImg} from './convert'
import type {LpImage} from './types'

/* eslint-disable @typescript-eslint/no-explicit-any -- section fields come from Sanity as loose objects */

/**
 * Landing page sections added for the showcase pages (live: /get-iguide/<industry>/showcase):
 * in-page menu, price tables, sample emails, and feature cards with images and buttons.
 */

const bg = (s: any): SectionBg | undefined => (['white', 'surface', 'sky'].includes(s.background) ? s.background : undefined)

/** Sticky row of links under the landing page header (live: showcase "top-nav"); #anchors scroll on the page */
export function AnchorNavSection({s}: Readonly<{s: any}>) {
  const links = ((s.links ?? []) as {_key?: string; kind?: string; label?: string; href?: string; newTab?: boolean}[]).filter(
    (l) => l?.kind === 'regionSwitch' || (l?.label && l.href),
  )
  if (!links.length) return null
  return (
    <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur md:top-20">
      <Container>
        <ul className="-mx-4 flex gap-x-6 overflow-x-auto px-4 py-3 text-sm font-semibold whitespace-nowrap md:justify-center md:text-base">
          {links.map((l, i) => {
            if (l.kind === 'regionSwitch') {
              return (
                <li key={l._key ?? i}>
                  <RegionSwitch />
                </li>
              )
            }
            return (
              <li key={l._key ?? i}>
                <a href={l.href} className="text-link" {...(l.newTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>
      </Container>
    </nav>
  )
}

type Table = {_key?: string; label?: string; image?: LpImage; columns?: string[]; rows?: {_key?: string; cells?: string[]}[]; note?: string; buttons?: unknown}

function PriceTable({table, caption, heading}: Readonly<{table: Table; caption: string; heading?: boolean}>) {
  const columns = table.columns ?? []
  const image = lpImg(table.image)
  const ctas = lpCtas(table.buttons).map((c) => ({...c, variant: 'secondary' as const}))
  return (
    <div className="mx-auto max-w-4xl">
      {heading && table.label && <h3 className="mb-5 text-2xl font-semibold text-ink">{table.label}</h3>}
      {image && <MediaView media={{type: 'image', image}} className="mb-8 rounded-2xl" sizes="(min-width: 1024px) 896px, 100vw" />}
      <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <table className="w-full min-w-[480px] border-collapse text-left text-base leading-6">
          <caption className="sr-only">{caption}</caption>
          {columns.some(Boolean) && (
            <thead>
              <tr className="bg-surface text-sm font-semibold text-ink">
                {columns.map((c, i) => (
                  <th key={i} scope="col" className="px-5 py-4">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {(table.rows ?? []).map((r, ri) => (
              <tr key={r._key ?? ri} className="border-t border-line align-top">
                {(r.cells ?? []).map((cell, ci) =>
                  ci === 0 ? (
                    <th key={ci} scope="row" className="px-5 py-3 font-semibold text-ink">
                      {cell}
                    </th>
                  ) : (
                    <td key={ci} className="px-5 py-3 text-body">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && <p className="mt-4 text-sm whitespace-pre-line text-muted">{table.note}</p>}
      {ctas.length > 0 && <CtaButtons ctas={ctas} className="mt-6 justify-center" />}
    </div>
  )
}

/** One table, or several as pill tabs (live: "iGUIDE Processing" tabs) or one under the other */
export function TablesSection({s}: Readonly<{s: any}>) {
  const tables = ((s.tables ?? []) as Table[]).filter((t) => t?.rows?.length)
  if (!tables.length) return null
  const caption = (t: Table) => [s.heading, t.label].filter(Boolean).join(': ') || 'Table'
  return (
    <Section heading={s.heading} subheading={s.subheading} align="center" background={bg(s)}>
      {tables.length > 1 && s.display === 'stacked' && (
        <div className="space-y-12">
          {tables.map((t, i) => (
            <PriceTable key={t._key ?? i} table={t} caption={caption(t)} heading />
          ))}
        </div>
      )}
      {tables.length > 1 && s.display !== 'stacked' && (
        <PillTabs
          label={s.heading ?? 'Tables'}
          tabs={tables.map((t, i) => ({id: `${s._key}-${i}`, label: t.label || `Table ${i + 1}`, content: <PriceTable table={t} caption={caption(t)} />}))}
        />
      )}
      {tables.length === 1 && <PriceTable table={tables[0]} caption={caption(tables[0])} />}
      {s.footnote && <p className="mx-auto mt-6 max-w-4xl text-sm whitespace-pre-line text-muted">{s.footnote}</p>}
    </Section>
  )
}

/** Sample iGuide email(s) stored with the site; two show side by side on desktop (live: Report + Analytics) */
export async function ReportSection({s}: Readonly<{s: any}>) {
  const ids = ((s.samples ?? []) as string[]).filter(Boolean)
  const reports = (await Promise.all(ids.map(async (id) => ({id, html: await reportSampleHtml(id)})))).filter((r): r is {id: string; html: string} => !!r.html)
  if (!reports.length) return null
  return (
    <Section heading={s.heading} subheading={s.subheading} align="center" background={bg(s)}>
      <div className={cn('grid gap-8', reports.length > 1 ? 'lg:grid-cols-2' : 'mx-auto max-w-[680px]')}>
        {reports.map((r) => (
          <EmailReportEmbed
            key={r.id}
            html={r.html}
            label={reportSampleLabel(r.id)}
            className="min-w-0 rounded-2xl bg-white shadow-[0_8px_32px_rgba(20,24,28,0.12)]"
          />
        ))}
      </div>
    </Section>
  )
}

type Feature = {_key?: string; title: string; text?: string; bullets?: string[]; icon?: LpImage; image?: LpImage; buttons?: unknown}

const cols: Record<number, string> = {2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4'}

function FeatureImage({image, className}: Readonly<{image: LpImage; className?: string}>) {
  const img = lpImg(image)
  if (!img) return null
  return (
    <FallbackImage
      src={img.src}
      alt={img.alt}
      width={img.width ?? 800}
      height={img.height ?? 600}
      sizes="(min-width: 1024px) 40vw, 100vw"
      className={cn('h-auto w-full rounded-xl', className)}
      fallback={null}
    />
  )
}

function FeatureText({f}: Readonly<{f: Feature}>) {
  const ctas = lpCtas(f.buttons).map((c) => ({...c, variant: 'secondary' as const}))
  return (
    <>
      <h3 className="text-xl leading-7 font-semibold text-ink md:text-2xl">{f.title}</h3>
      {f.text && <p className="mt-2 text-base leading-7 whitespace-pre-line text-body">{f.text}</p>}
      {f.bullets?.length ? <CheckList items={f.bullets} className="mt-4" /> : null}
      {ctas.length > 0 && <CtaButtons ctas={ctas} className="mt-auto pt-5" />}
    </>
  )
}

/** Feature grid with large images and buttons, as cards or as rows (image beside the text) */
export function FeatureCardsSection({s}: Readonly<{s: any}>) {
  const items = ((s.items ?? []) as Feature[]).filter((f) => f?.title)
  if (!items.length) return null
  const rows = s.display === 'rows'
  return (
    <Section heading={s.heading} subheading={s.subheading} align="center" background={bg(s)}>
      <ul className={cn('grid gap-6', rows ? 'mx-auto max-w-5xl' : (cols[s.columns] ?? cols[3]))}>
        {items.map((f, i) => (
          <li
            key={f._key ?? i}
            className={cn(
              'rounded-2xl border border-line bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]',
              rows ? 'grid items-center gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10' : 'flex flex-col',
            )}
          >
            {f.image && <FeatureImage image={f.image} className={rows ? undefined : 'mb-5'} />}
            {!f.image && f.icon && <FeatureImage image={f.icon} className="mb-5 h-12 w-12 object-contain" />}
            <div className={rows ? undefined : 'flex flex-1 flex-col'}>
              <FeatureText f={f} />
            </div>
          </li>
        ))}
      </ul>
      {lpCtas(s.buttons).length > 0 && <CtaButtons ctas={lpCtas(s.buttons)} className="mt-8 justify-center" />}
      {s.footnote && <p className="mt-8 text-sm whitespace-pre-line text-muted">{s.footnote}</p>}
    </Section>
  )
}

/**
 * Camera usage agreement (live: /get-iguide/form/…): heading, date line, the shared legal text, then the
 * partner's HubSpot signing form. The page's only h1.
 */
export async function AgreementSection({s}: Readonly<{s: any}>) {
  const html = s.agreement ? await agreementHtml(s.agreement) : null
  if (!s.heading || !html) return null
  return (
    <>
      <LegalPage title={s.heading} lastUpdated={s.effectiveDate} html={html} />
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 lg:pb-20">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-8">
          {s.hubspotFormId ? <HubSpotForm formId={s.hubspotFormId} className="min-h-[320px]" /> : <FormPlaceholder />}
        </div>
      </div>
    </>
  )
}
