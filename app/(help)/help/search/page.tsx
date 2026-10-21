import type {Metadata} from 'next'
import {HelpCta} from '@/components/help/HelpCta'
import {HelpSubnav} from '@/components/help/HelpSubnav'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {safeSnippet} from '@/lib/help/html'
import {zendeskLinks} from '@/lib/help/navigation'
import {articlePath, getSections, searchArticles, sectionPath, type HelpSearchResult} from '@/lib/help/zendesk'

/** Search results aren't indexed (same as Zendesk's search page) */
export const metadata: Metadata = {
  title: 'Search results | iGuide Help Center',
  robots: {index: false, follow: true},
  alternates: {canonical: '/help/search'},
}

type Props = {searchParams: Promise<{query?: string | string[]; page?: string | string[]}>}

const one = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v)

function resultsSummary(query: string, failed: boolean, count: number) {
  if (!query) return 'Enter a word or phrase in the search box above.'
  if (failed) return 'Search isn’t available right now. Please try again in a moment.'
  return `${count} ${count === 1 ? 'result' : 'results'} for “${query}”`
}

export default async function SearchPage({searchParams}: Readonly<Props>) {
  const params = await searchParams
  const query = (one(params.query) ?? '').trim().slice(0, 200)
  const page = Math.max(1, Number.parseInt(one(params.page) ?? '1', 10) || 1)

  let results: HelpSearchResult[] = []
  let count = 0
  let pageCount = 0
  let failed = false
  if (query) {
    try {
      ;({results, count, pageCount} = await searchArticles(query, page))
    } catch (error) {
      console.error('[help] search failed', error)
      failed = true
    }
  }
  const sections = results.length ? await getSections().catch(() => []) : []
  const sectionById = new Map(sections.map((s) => [s.id, s]))
  const pageHref = (p: number) => `/help/search?${new URLSearchParams({query, page: String(p)})}`

  return (
    <>
      <HelpSubnav crumbs={[{label: 'Search results', href: '/help/search'}]} query={query} />
      <section className="py-12 lg:py-16">
        <Container size="medium">
          <h1 className="text-[36px] leading-tight font-semibold text-ink md:text-[48px]">Search results</h1>
          <p className="mt-3 text-lg text-muted" aria-live="polite">
            {resultsSummary(query, failed, count)}
          </p>

          {results.length > 0 && (
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {results.map((r) => {
                const section = sectionById.get(r.section_id)
                return (
                  <li key={r.id} className="py-5">
                    <SmartLink href={articlePath(r)} className="help-search-result font-display text-xl font-semibold text-ink hover:text-primary-hover">
                      {r.title}
                    </SmartLink>
                    {section && (
                      <p className="mt-1 text-sm">
                        <SmartLink href={sectionPath(section)} className="text-muted hover:text-primary-hover">
                          {section.name}
                        </SmartLink>
                      </p>
                    )}
                    <p className="help-snippet mt-2 text-[15px] leading-6 text-body" dangerouslySetInnerHTML={{__html: safeSnippet(r.snippet)}} />
                  </li>
                )
              })}
            </ol>
          )}

          {pageCount > 1 && (
            <nav aria-label="Search result pages" className="mt-8 flex items-center justify-between">
              {page > 1 ? (
                <SmartLink href={pageHref(page - 1)} className="font-semibold text-primary hover:text-primary-hover">
                  ← Previous
                </SmartLink>
              ) : (
                <span />
              )}
              <span className="text-sm text-muted">
                Page {page} of {pageCount}
              </span>
              {page < pageCount ? (
                <SmartLink href={pageHref(page + 1)} className="font-semibold text-primary hover:text-primary-hover">
                  Next →
                </SmartLink>
              ) : (
                <span />
              )}
            </nav>
          )}

          {query && !failed && count === 0 && (
            <p className="mt-8 text-body">
              Can’t find what you’re looking for?{' '}
              <a href={zendeskLinks.submitRequest} className="help-submit-request font-semibold underline underline-offset-2 hover:text-primary-hover">
                Submit a request
              </a>.
            </p>
          )}
        </Container>
      </section>
      <HelpCta />
    </>
  )
}
