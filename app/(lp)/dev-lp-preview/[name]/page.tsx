// TEMP preview of converted live pages (scripts/.import-samples/converted). Delete before commit.
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {notFound} from 'next/navigation'
import {LandingSections} from '@/components/landing/LandingSections'
import {LpFooter, LpHeader} from '@/components/landing/LpChrome'
import {SiteFooter} from '@/components/layout/SiteFooter'
import {FloatingBookButton} from '@/components/pages/FloatingBookButton'
import {SiteHeader} from '@/components/layout/SiteHeader'
import type {LpSection} from '@/components/landing/types'

/* eslint-disable @typescript-eslint/no-explicit-any */
function toPreview(v: any, quotes: Map<string, any>): any {
  if (Array.isArray(v)) return v.map((x) => toPreview(x, quotes))
  if (v && typeof v === 'object') {
    if ('img' in v) return {_preview: v.img, alt: v.alt}
    if ('ref' in v) return quotes.get(v.ref) ?? null
    const out: any = {}
    for (const [k, x] of Object.entries(v)) {
      if (k === 'logoImages') out._previewLogos = (x as any[]).map((l) => l.src)
      else if (k === 'items' && Array.isArray(x) && x.some((i: any) => i && 'ref' in i)) out._previewQuotes = toPreview(x, quotes)
      else out[k] = toPreview(x, quotes)
    }
    return out
  }
  return v
}

export default async function Page({params}: Readonly<{params: Promise<{name: string}>}>) {
  if (process.env.NODE_ENV !== 'development') notFound()
  const {name} = await params
  const data = JSON.parse(readFileSync(join(process.cwd(), 'scripts/.import-samples/converted', `${name}.json`), 'utf8'))
  const quotes = new Map<string, any>(data.testimonials.map((t: any) => [t._id, {quote: t.quote, name: t.name, role: t.role, company: t.company, photo: t.photo?.src, logo: t.logo ? {url: t.logo.src, name: t.logo.alt} : undefined}]))
  const doc = toPreview(data.doc, quotes)
  const site = doc.chrome === 'site'
  return (
    <>
      {site ? <SiteHeader /> : <LpHeader button={doc.headerButton} />}
      <main className="flex-1">
        <LandingSections sections={doc.sections as LpSection[]} />
      </main>
      {site ? <SiteFooter /> : <LpFooter />}
      {doc.floatingBookButton && <FloatingBookButton />}
    </>
  )
}
