import {HELP_BASE_PATH, ZENDESK_PUBLIC_ORIGIN} from './zendesk'

/**
 * Prepares a Zendesk article body for goiguide.com/help.
 *
 * The body is HTML written by the support team in Zendesk's editor (Zendesk
 * already strips unsafe markup on save). We only:
 * - point links to other Help Center articles, sections and categories at
 *   their /help page (anchors kept), so readers stay on goiguide.com
 * - keep everything else that is Zendesk's (requests, sign-in, attachments)
 *   on help.youriguide.com, made absolute
 * - load protocol-relative embeds (YouTube, tours) over https
 * - lazy-load images and iframes
 * - drop <script>/<style> blocks as a safety net
 */
const HC_PAGE = /^(?:https?:\/\/(?:help\.youriguide\.com|iguide\.zendesk\.com|support\.youriguide\.com))?\/hc(?:\/[a-z]{2}(?:-[a-z]{2})?)?\/(articles|sections|categories)\/(\d+[^"#?]*)([?#][^"]*)?$/i

export function rewriteHelpUrl(url: string): string {
  const trimmed = url.trim()
  const page = HC_PAGE.exec(trimmed)
  if (page) {
    const [, kind, slug, rest = ''] = page
    // Keep #anchors; drop Zendesk query strings
    const hash = rest.includes('#') ? rest.slice(rest.indexOf('#')) : ''
    return `${HELP_BASE_PATH}/${kind.toLowerCase()}/${slug}${hash}`
  }
  if (trimmed.startsWith('//')) return `https:${trimmed}`
  // Other root-relative Zendesk paths (/hc/article_attachments/…, /hc/en-us/requests/new, /requests/new)
  if (trimmed.startsWith('/')) return `${ZENDESK_PUBLIC_ORIGIN}${trimmed}`
  return trimmed
}

export function prepareArticleBody(html: string): string {
  return html
    .replace(/<(script|style)\b[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/\s(href|src)=(["'])(.*?)\2/gi, (_m, attr: string, q: string, value: string) => ` ${attr}=${q}${rewriteHelpUrl(value)}${q}`)
    .replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"')
    .replace(/<iframe\b(?![^>]*\bloading=)/gi, '<iframe loading="lazy"')
}

/** Zendesk wraps search matches in <em>; keep only that tag */
export function safeSnippet(snippet: string): string {
  return snippet
    .replace(/<(?!\/?em>)[^>]*>/gi, '')
    .replace(/<em>/gi, '<mark>')
    .replace(/<\/em>/gi, '</mark>')
}
