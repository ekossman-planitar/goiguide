/**
 * Points in-content links to the old Help Center hosts (help.youriguide.com,
 * support.youriguide.com) at the on-site Help Center (/support), so readers stay
 * on goiguide.com. Covers blog posts, landing pages and every other document.
 *
 * - /hc/en-us/articles|sections|categories/<id>… → /support/articles|sections|categories/<id>…
 *   (slug and #anchor kept; a bare id redirects to the current slug)
 * - Help Center home and support.youriguide.com/support/home → /support
 * - Old GitBook pages → their current equivalents (OLD_PAGES)
 * - The Zendesk request form (/hc/en-us/requests/new) is left as it is
 *
 * Dry run (lists every change, writes nothing):
 *   npx sanity exec scripts/point-help-links-in-sanity.mjs --with-user-token
 * Apply:
 *   npx sanity exec scripts/point-help-links-in-sanity.mjs --with-user-token -- --apply
 *
 * Each document is patched only if it hasn't changed since it was read (ifRevisionId).
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-06'})
const APPLY = process.argv.includes('--apply')

const OLD_PAGES = {
  '/marketing-materials/marketing-content': '/support/marketing-catalogue',
  '/industries/insurance-and-restoration/insurance-and-restoration-iguide-training': '/support/articles/27644330172946-Insurance-Restoration-with-iGUIDE',
}
/** Help Center articles that moved to a site page (keep in step with lib/help/redirects.ts) */
const MOVED_ARTICLES = {
  28225392683154: '/support/marketing-catalogue', // iGUIDE Marketing Catalogue
}
const URL_RE = /https?:\/\/(help|support)\.youriguide\.com([^\s"'<>)]*)/g

function point(host, rest) {
  const [pathQuery, hash = ''] = rest.split('#')
  const path = pathQuery.split('?')[0].replace(/\/$/, '')
  const anchor = hash ? `#${hash}` : ''
  if (/\/requests\//.test(path)) return null
  const zd = path.match(/^\/hc\/en-us\/(articles|sections|categories)\/(\d+[^/]*)$/)
  if (zd && zd[1] === 'articles' && MOVED_ARTICLES[parseInt(zd[2], 10)]) return MOVED_ARTICLES[parseInt(zd[2], 10)]
  if (zd) return `/support/${zd[1]}/${zd[2]}${anchor}`
  if (path === '' || path === '/hc/en-us' || path === '/hc' || (host === 'support' && path === '/support/home')) return '/support'
  if (OLD_PAGES[path]) return OLD_PAGES[path] + anchor
  return null
}

const changes = []
const unmapped = new Set()
function fix(value) {
  if (typeof value === 'string') {
    return value.replace(URL_RE, (url, host, rest) => {
      const next = point(host, rest)
      if (next) changes.push([url, next])
      else if (!/\/requests\//.test(rest)) unmapped.add(url)
      return next ?? url
    })
  }
  if (Array.isArray(value)) return value.map(fix)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = fix(v)
    return out
  }
  return value
}

const docs = await client.fetch(`*[]`)
const tx = []
for (const doc of docs) {
  const before = changes.length
  const set = {}
  for (const [k, v] of Object.entries(doc)) {
    if (k.startsWith('_')) continue
    const next = fix(v)
    if (JSON.stringify(next) !== JSON.stringify(v)) set[k] = next
  }
  if (!Object.keys(set).length) continue
  console.log(`\n${doc._type} ${doc._id}${doc.title ? ` (${doc.title})` : ''}`)
  for (const [a, b] of changes.slice(before)) console.log(`  - ${a}\n  + ${b}`)
  tx.push(client.patch(doc._id).ifRevisionId(doc._rev).set(set))
}

if (unmapped.size) console.log(`\nNot changed (no match, check by hand):\n  ${[...unmapped].join('\n  ')}`)
console.log(`\n${tx.length} documents ${APPLY ? 'updated' : 'would change'} (${changes.length} links).`)
if (APPLY) {
  for (let i = 0; i < tx.length; i += 50) {
    const batch = client.transaction()
    for (const p of tx.slice(i, i + 50)) batch.patch(p)
    await batch.commit({visibility: 'async'})
  }
  console.log('Done.')
} else {
  console.log('Dry run only. Add -- --apply to write the changes.')
}
