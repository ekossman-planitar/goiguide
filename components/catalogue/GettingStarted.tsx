'use client'

import {ArrowRight} from '@/components/ui/icons'
import {Check, Copy, Download, ExternalLink, Play} from 'lucide-react'
import {useState} from 'react'
import {catalogueAssets, catalogueDemoTours, catalogueStarterKit} from '@/lib/content/marketingCatalogue'

/*
 * Sections of /support/marketing-catalogue/getting-started: three steps for new
 * operators (StarterSteps) and copyable embed codes for demo tours they can put
 * on their website before they have a property of their own (DemoTours).
 * GTM: .catalogue-embed-copy and .catalogue-embed-preview (data-tour); starter downloads use
 * the catalogue's .catalogue-download (data-asset).
 */

const embedCode = (src: string, title: string) =>
  `<iframe src="${src}" title="${title}" width="100%" height="560" style="border:0;" allow="fullscreen; xr-spatial-tracking" allowfullscreen></iframe>`

function DemoTour({tour}: {tour: (typeof catalogueDemoTours)[number]}) {
  const [preview, setPreview] = useState(false)
  const [copied, setCopied] = useState(false)
  const code = embedCode(tour.src, `iGuide 3D tour: ${tour.label}`)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: the code stays selectable below */
    }
  }
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-surface">
        {preview ? (
          <iframe
            src={tour.src}
            title={`iGuide 3D tour: ${tour.label}`}
            allow="fullscreen; xr-spatial-tracking"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPreview(true)}
            data-tour={tour.id}
            className="catalogue-embed-preview group absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
          >
            <span className="inline-flex items-center gap-3 rounded-full bg-white py-2 pr-5 pl-2 font-semibold text-ink shadow-md transition-colors group-hover:text-primary-hover">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors group-hover:bg-primary-hover">
                <Play aria-hidden width={16} height={16} className="ml-0.5" fill="currentColor" />
              </span>
              Preview tour
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-semibold text-ink">{tour.label}</h3>
        <p className="mt-1 text-sm leading-5 text-body">{tour.description}</p>
        <div className="mt-auto flex flex-col pt-4">
          <label className="text-xs font-semibold tracking-wide text-muted uppercase" htmlFor={`embed-${tour.id}`}>
            Embed code
          </label>
          <textarea
            id={`embed-${tour.id}`}
            readOnly
            rows={3}
            value={code}
            onFocus={(e) => e.currentTarget.select()}
            className="mt-1 w-full resize-none rounded-lg border border-line bg-surface p-3 font-mono text-xs leading-5 text-ink"
          />
          <button
            type="button"
            onClick={copy}
            data-tour={tour.id}
            className="catalogue-embed-copy mt-3 inline-flex cursor-pointer items-center gap-1.5 self-start rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
          >
            {copied ? <Check aria-hidden width={16} height={16} /> : <Copy aria-hidden width={16} height={16} />}
            {copied ? 'Copied' : 'Copy embed code'}
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? 'Embed code copied' : ''}
          </span>
        </div>
      </div>
    </article>
  )
}

/** Three steps for new operators; step 1 links to the demo tours further down the page */
export function StarterSteps({demoTourAnchor}: {demoTourAnchor: string}) {
  const assets = new Map(catalogueAssets.map((a) => [a.id, a]))
  return (
    <ol className="grid gap-6 lg:grid-cols-3">
      <li className="rounded-2xl bg-surface p-6">
        <p className="text-sm font-semibold text-muted">Step 1</p>
        <h3 className="mt-1 text-xl font-semibold text-ink">Show a demo tour on your website</h3>
        <p className="mt-2 text-base leading-6 text-body">No property of your own to show yet? Embed one of our demo tours.</p>
        <a href={`#${demoTourAnchor}`} className="mt-4 text-link text-sm">
          Get an embed code
          <ArrowRight width={14} height={14} />
        </a>
      </li>
      {catalogueStarterKit.map((step, i) => (
        <li key={step.title} className="rounded-2xl bg-surface p-6">
          <p className="text-sm font-semibold text-muted">Step {i + 2}</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">{step.title}</h3>
          <p className="mt-2 text-base leading-6 text-body">{step.text}</p>
          <ul className="mt-4 space-y-2">
            {step.assetIds.map((id) => {
              const a = assets.get(id)
              if (!a) return null
              return (
                <li key={id}>
                  <a
                    href={a.files[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-asset={a.title}
                    data-category={a.category}
                    className="catalogue-download inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
                  >
                    <Download aria-hidden width={15} height={15} />
                    {a.title}
                    <span className="sr-only">, opens in a new tab</span>
                  </a>
                </li>
              )
            })}
            {step.links?.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
                >
                  <ExternalLink aria-hidden width={15} height={15} />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

/** Demo tour cards: preview + copyable embed code */
export function DemoTours() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {catalogueDemoTours.map((t) => (
        <DemoTour key={t.id} tour={t} />
      ))}
    </div>
  )
}
