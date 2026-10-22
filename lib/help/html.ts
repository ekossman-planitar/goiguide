import {helpArticleRedirects} from './redirects'
import {HELP_BASE_PATH, ZENDESK_PUBLIC_ORIGIN} from './zendesk'

/**
 * Prepares a Zendesk article body for goiguide.com/help.
 *
 * The body is HTML written by the support team in Zendesk's editor (Zendesk
 * already strips unsafe markup on save). We only:
 * - point links to other Help Center articles, sections and categories at
 *   their /support page (anchors kept), so readers stay on goiguide.com
 * - keep everything else that is Zendesk's (requests, sign-in, attachments)
 *   on help.youriguide.com, made absolute
 * - load protocol-relative embeds (YouTube, tours) over https
 * - lazy-load images and iframes
 * - drop <script>/<style> blocks as a safety net
 */
/** Zendesk Help Center origins; stripped before matching HC_PATH */
const HC_ORIGIN = /^https?:\/\/(?:help\.youriguide\.com|iguide\.zendesk\.com|support\.youriguide\.com)(?=\/)/i
/** Root-relative Help Center article/section/category path, optional locale */
const HC_PATH = /^\/hc(?:\/[a-z]{2}(?:-[a-z]{2})?)?\/(articles|sections|categories)\/(\d+[^"#?]*)([?#][^"]*)?$/i

export function rewriteHelpUrl(url: string): string {
  const trimmed = url.trim()
  const page = HC_PATH.exec(trimmed.replace(HC_ORIGIN, ''))
  if (page) {
    const [, kind, slug, rest = ''] = page
    // Keep #anchors; drop Zendesk query strings
    const hash = rest.includes('#') ? rest.slice(rest.indexOf('#')) : ''
    const moved = kind.toLowerCase() === 'articles' ? helpArticleRedirects[Number.parseInt(slug, 10)] : undefined
    if (moved) return moved
    return `${HELP_BASE_PATH}/${kind.toLowerCase()}/${slug}${hash}`
  }
  if (trimmed.startsWith('//')) return `https:${trimmed}`
  // Other root-relative Zendesk paths (/hc/article_attachments/…, /hc/en-us/requests/new, /requests/new)
  if (trimmed.startsWith('/')) return `${ZENDESK_PUBLIC_ORIGIN}${trimmed}`
  return trimmed
}

export function prepareArticleBody(html: string): string {
  return html
    .replaceAll(/<(script|style)\b[\s\S]*?<\/\1\s*>/gi, '')
    .replaceAll(/\s(href|src)=(["'])(.*?)\2/gi, (_m, attr: string, q: string, value: string) => ` ${attr}=${q}${rewriteHelpUrl(value)}${q}`)
    .replaceAll(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"')
    .replaceAll(/<iframe\b(?![^>]*\bloading=)/gi, '<iframe loading="lazy"')
}

/** Zendesk wraps search matches in <em>; keep only that tag */
export function safeSnippet(snippet: string): string {
  return snippet
    .replaceAll(/<(?!\/?em>)[^>]*>/gi, '')
    .replaceAll(/<em>/gi, '<mark>')
    .replaceAll(/<\/em>/gi, '</mark>')
}
