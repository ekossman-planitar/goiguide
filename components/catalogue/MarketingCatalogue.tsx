'use client'

import Image from 'next/image'
import {Archive, ArrowRight, Download, ExternalLink, FileText, Film, Play, Presentation, Search, X, type LucideIcon} from 'lucide-react'
import {useEffect, useMemo, useState} from 'react'
import {cn} from '@/lib/cn'
import {
  catalogueAssets,
  catalogueAudiences,
  catalogueCampaigns,
  catalogueCategories,
  YOUTUBE_CHANNEL_URL,
  type CatalogueCampaignId,
  type CatalogueAsset,
  type CatalogueAudience,
  type CatalogueFile,
} from '@/lib/content/marketingCatalogue'

/*
 * Marketing Catalogue browser: search, "who it's for" filter, and an in-page
 * category menu (sticky sidebar on desktop, scrolling chips on phones) that
 * highlights the section you're reading.
 * GTM: download links have .catalogue-download with data-asset, data-category, data-version.
 */

const formatIcon: Record<string, LucideIcon> = {PDF: FileText, PPTX: Presentation, ZIP: Archive, MP4: Film, MOV: Film, YOUTUBE: Play}
const formatLabel: Record<string, string> = {PDF: 'PDF', PPTX: 'PowerPoint', ZIP: 'ZIP', MP4: 'MP4 video', MOV: 'MOV video', YOUTUBE: 'YouTube video'}

const normalise = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

function DownloadLink({asset, file, single}: {asset: CatalogueAsset; file: CatalogueFile; single: boolean}) {
  return (
    <a
      href={file.href}
      target="_blank"
      rel="noopener noreferrer"
      data-asset={asset.title}
      data-category={asset.category}
      data-version={single ? undefined : file.label}
      className={cn(
        'catalogue-download inline-flex items-center gap-1.5 rounded-lg border font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        single
          ? 'border-primary bg-primary px-4 py-2 text-sm text-white hover:border-primary-hover hover:bg-primary-hover'
          : 'border-primary bg-white px-3 py-1.5 text-sm text-primary hover:border-primary-hover hover:text-primary-hover',
      )}
    >
      <Download aria-hidden width={16} height={16} />
      {single ? 'Download' : file.label}
      <span className="sr-only">
        {' '}
        {asset.title}
        {single ? '' : ` (${file.label})`}, {formatLabel[file.format] ?? file.format}, opens in a new tab
      </span>
    </a>
  )
}

/** Card preview: the original catalogue image, or the format icon if there is none */
function Preview({asset, icon: Icon}: {asset: CatalogueAsset; icon: LucideIcon}) {
  const img = asset.image
  // Tall (reels) and very wide (banners) previews are shown whole rather than cropped
  const fit = img && (img.height > img.width || img.width / img.height > 1.9)
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-surface">
      {img ? (
        <Image
          src={img.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
          className={cn('transition-transform duration-500 group-hover:scale-[1.03]', fit ? 'object-contain' : 'object-cover object-top')}
        />
      ) : (
        <span aria-hidden className="absolute inset-0 flex items-center justify-center text-muted">
          <Icon width={40} height={40} />
        </span>
      )}
      <span aria-hidden className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 text-ink shadow-sm">
        <Icon width={18} height={18} />
      </span>
    </div>
  )
}

/** YouTube card: thumbnail with a play button that loads the video in place (privacy-enhanced embed) */
function YouTubeCard({asset}: {asset: CatalogueAsset}) {
  const [playing, setPlaying] = useState(false)
  const id = asset.youtubeId!
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-ink">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={asset.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            data-asset={asset.title}
            className="catalogue-video-play group absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own thumbnail */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" loading="lazy" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors group-hover:bg-primary-hover">
                <Play aria-hidden width={24} height={24} className="ml-0.5" fill="currentColor" />
              </span>
            </span>
            <span className="sr-only">Play video: {asset.title}</span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-semibold text-ink">{asset.title}</h3>
        <p className="mt-1 text-sm text-muted">YouTube video</p>
        {asset.description && <p className="mt-2 text-sm leading-5 text-body">{asset.description}</p>}
        <a
          href={asset.files[0].href}
          target="_blank"
          rel="noopener noreferrer"
          data-asset={asset.title}
          data-category={asset.category}
          className="catalogue-download mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
        >
          Open on YouTube <ExternalLink aria-hidden width={14} height={14} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  )
}

function AssetCard({asset}: {asset: CatalogueAsset}) {
  if (asset.youtubeId) return <YouTubeCard asset={asset} />
  const formats = [...new Set(asset.files.map((f) => f.format))]
  const Icon = formatIcon[formats[0]] ?? FileText
  const single = asset.files.length === 1
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      <Preview asset={asset} icon={Icon} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-semibold text-ink">{asset.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {formats.map((f) => formatLabel[f] ?? f).join(' / ')}
          {asset.note && ` · ${asset.note}`}
          {!single && ` · ${asset.files.length} versions`}
        </p>
        {asset.description && <p className="mt-2 text-sm leading-5 text-body">{asset.description}</p>}
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {asset.files.map((file) => (
            <DownloadLink key={file.href} asset={asset} file={file} single={single} />
          ))}
        </div>
      </div>
    </article>
  )
}

/** Text a search query is matched against: title, group, file labels/formats and category */
function assetSearchText(a: CatalogueAsset) {
  const files = a.files.map((f) => `${f.label} ${f.format}`).join(' ')
  const category = catalogueCategories.find((c) => c.id === a.category)?.label
  return normalise(`${a.title} ${a.group ?? ''} ${files} ${category}`)
}

export function MarketingCatalogue() {
  const [query, setQuery] = useState('')
  const [audience, setAudience] = useState<CatalogueAudience | 'all'>('all')
  const [campaign, setCampaign] = useState<CatalogueCampaignId | null>(null)
  const activeCampaign = catalogueCampaigns.find((c) => c.id === campaign)
  const [current, setCurrent] = useState<string>(catalogueCategories[0].id)

  const visible = useMemo(() => {
    const q = normalise(query.trim())
    return catalogueAssets.filter(
      (a) =>
        (audience === 'all' || a.audiences.includes(audience)) &&
        (!campaign || a.campaign === campaign) &&
        (!q || assetSearchText(a).includes(q)),
    )
  }, [query, audience, campaign])

  const sections = catalogueCategories
    .map((c) => ({...c, assets: visible.filter((a) => a.category === c.id)}))
    .filter((c) => c.assets.length)

  // Highlight the category being read in the in-page menu
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setCurrent(top.target.id.replace('mc-', ''))
      },
      {rootMargin: '-120px 0px -60% 0px'},
    )
    document.querySelectorAll('[data-mc-section]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [query, audience, campaign])

  // Phones: keep the highlighted chip visible in the scrolling menu
  useEffect(() => {
    const chip = document.querySelector<HTMLElement>(`[data-mc-chip="${current}"]`)
    const row = chip?.closest('ul')
    if (chip && row) row.scrollTo({left: chip.offsetLeft - 16, behavior: 'smooth'})
  }, [current])

  const filtered = query.trim() !== '' || audience !== 'all' || !!campaign
  const reset = () => {
    setQuery('')
    setAudience('all')
    setCampaign(null)
  }
  const pickCampaign = (id: CatalogueCampaignId | null) => {
    setCampaign(id)
    document.getElementById('mc-results')?.scrollIntoView({behavior: 'smooth', block: 'start'})
  }

  const chip = 'shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors'

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      {/* Filters + in-page menu */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <label htmlFor="mc-search" className="text-sm font-semibold text-ink">
          Search the catalogue
        </label>
        <div className="relative mt-2">
          <Search aria-hidden width={18} height={18} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
          <input
            id="mc-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Site Plans, brochure"
            className="h-12 w-full rounded-lg border border-muted bg-white pr-3 pl-10 text-base text-ink focus:border-primary focus:outline-2 focus:outline-offset-1 focus:outline-primary"
          />
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-ink">Who it’s for</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[{id: 'all' as const, label: 'Everyone'}, ...catalogueAudiences].map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={audience === a.id}
                onClick={() => setAudience(a.id)}
                className={cn(chip, audience === a.id ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink hover:border-primary-hover hover:text-primary-hover')}
              >
                {a.label}
              </button>
            ))}
          </div>
        </fieldset>

        <nav aria-label="Catalogue sections" className="mt-8 hidden lg:block">
          <p className="text-sm font-semibold text-ink">Jump to</p>
          <ul className="mt-2 space-y-0.5 border-l border-line">
            {catalogueCategories.map((c) => {
              const count = visible.filter((a) => a.category === c.id).length
              return (
                <li key={c.id}>
                  {count ? (
                    <a
                      href={`#mc-${c.id}`}
                      aria-current={current === c.id ? 'location' : undefined}
                      className={cn(
                        '-ml-px flex items-center justify-between border-l-2 py-1.5 pr-1 pl-4 text-[15px] transition-colors',
                        current === c.id ? 'border-primary-hover font-semibold text-ink' : 'border-transparent text-body hover:text-primary-hover',
                      )}
                    >
                      {c.label}
                      <span className="text-sm text-muted">{count}</span>
                    </a>
                  ) : (
                    <span className="-ml-px flex items-center justify-between border-l-2 border-transparent py-1.5 pr-1 pl-4 text-[15px] text-muted/60">
                      {c.label}
                      <span className="text-sm">0</span>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      <div className="min-w-0">
        {/* Phones and tablets: scrolling section menu */}
        <nav aria-label="Catalogue sections" className="sticky top-[72px] z-10 -mx-4 mb-8 border-b border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <ul className="flex gap-2 overflow-x-auto">
            {sections.map((c) => (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#mc-${c.id}`}
                  data-mc-chip={c.id}
                  aria-current={current === c.id ? 'location' : undefined}
                  className={cn(chip, 'inline-block', current === c.id ? 'border-primary bg-primary text-white' : 'border-line bg-white text-ink')}
                >
                  {c.label} <span className={current === c.id ? 'text-white/80' : 'text-muted'}>{c.assets.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Campaign kits: one click shows everything for a campaign together */}
        <div id="mc-results" className="scroll-mt-36 lg:scroll-mt-28">
          {activeCampaign ? (
            <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-surface p-5 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold tracking-wide text-muted uppercase">Campaign kit</p>
                <h2 className="mt-1 text-2xl leading-tight font-semibold text-ink">{activeCampaign.label}</h2>
                <p className="mt-2 text-base text-body">{activeCampaign.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setCampaign(null)}
                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 self-start rounded-lg border border-primary bg-white px-4 py-2 text-sm font-semibold text-primary hover:border-primary-hover hover:text-primary-hover sm:self-center"
              >
                <X aria-hidden width={16} height={16} /> Show everything
              </button>
            </div>
          ) : (
            <div className="mb-10">
              <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Campaign kits</h2>
              <ul className="mt-3 grid gap-3 md:grid-cols-3">
                {catalogueCampaigns.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => pickCampaign(c.id)}
                      data-campaign={c.id}
                      className="catalogue-campaign group flex h-full w-full cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white p-3 text-left transition-colors hover:border-primary-hover"
                    >
                      <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-surface">
                        <Image src={c.image} alt="" fill sizes="80px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] leading-snug font-semibold text-ink group-hover:text-primary-hover">{c.label}</span>
                        <span className="mt-1 inline-flex items-center gap-1 text-sm text-muted">
                          {catalogueAssets.filter((a) => a.campaign === c.id).length} items
                          <ArrowRight width={14} height={14} />
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="mb-6 text-sm text-muted" aria-live="polite">
          {filtered ? `${visible.length} of ${catalogueAssets.length} resources match` : `${catalogueAssets.length} resources`}
          {filtered && (
            <button type="button" onClick={reset} className="ml-3 text-link gap-1">
              <X aria-hidden width={14} height={14} /> Clear filters
            </button>
          )}
        </p>

        {sections.length === 0 ? (
          <div className="rounded-2xl bg-surface px-6 py-12 text-center">
            <p className="text-xl font-semibold text-ink">No resources match</p>
            <p className="mt-2 text-body">Try another search or show resources for everyone.</p>
            <button type="button" onClick={reset} className="mt-6 cursor-pointer rounded-lg border border-primary px-5 py-2.5 font-semibold text-primary hover:border-primary-hover hover:text-primary-hover">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-14">
            {sections.map((c) => {
              const groups = [...new Set(c.assets.map((a) => a.group ?? ''))]
              return (
                <section key={c.id} id={`mc-${c.id}`} data-mc-section aria-labelledby={`mc-${c.id}-h`} className="scroll-mt-36 lg:scroll-mt-28">
                  <div className="border-b border-line pb-3">
                    <h2 id={`mc-${c.id}-h`} className="text-[26px] leading-tight font-semibold text-ink md:text-[32px]">
                      {c.label}
                    </h2>
                    <p className="mt-1 text-base text-muted">{c.description}</p>
                    {c.id === 'videos' && (
                      <a
                        href={YOUTUBE_CHANNEL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary-hover"
                      >
                        Masterclasses, Tips that Click and more on our YouTube channel <ExternalLink aria-hidden width={14} height={14} />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                  {groups.map((g) => (
                    <div key={g || 'all'} className="mt-6">
                      {g && groups.length > 1 && <h3 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">{g}</h3>}
                      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {c.assets
                          .filter((a) => (a.group ?? '') === g)
                          .map((a) => (
                            <li key={a.id}>
                              <AssetCard asset={a} />
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
