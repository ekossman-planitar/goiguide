import type {NextRequest} from 'next/server'
import {articlePath, getSections, searchArticles} from '@/lib/help/zendesk'

/**
 * Type-ahead suggestions for the Help Center search box (/support).
 * Asks Zendesk's own article search (public, no credentials) for the top
 * matches, so suggestions rank the same as the full results page.
 * GET /api/support-search?query=stitch → {results: [{title, href, section}]}
 */
const MIN_LENGTH = 2
const LIMIT = 6

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get('query') ?? '').trim().slice(0, 100)
  if (query.length < MIN_LENGTH) return Response.json({results: []})
  try {
    const [{results}, sections] = await Promise.all([searchArticles(query, 1, LIMIT), getSections().catch(() => [])])
    const sectionName = new Map(sections.map((s) => [s.id, s.name]))
    return Response.json(
      {results: results.map((r) => ({title: r.title, href: articlePath(r), section: sectionName.get(r.section_id) ?? null}))},
      // Browsers and the CDN reuse the same query's answer for a couple of minutes
      {headers: {'cache-control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=600'}},
    )
  } catch (error) {
    console.error('[support-search] suggestions failed', error)
    return Response.json({results: []}, {status: 502})
  }
}
