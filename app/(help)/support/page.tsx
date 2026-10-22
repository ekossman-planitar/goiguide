import type {Metadata} from 'next'
import {MessageSquare} from 'lucide-react'
import type {EventCardData} from '@/components/events/types'
import {HelpCta} from '@/components/help/HelpCta'
import {HelpSearchForm} from '@/components/help/HelpSearchForm'
import {HomeCommunity} from '@/components/help/HomeCommunity'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {categoryIcons, defaultCategoryIcon, productCards, SPOTLIGHT_SECTION_ID} from '@/lib/help/explore'
import {longDate, timeAgo} from '@/lib/help/format'
import {forumLinks, getFeaturedBadges, getForumStats, getLatestTopics} from '@/lib/help/forum'
import {topArticles, zendeskLinks} from '@/lib/help/navigation'
import {articlePath, categoryPath, getArticles, getCategories, getSections, sectionPath} from '@/lib/help/zendesk'
import {pageMetadata} from '@/lib/pageMetadata'
import {fetchSanity} from '@/sanity/lib/fetch'
import {UPCOMING_EVENTS_QUERY} from '@/sanity/lib/queries'

// Refresh from Zendesk and the forum every 2 minutes (must be a literal; keep in step with HELP_REVALIDATE)
export const revalidate = 120

export const metadata: Metadata = pageMetadata({
  title: 'iGuide Help Center',
  description: 'How-to guides and answers for iGuide cameras, the PLANIX app, Stitch, the iGuide Portal, pricing and billing.',
  path: '/support',
})

const compact = new Intl.NumberFormat('en', {notation: 'compact', maximumFractionDigits: 1})
const external = {target: '_blank', rel: 'noopener noreferrer'}

/**
 * Help Center homepage (layout inspired by community hubs like forum.asana.com, Evan 2026-10-20):
 * hero with search and stats, categories, products, community conversations
 * with badges and events, product updates, recently added articles.
 */
export default async function HelpHome() {
  const [categories, sections, articles, topics, stats, badges, events] = await Promise.all([
    getCategories(),
    getSections(),
    getArticles(),
    getLatestTopics(8),
    getForumStats(),
    getFeaturedBadges(),
    fetchSanity<EventCardData[]>(UPCOMING_EVENTS_QUERY, []),
  ])
  const sectionById = new Map(sections.map((s) => [s.id, s]))
  const categoryOf = (sectionId: number) => sectionById.get(sectionId)?.category_id
  const articlesIn = (sectionIds: Set<number>) => articles.filter((a) => sectionIds.has(a.section_id)).length
  /** A section plus its nested sections */
  const withChildren = (id: number) => new Set([id, ...sections.filter((s) => s.parent_section_id === id).map((s) => s.id)])

  const recent = [...articles].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5)
  const spotlight = articles
    .filter((a) => a.section_id === SPOTLIGHT_SECTION_ID)
    .sort((a, b) => b.edited_at.localeCompare(a.edited_at))
    .slice(0, 3)
  const products = productCards.flatMap((p) => {
    const section = sectionById.get(p.sectionId)
    return section ? [{...p, href: sectionPath(section), count: articlesIn(withChildren(section.id))}] : []
  })

  const heroStats = [
    {label: 'Help articles', value: articles.length},
    ...(stats ? [{label: 'Community members', value: stats.members}, {label: 'Community posts', value: stats.posts}] : []),
  ]

  return (
    <>
      {/* Hero: search, top articles, stats */}
      <section className="bg-primary text-white">
        <Container className="py-10 lg:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-3xl">
              <h1 className="text-balance text-[36px] leading-tight font-semibold md:text-[48px]">Welcome to the iGuide Help Center</h1>
              <p className="mt-3 text-lg leading-7 text-white/80">Find articles and discussions to help answer your iGuide questions</p>
              <HelpSearchForm size="lg" className="mt-6 max-w-2xl" />
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[15px]">
                <span className="font-semibold">Top articles:</span>
                {topArticles.map((t) => (
                  <SmartLink
                    key={t.href}
                    href={t.href}
                    className="help-top-article rounded-full border border-white/30 px-3 py-1 text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
                  >
                    {t.label}
                  </SmartLink>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 lg:items-end">
              <dl className="hidden gap-8 sm:flex">
                {heroStats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse">
                    <dt className="text-sm text-white/70">{s.label}</dt>
                    <dd className="font-display text-3xl font-semibold">{compact.format(s.value)}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-3">
                <a
                  href={zendeskLinks.submitRequest}
                  className="help-submit-request inline-flex items-center rounded-lg border border-white bg-white px-5 py-2.5 font-semibold text-ink transition-colors hover:border-primary-hover hover:bg-primary-hover hover:text-white"
                >
                  Submit a request
                </a>
                <a
                  href={forumLinks.newTopic}
                  className="help-ask-community inline-flex items-center gap-2 rounded-lg border border-white/60 px-5 py-2.5 font-semibold text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
                  {...external}
                >
                  <MessageSquare aria-hidden width={18} height={18} />
                  Ask the community
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Row 1: Zendesk categories */}
      <section aria-labelledby="help-categories" className="pt-10 pb-12 lg:pb-14">
        <Container>
          <h2 id="help-categories" className="text-[24px] leading-tight font-semibold text-ink md:text-[28px]">
            Browse by topic
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {categories.map((c) => {
              const Icon = categoryIcons[c.id] ?? defaultCategoryIcon
              const count = articles.filter((a) => categoryOf(a.section_id) === c.id).length
              return (
                <li key={c.id}>
                  <SmartLink
                    href={categoryPath(c)}
                    className="help-category-card group flex h-full flex-col rounded-2xl border border-line bg-white p-4 shadow-[0_2px_4px_rgba(0,0,0,0.075)] transition-colors hover:border-primary-hover"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary-hover group-hover:text-white">
                      <Icon aria-hidden size={20} strokeWidth={1.75} />
                    </span>
                    <span className="mt-3 font-display text-[17px] leading-snug font-semibold text-ink group-hover:text-primary-hover">{c.name}</span>
                    {c.description && <span className="mt-1 text-sm leading-5 text-muted">{c.description}</span>}
                    <span className="mt-auto pt-3 text-xs font-semibold tracking-wide text-muted uppercase">{count} articles</span>
                  </SmartLink>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* Row 2: products */}
      {products.length > 0 && (
        <section aria-labelledby="help-products" className="pb-14 lg:pb-16">
          <Container>
            <h2 id="help-products" className="text-[24px] leading-tight font-semibold text-ink md:text-[28px]">
              Explore by product
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <li key={p.sectionId}>
                  <SmartLink
                    href={p.href}
                    data-product={p.label}
                    className="help-product-card group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-primary-hover"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary-hover group-hover:text-white">
                      <p.icon aria-hidden size={20} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink group-hover:text-primary-hover">{p.label}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-muted">{p.description}</span>
                      <span className="mt-2 block text-xs font-semibold tracking-wide text-muted uppercase">{p.count} articles</span>
                    </span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <HomeCommunity topics={topics} stats={stats} badges={badges} events={events.slice(0, 3)} />

      {/* Product updates spotlight */}
      {spotlight.length > 0 && (
        <section aria-labelledby="help-spotlight" className="py-14 lg:py-16">
          <Container>
            <h2 id="help-spotlight" className="text-[28px] leading-tight font-semibold text-ink md:text-[36px]">
              Product updates
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {spotlight.map((a) => (
                <li key={a.id}>
                  <SmartLink
                    href={articlePath(a)}
                    className="help-spotlight group flex h-full flex-col rounded-2xl bg-surface p-6 transition-colors hover:bg-primary hover:text-white"
                  >
                    <span className="text-xs font-semibold tracking-wide text-primary-hover uppercase">Updated {longDate(a.edited_at)}</span>
                    <span className="mt-3 font-display text-xl leading-snug font-semibold text-ink group-hover:text-white">{a.title}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
                      Read more
                      <ArrowRight width={16} height={16} />
                    </span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Recently added */}
      {recent.length > 0 && (
        <section aria-labelledby="help-recent" className={spotlight.length > 0 ? 'pb-14 lg:pb-16' : 'py-14 lg:py-16'}>
          <Container>
            <h2 id="help-recent" className="text-[28px] leading-tight font-semibold text-ink md:text-[36px]">
              Recently added articles
            </h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {recent.map((a) => {
                const section = sectionById.get(a.section_id)
                return (
                  <li key={a.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      {section && (
                        <SmartLink href={sectionPath(section)} className="text-sm text-muted hover:text-primary-hover">
                          {section.name}
                        </SmartLink>
                      )}
                      <SmartLink href={articlePath(a)} className="help-recent-article block font-semibold text-ink hover:text-primary-hover">
                        {a.title}
                      </SmartLink>
                    </div>
                    <span className="shrink-0 text-sm text-muted">Article created {timeAgo(a.created_at)}</span>
                  </li>
                )
              })}
            </ul>
          </Container>
        </section>
      )}

      <HelpCta />
    </>
  )
}
