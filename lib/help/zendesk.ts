/**
 * Help Center content, read from Zendesk Guide's public Help Center API.
 * Zendesk stays the CMS: the support team keeps writing articles there, and
 * Copilot, AI agents and article-suggestion triggers keep working. This site
 * only displays the public (signed-out) articles, so no credentials are used.
 *
 * Pages refresh on a timer (HELP_REVALIDATE), so edits in Zendesk show up
 * here within a few minutes without a deploy.
 */

/** Zendesk Help Center origin. Override with ZENDESK_HELP_CENTER_ORIGIN (e.g. a local mock). */
export const ZENDESK_ORIGIN = process.env.ZENDESK_HELP_CENTER_ORIGIN ?? 'https://help.youriguide.com'
/** The Help Center the support team signs in to (tickets, requests and sign-in stay here). */
export const ZENDESK_PUBLIC_ORIGIN = 'https://help.youriguide.com'
export const HELP_LOCALE = 'en-us'
/** Seconds a Zendesk response is reused before it is fetched again. */
export const HELP_REVALIDATE = 120
export const HELP_BASE_PATH = '/help'

export type HelpCategory = {id: number; name: string; description: string; position: number; created_at: string; html_url: string}
export type HelpSection = HelpCategory & {category_id: number; parent_section_id: number | null; sorting: string}
export type HelpArticle = {
  id: number
  title: string
  html_url: string
  section_id: number
  position: number
  promoted: boolean
  created_at: string
  updated_at: string
  edited_at: string
  label_names: string[]
  body: string
}
/** Article without its body, for listings */
export type HelpArticleSummary = Omit<HelpArticle, 'body'>
export type HelpSearchResult = HelpArticleSummary & {snippet: string}

async function zendesk<T>(path: string): Promise<T> {
  const res = await fetch(`${ZENDESK_ORIGIN}${path}`, {next: {revalidate: HELP_REVALIDATE, tags: ['help']}, headers: {accept: 'application/json'}})
  if (!res.ok) throw new ZendeskError(res.status, path)
  return res.json() as Promise<T>
}

export class ZendeskError extends Error {
  constructor(
    public status: number,
    path: string,
  ) {
    super(`Zendesk Help Center request failed (${status}): ${path}`)
  }
}

/** Follows next_page links. Small pages keep each cached response well under Next's 2 MB data-cache limit. */
async function paged<T>(path: string, key: string): Promise<T[]> {
  const out: T[] = []
  let next: string | null = path
  while (next) {
    const page: Record<string, unknown> & {next_page: string | null} = await zendesk(next)
    out.push(...((page[key] as T[]) ?? []))
    next = page.next_page ? page.next_page.replace(/^https?:\/\/[^/]+/, '') : null
  }
  return out
}

/** Zendesk's manual order: position, then newest first (matches help.youriguide.com) */
const byPosition = <T extends {position: number; created_at: string}>(a: T, b: T) =>
  a.position - b.position || b.created_at.localeCompare(a.created_at)

export async function getCategories(): Promise<HelpCategory[]> {
  const items = await paged<HelpCategory>(`/api/v2/help_center/${HELP_LOCALE}/categories.json?per_page=100`, 'categories')
  return items.sort(byPosition)
}

export async function getSections(): Promise<HelpSection[]> {
  const items = await paged<HelpSection>(`/api/v2/help_center/${HELP_LOCALE}/sections.json?per_page=100`, 'sections')
  return items.sort(byPosition)
}

function withoutBody<T extends {body?: string}>(item: T): Omit<T, 'body'> {
  const copy = {...item}
  delete copy.body
  return copy
}

/** Every public article, without bodies */
export async function getArticles(): Promise<HelpArticleSummary[]> {
  const items = await paged<HelpArticle>(`/api/v2/help_center/${HELP_LOCALE}/articles.json?per_page=30`, 'articles')
  return items.map(withoutBody).sort(byPosition)
}

/** One public article with its body, or null if it doesn't exist (or isn't public) */
export async function getArticle(id: number): Promise<HelpArticle | null> {
  try {
    const {article} = await zendesk<{article: HelpArticle}>(`/api/v2/help_center/${HELP_LOCALE}/articles/${id}.json`)
    return article
  } catch (error) {
    if (error instanceof ZendeskError && (error.status === 404 || error.status === 401 || error.status === 403)) return null
    throw error
  }
}

/** Zendesk's own article search, so results match the Help Center's relevance */
export async function searchArticles(query: string, page = 1): Promise<{results: HelpSearchResult[]; count: number; pageCount: number}> {
  const params = new URLSearchParams({query, locale: HELP_LOCALE, per_page: '20', page: String(page)})
  const data = await zendesk<{results: (HelpArticle & {snippet: string})[]; count: number; page_count: number}>(
    `/api/v2/help_center/articles/search.json?${params}`,
  )
  return {results: data.results.map(withoutBody), count: data.count, pageCount: data.page_count}
}

/* ---------- URLs: same "id-slug" segments as Zendesk, under /help ---------- */

/** "27340515503506-Your-First-Scan" from a Zendesk html_url */
export const zendeskSlug = (htmlUrl: string) => decodeURIComponent(htmlUrl.split('/').pop() ?? '')

export const articlePath = (a: {html_url: string}) => `${HELP_BASE_PATH}/articles/${zendeskSlug(a.html_url)}`
export const sectionPath = (s: {html_url: string}) => `${HELP_BASE_PATH}/sections/${zendeskSlug(s.html_url)}`
export const categoryPath = (c: {html_url: string}) => `${HELP_BASE_PATH}/categories/${zendeskSlug(c.html_url)}`

/** Leading numeric id of a "123-some-slug" URL segment */
export function idFromSlug(slug: string): number | null {
  const match = /^(\d+)(?:-|$)/.exec(decodeURIComponent(slug))
  return match ? Number(match[1]) : null
}

/** Ancestors of a section, outermost first (sections can be nested) */
export function sectionTrail(section: HelpSection, sections: HelpSection[]): HelpSection[] {
  const trail: HelpSection[] = [section]
  let parent = section.parent_section_id
  while (parent) {
    const p = sections.find((s) => s.id === parent)
    if (!p || trail.includes(p)) break
    trail.unshift(p)
    parent = p.parent_section_id
  }
  return trail
}

/** Plain-text excerpt for meta descriptions (Zendesk uses the opening text too) */
export function excerpt(html: string, max = 155): string {
  const text = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > max ? `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…` : text
}
