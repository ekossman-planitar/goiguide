/**
 * Live showcase pages (shared by sales: /get-iguide/<industry>/showcase, /get-iguide/irc/show)
 * → landing page sections. Most of their content is hand-built HTML (embedscript elements with
 * their own scripts), so each page lists how to read each element, by element id. Everything is
 * read from the live page (tours, samples, prices, links), nothing is typed in by hand.
 * Elements not listed here go through the normal converter (convert-live.mjs).
 *
 * Markers as in convert-live.mjs: {img} images, {resource} resource cards, logoImages logo lists.
 */
import {assetPath, button, copy, img, k, text, textAndIcons as ELEMENT_TEXT_AND_ICONS, textAndImage} from './convert-live.mjs'

/* ---------------------------------------------------------------- reading helpers */

/** Visible text without icon-font ligatures ("check") and with <br> as a space */
function clean(node) {
  if (!node) return ''
  const c = node.cloneNode(true)
  c.querySelectorAll('.material-symbols-outlined, .material-icons, svg, style, script').forEach((n) => n.remove())
  c.querySelectorAll('br').forEach((br) => br.replaceWith(' '))
  return text(c)
}

const all = (el, sel) => [...el.querySelectorAll(sel)]
const before = (a, b) => Boolean(a.compareDocumentPosition(b) & 4) // a comes before b
const inAny = (node, roots) => roots.some((r) => r.contains(node))
const isFootnote = (s) => /^[*¹²³⁴⁵⁶]/.test(s)
const isTabLink = (a) => (a.getAttribute('href') ?? '').endsWith('#') || a.hasAttribute('@click.prevent')

/** Tour, YouTube video or any other iframe (3D model viewer, Floorplanner, Street View) */
function embedMedia(raw, title) {
  if (!raw) return undefined
  const fixed = !raw.includes('?') && raw.includes('&') ? raw.replace('&', '?') : raw
  const u = new URL(fixed.startsWith('//') ? `https:${fixed}` : fixed, 'https://goiguide.com')
  if (/youtube\.com|youtu\.be/.test(u.hostname)) return {_type: 'lpMedia', kind: 'youtube', url: u.toString(), title: title || 'Video'}
  if (/(^|\.)(youriguide|iguideradix)\.com$/.test(u.hostname)) {
    // The site adds its own embed flags; keep the tour's own options (branding, start position)
    for (const p of ['autostart', 'bgcolor', '__avoid-embed-load__', 'nosplash']) u.searchParams.delete(p)
    return {_type: 'lpMedia', kind: 'tour', url: u.toString().replace(/\?$/, ''), title: title || 'iGuide 3D virtual tour'}
  }
  return {_type: 'lpMedia', kind: 'embed', url: u.toString(), title: title || 'Embedded content'}
}

/** Tab labels: Alpine tab links, or hand-built tabs with data-tab */
/** Tab labels shown only while the live USD / CAD switch is on USD (x-show="$store.instant.show") */
function usOnlyLabels(el) {
  return new Set(
    all(el, '[data-tab]')
      .filter((n) => /\$store\.instant/.test(n.getAttribute('x-show') ?? ''))
      .map(clean),
  )
}

function tabLabels(el) {
  const nodes = all(el, '[data-tab], ul li a[href$="#"], ul li button')
  const seen = new Set()
  return nodes.map(clean).filter((t) => t && !seen.has(t) && seen.add(t))
}

/** Thumbnails that open more tours (a[target=_blank] around an image, label in the card's <p>) */
function samplesIn(root) {
  return all(root, 'a[target="_blank"]')
    .filter((a) => a.querySelector('img'))
    .map((a) => {
      const im = a.querySelector('img')
      const card = a.parentElement
      const label = clean(card?.querySelector('p')) || copy(im.getAttribute('alt') ?? '')
      return {
        _type: 'sample',
        _key: k(),
        image: img(im.getAttribute('src'), ''),
        label,
        url: new URL(a.getAttribute('href'), 'https://goiguide.com').toString(),
      }
    })
    .filter((s) => s.label && s.image)
}

const heading2 = (el) => clean(el.querySelector('h1, h2')) || undefined
/** First paragraph after the heading that isn't inside the given parts */
function introAfterHeading(el, exclude = []) {
  const h = el.querySelector('h1, h2')
  return (
    all(el, 'p')
      .filter((p) => (!h || before(h, p)) && !inAny(p, exclude))
      .map(clean)
      .find((t) => t && !isFootnote(t)) || undefined
  )
}

/* ---------------------------------------------------------------- section builders */

/** Live tour(s) with tab labels, optional buttons, sample gallery, checklist and closing text */
function tourSection(el, {gallery, background} = {}) {
  const labels = tabLabels(el)
  const sampleRoots = all(gallery ?? el, 'a[target="_blank"]').filter((a) => a.querySelector('img'))
  // iframes and initEmbeddedIGuide({url}) calls, in page order. A script sometimes loads a tour that also
  // has its own iframe: keep each tour once, in its first position, with the iframe's settings
  const found = all(el, 'iframe, script')
    .filter((n) => !inAny(n, sampleRoots))
    .map((n) =>
      n.tagName === 'IFRAME'
        ? {src: n.getAttribute('src') || n.getAttribute('data-src'), iframe: true}
        : {src: /initEmbeddedIGuide\(\{[^}]*"url":"([^"]+)"/.exec(n.textContent)?.[1], iframe: false},
    )
    .filter((x) => x.src)
  const base = (src) => src.split('?')[0].replace(/^(https?:)?\/\//, '')
  const sources = []
  for (const x of found) {
    const at = sources.findIndex((y) => base(y.src) === base(x.src))
    if (at === -1) sources.push(x)
    else if (x.iframe && !sources[at].iframe) sources[at] = x
  }
  const usOnly = usOnlyLabels(el)
  const named = sources.map((x, i) => ({label: labels.length === sources.length ? labels[i] : undefined, src: x.src}))
  const tours = named
    .map((t) => {
      const media = embedMedia(t.src, t.label ? copy(t.label) : undefined)
      if (media?.kind === 'tour' && t.label) media.title = `iGuide tour: ${copy(t.label)}`
      return {_type: 'tour', _key: k(), ...(named.length > 1 && t.label ? {label: copy(t.label)} : {}), media, ...(usOnly.has(t.label) ? {usOnly: true} : {})}
    })
    .filter((t) => t.media)
  const samples = samplesIn(gallery ?? el)
  // A checklist (lists without links; tab lists are links)
  const listEls = all(el, 'ul').filter((ul) => ul.querySelector('li') && !ul.querySelector('a'))
  const list = listEls
    .flatMap((ul) => all(ul, 'li'))
    .map(clean)
    .filter(Boolean)
  const lastList = listEls.at(-1) ?? null
  const buttons = all(el, 'a[href]')
    .filter((a) => !isTabLink(a) && !a.querySelector('img') && !inAny(a, sampleRoots) && clean(a))
    .map((a) => ({...button(a), label: clean(a)}))
  const h3 = all(el, 'h3')
    .map(clean)
    .find((t) => t && !/samples/i.test(t))
  return {
    _type: 'lpTourDemo',
    _key: k(),
    eyebrow: clean(el.querySelector('.eyebrow')) || undefined,
    heading: heading2(el),
    subheading: introAfterHeading(el, lastList ? [lastList] : []),
    tips: [],
    tours,
    ...(buttons.length ? {buttons: buttons.slice(0, 4)} : {}),
    ...(samples.length ? {samplesHeading: clean(all(gallery ?? el, 'h3').find((h) => /samples/i.test(clean(h)))) || undefined, samples} : {}),
    ...(list.length ? {listHeading: h3, list} : {}),
    ...(lastList
      ? {
          closing:
            all(el, 'p')
              .filter((p) => before(lastList, p))
              .map(clean)
              .filter(Boolean)
              .join('\n\n') || undefined,
        }
      : {}),
    background: background ?? 'white',
  }
}

/** Autodesk viewer with one button per model (live: "Explore the iGUIDE add-ons") */
function modelViewer(el) {
  const script = all(el, 'script')
    .map((s) => s.textContent)
    .join('\n')
  const urls = Object.fromEntries([...script.matchAll(/(model\d+):\s*\{\s*viewer:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]))
  const tours = all(el, 'button[onclick]')
    .map((b) => ({label: clean(b), url: urls[/setModel\('(\w+)'/.exec(b.getAttribute('onclick'))?.[1]]}))
    .filter((t) => t.url)
    .map((t) => ({
      _type: 'tour',
      _key: k(),
      label: copy(t.label),
      media: {_type: 'lpMedia', kind: 'embed', url: t.url, title: `3D model viewer: ${copy(t.label)}`},
    }))
  return {_type: 'lpTourDemo', _key: k(), heading: clean(el.querySelector('h2, h3')) || undefined, tips: [], tours, background: 'white'}
}

/** Image tabs (floor plan colour schemes), optionally grouped (live IRC: Standard / Premium) */
function imageTabs(el, {background = 'surface'} = {}) {
  const groups = all(el, 'h3')
  const labels = tabLabels(el)
  const groupLinks = all(el, 'a[href$="#"]')
  const images = all(el, 'img').filter((i) => i.getAttribute('src') && !i.id)
  const tabLabel = (i) => {
    if (!groups.length) return labels[i]
    // Grouped: the i-th link's label, prefixed with the heading of its group
    const link = groupLinks[i]
    const group = groups.filter((g) => before(g, link)).at(-1)
    return `${clean(group)}: ${clean(link)}`
  }
  const tabs = images.map((im, i) => ({
    _type: 'tab',
    _key: k(),
    label: copy(tabLabel(i) ?? `Image ${i + 1}`),
    media: {_type: 'lpMedia', kind: 'image', image: img(im.getAttribute('src'), '')},
  }))
  // Live opens these full screen when it has a full-screen viewer (#fullscreenImage)
  const zoom = Boolean(el.querySelector('[id*="ullscreen"], [id*="ullScreen"]'))
  return {
    _type: 'lpTabs',
    _key: k(),
    display: 'media',
    heading: heading2(el),
    subheading: introAfterHeading(el),
    tabs,
    ...(zoom ? {zoom: true} : {}),
    background,
  }
}

/** Tabs of videos / embeds with a caption under each (live AU: "Extend what your iGUIDE can do") */
function mediaTabs(el) {
  const labels = tabLabels(el)
  const frames = all(el, 'iframe')
  const tabs = frames.map((f, i) => {
    const caption = clean(f.closest('[data-tab-group], .tab-content')?.querySelector('p') ?? f.parentElement?.nextElementSibling)
    return {
      _type: 'tab',
      _key: k(),
      label: copy(labels[i] ?? `Tab ${i + 1}`),
      text: caption || undefined,
      media: embedMedia(f.getAttribute('src'), f.getAttribute('title') ?? labels[i]),
    }
  })
  return {
    _type: 'lpTabs',
    _key: k(),
    display: 'media',
    heading: heading2(el),
    subheading: introAfterHeading(
      el,
      frames.map((f) => f.parentElement),
    ),
    tabs,
    background: 'white',
  }
}

/** Integration logos switching listing screenshots (live REP: "Integrates with industry platforms") */
function platformTabs(el) {
  const names = all(el, 'img[alt$=" logo"]').map((i) => (i.getAttribute('alt') ?? '').replace(/ logo$/, ''))
  const previews = all(el, 'img').filter((i) => !/ logo$/.test(i.getAttribute('alt') ?? '') && i.getAttribute('src') && !i.id)
  const tabs = previews.map((im, i) => {
    const a = im.closest('a[href]')
    return {
      _type: 'tab',
      _key: k(),
      label: copy(names[i] ?? `Platform ${i + 1}`),
      media: {_type: 'lpMedia', kind: 'image', image: img(im.getAttribute('src'), `${names[i] ?? ''} listing with an iGuide tour`)},
      // Live: the screenshot links to the listing; the button is an addition (both open it)
      ...(a ? {link: a.getAttribute('href')} : {}),
      ...(a ? {buttons: [{_type: 'lpButton', _key: k(), label: `See it on ${names[i]}`, action: 'url', url: a.getAttribute('href')}]} : {}),
    }
  })
  // Live: previews without a listing link (Flexmls) open full screen
  return {_type: 'lpTabs', _key: k(), display: 'media', heading: clean(el.querySelector('h2')), tabs, zoom: true, background: 'white'}
}

/** Price tables: tabs (Alpine tab links) or one under the other (each with an h3 label) */
function tablesSection(el, {background = 'surface'} = {}) {
  const tables = all(el, 'table')
  const labels = tabLabels(el)
  const asTabs = labels.length === tables.length && tables.length > 1
  const panes = tables.map((t) => {
    let p = t
    while (p.parentElement && p.parentElement !== el && p.parentElement.querySelectorAll('table').length === 1) p = p.parentElement
    return p
  })
  const h3s = all(el, 'h3, h4')
  const items = tables.map((t, i) => {
    const pane = panes[i]
    const im = pane.querySelector('img')
    const label = asTabs ? labels[i] : clean(h3s.filter((h) => before(h, t)).at(-1))
    const columns = all(t, 'thead th').map(clean)
    const rows = all(t, 'tr')
      .filter((tr) => !tr.closest('thead'))
      .map((tr) => ({_type: 'row', _key: k(), cells: all(tr, 'td, th').map(clean)}))
    const buttons = all(pane, 'a[href]')
      .filter((a) => !isTabLink(a) && clean(a))
      .map((a) => ({...button(a), label: clean(a)}))
    return {
      _type: 'table',
      _key: k(),
      ...(label ? {label: copy(label)} : {}),
      ...(im && pane !== t ? {image: img(im.getAttribute('src'), '')} : {}),
      ...(columns.length ? {columns} : {}),
      rows,
      ...(buttons.length ? {buttons} : {}),
    }
  })
  const footnote = all(el, 'p')
    .filter((p) => !inAny(p, panes))
    .map(clean)
    .filter(isFootnote)
    .join('\n')
  return {
    _type: 'lpTables',
    _key: k(),
    heading: heading2(el),
    subheading: introAfterHeading(el, panes),
    tables: items,
    display: asTabs ? 'tabs' : 'stacked',
    ...(footnote ? {footnote} : {}),
    background,
  }
}

/** Cards found by their headings (h2–h5): image, text, checklist and buttons in each */
function cardsSection(el, {level = 'h3', columns, display = 'cards', background = 'white', pagePath} = {}) {
  const heads = all(el, level).filter((h) => clean(h))
  const roots = heads.map((h) => {
    let r = h
    while (r.parentElement && r.parentElement !== el && r.parentElement.querySelectorAll(level).length === 1) r = r.parentElement
    return r
  })
  const items = heads.map((h, i) => {
    const root = roots[i]
    const im = root.querySelector('img')
    const bullets = all(root, 'li').map(clean).filter(Boolean)
    const textParas = all(root, 'p')
      .filter((p) => !p.closest('li'))
      .map(clean)
      .filter(Boolean)
    const buttons = all(root, 'a[href]')
      .filter((a) => clean(a) && !a.closest('li'))
      .map((a) => ({...button(a, pagePath), label: clean(a)}))
    return {
      _type: 'feature',
      _key: k(),
      title: clean(h),
      ...(im ? {image: img(im.getAttribute('src'), im.getAttribute('alt') ?? '')} : {}),
      ...(textParas.length ? {text: textParas.join('\n\n')} : {}),
      ...(bullets.length ? {bullets} : {}),
      ...(buttons.length ? {buttons} : {}),
    }
  })
  const outside = all(el, 'p').filter((p) => !inAny(p, roots))
  const footnote = outside.map(clean).filter(isFootnote).join('\n')
  const sectionButtons = all(el, 'a[href]')
    .filter((a) => !inAny(a, roots) && clean(a))
    .map((a) => ({...button(a, pagePath), label: clean(a)}))
  const sectionHeading = all(el, 'h1, h2, h3').find((h) => !inAny(h, roots))
  return {
    _type: 'lpFeatures',
    _key: k(),
    heading: clean(sectionHeading) || undefined,
    subheading: outside.map(clean).find((t) => t && !isFootnote(t)) || undefined,
    display,
    ...(display === 'cards' ? {columns: columns ?? Math.min(Math.max(items.length, 2), 4)} : {}),
    items,
    ...(sectionButtons.length ? {buttons: sectionButtons.slice(0, 2)} : {}),
    ...(footnote ? {footnote} : {}),
    background,
  }
}

/** Camera block: image, name, text, spec table, button and footnote */
function cameraSplit(el, {background = 'surface', pagePath} = {}) {
  const heads = all(el, 'h2, h3').map(clean).filter(Boolean)
  const im = el.querySelector('img')
  const bgImage = /url\(['"]?([^'")]+\.(?:png|jpe?g|webp))['"]?\)/.exec(el.innerHTML)?.[1]
  const specs = all(el, 'table tr')
    .map((tr) => all(tr, 'td').map(clean))
    .filter((c) => c.length === 2)
    .map(([label, value]) => ({_type: 'spec', _key: k(), label, value}))
  const ps = all(el, 'p').map(clean).filter(Boolean)
  const btns = all(el, 'a[href]')
    .filter((a) => clean(a))
    .map((a) => ({...button(a, pagePath), label: clean(a)}))
  return {
    _type: 'lpSplit',
    _key: k(),
    ...(heads.length > 1 ? {eyebrow: heads[0], heading: heads[1]} : {heading: heads[0]}),
    body: ps.filter((t) => !isFootnote(t)).join('\n\n') || undefined,
    specs,
    footnote: ps.filter(isFootnote).join(' ') || undefined,
    buttons: btns.slice(0, 3),
    media: {_type: 'lpMedia', kind: 'image', image: img(im?.getAttribute('src') ?? bgImage, im?.getAttribute('alt') ?? 'PLANIX R1 camera')},
    mediaSide: 'left',
    background,
  }
}

/** Heading, text, optional button and an image or GIF beside it */
function textMediaSplit(el, {pagePath, background = 'white', mediaSide = 'right'} = {}) {
  const im = el.querySelector('img')
  return {
    _type: 'lpSplit',
    _key: k(),
    heading: heading2(el),
    body: all(el, 'p').map(clean).filter(Boolean).join('\n\n') || undefined,
    buttons: all(el, 'a[href]')
      .filter((a) => clean(a))
      .map((a) => ({...button(a, pagePath), label: clean(a)}))
      .slice(0, 2),
    media: im ? {_type: 'lpMedia', kind: 'image', image: img(im.getAttribute('src'), im.getAttribute('alt') ?? '')} : undefined,
    mediaSide,
    background,
  }
}

/** Converter's text + image block; a last paragraph ending in ":" becomes the heading of the bullet list, ¹ ² notes the footnote */
function split(el, ctx, extra = {}) {
  const s = textAndImage(el, ctx.pagePath)
  const all_ = (s.body ?? '').split('\n\n')
  const notes = all_.filter(isFootnote)
  if (notes.length) s.footnote = notes.join(' ')
  const parts = all_.filter((p) => !isFootnote(p))
  s.body = parts.join('\n\n') || undefined
  if (s.bullets?.length && parts.at(-1)?.trim().endsWith(':')) {
    s.bulletsHeading = parts.pop().trim()
    s.body = parts.join('\n\n') || undefined
  }
  return {...s, ...extra}
}

function heroMedia(el) {
  const im = el.querySelector('img')
  return {
    _type: 'lpHero',
    _key: k(),
    style: 'media',
    heading: clean(el.querySelector('h1, h2')),
    subheading: introAfterHeading(el),
    media: {_type: 'lpMedia', kind: 'image', image: img(im?.getAttribute('src'), im?.getAttribute('alt') ?? '')},
  }
}

function reportSection(el, samples, background = 'white') {
  return {
    _type: 'lpReport',
    _key: k(),
    heading: heading2(el),
    subheading: clean(el.querySelector('.subheading, .prose p, p')) || undefined,
    samples,
    background,
  }
}

function logos(el) {
  return {
    _type: 'lpLogos',
    _key: k(),
    logoImages: all(el, 'li img').map((i) => ({src: assetPath(i.getAttribute('src')), alt: i.getAttribute('alt') ?? ''})),
  }
}

function steps(el) {
  return {
    _type: 'lpSteps',
    _key: k(),
    heading: heading2(el),
    subheading: introAfterHeading(
      el,
      all(el, 'h3').map((h) => h.parentElement),
    ),
    steps: all(el, 'h3').map((h) => ({_type: 'step', _key: k(), title: clean(h), text: clean(h.parentElement.querySelector('p')) || undefined})),
  }
}

/* ---------------------------------------------------------------- in-page menus */

let menuTargets = new Set()

/** Menu links as on live: #anchor when it points at a section of this page, otherwise the live URL (some live menus link to another showcase page) */
function navLinks(links, doc, pagePath) {
  const ids = new Set(all(doc, 'main .element').map((e) => e.id))
  return links
    .filter((a) => clean(a))
    .map((a) => {
      const click = a.getAttribute('@click.prevent') ?? ''
      // Live REP: the USD / CAD switch that hides iGuide Instant
      if (/\$store\.instant/.test(click)) return {_type: 'navLink', _key: k(), kind: 'regionSwitch'}
      if (click) return null
      const u = new URL(a.getAttribute('href'), 'https://goiguide.com')
      const id = u.hash.slice(1)
      const local = id && ids.has(id) && u.hostname === 'goiguide.com' && u.pathname === pagePath
      if (local) menuTargets.add(id)
      const href = local ? `#${id}` : u.hostname === 'goiguide.com' ? u.pathname + u.search + u.hash : u.toString()
      return {_type: 'navLink', _key: k(), kind: 'link', label: clean(a), href, ...(a.getAttribute('target') === '_blank' ? {newTab: true} : {})}
    })
    .filter(Boolean)
}

/** The theme's "Sub navigation" bar above the first element (older showcase pages) */
function subNav(doc, pagePath) {
  menuTargets = new Set()
  const nav = doc.querySelector('main nav[aria-label="Sub navigation"]')
  return nav ? {_type: 'lpAnchorNav', _key: k(), links: navLinks(all(nav, 'a[href]'), doc, pagePath)} : null
}

/** Hand-built menu element (newer showcase pages) */
function navElement(el, ctx) {
  menuTargets = new Set()
  const nav = el.querySelector('nav') ?? el
  const links = all(nav, 'a[href]').filter((a) => !/store\.goiguide\.com/.test(a.getAttribute('href') ?? '') && clean(a))
  return {_type: 'lpAnchorNav', _key: k(), links: navLinks(links, ctx.doc, ctx.pagePath)}
}

/** Sections get the live element id as their anchor when the menu links to it or it's a named id */
const anchor = (id, n) => (n === 1 && /^[a-z][a-z0-9-]*$/.test(id) && (!/^e\d+$/.test(id) || menuTargets.has(id)) ? id : undefined)

/* ---------------------------------------------------------------- pages */

const skip = () => null
const gallery = (id) => (el, ctx) => tourSection(el, {gallery: ctx.doc.getElementById(id)})
const showcaseLinks = (el, ctx) => cardsSection(el, {level: 'h3', columns: 4, background: 'surface', pagePath: ctx.pagePath})

/** AEC and FM showcases share their layout */
const drawingShowcase = (heroId, galleryId, dwgId, scriptId) => ({
  top: subNav,
  anchor,
  elements: {
    [heroId]: (el, ctx) => split(el, ctx, {background: 'surface'}),
    viewer: gallery(galleryId),
    [galleryId]: skip,
    cad: modelViewer,
    drawing: (el, ctx) => split(el, ctx, {background: 'surface', mediaSide: 'left'}),
    addons: (el, ctx) => cardsSection(el, {level: 'h5', display: 'rows', pagePath: ctx.pagePath}),
    [dwgId]: (el, ctx) => cardsSection(el, {level: 'h3', columns: 2, background: 'surface', pagePath: ctx.pagePath}),
    processing: (el) => tablesSection(el),
    report: (el) => reportSection(el, ['reportCommercial']),
    planix: (el, ctx) => cameraSplit(el, {pagePath: ctx.pagePath}),
    resources: (el) => tourSection(el, {background: 'surface'}),
    e974: showcaseLinks,
    [scriptId]: skip,
  },
})

/** Long PLANIX R1 block on the older IRC showcase: intro, quote, 3 steps, links and the full spec sheet */
function ircCamera(el, ctx) {
  const intro = all(el, 'h2').map(clean)
  const quote = all(el, 'blockquote p').map(clean)
  const stepsHead = all(el, 'h3')
    .map(clean)
    .find((t) => /step/i.test(t))
  const specs = []
  for (const n of all(el, 'h4, p')) {
    if (n.closest('blockquote')) continue
    if (n.tagName === 'H4' && !/technical/i.test(clean(n))) specs.push({_type: 'spec', _key: k(), label: clean(n)})
    const strong = n.tagName === 'P' ? n.querySelector('strong') : null
    if (strong && specs.length) {
      const label = clean(strong).replace(/:$/, '')
      const value = clean(n).slice(clean(strong).length).trim()
      specs.push({_type: 'spec', _key: k(), label, value})
    }
  }
  const mention = all(el, 'h3').find((h) => /mention/i.test(clean(h)))
  const mentionText = mention ? `${clean(mention)} ${clean(mention.nextElementSibling)}` : ''
  return {
    _type: 'lpSplit',
    _key: k(),
    eyebrow: clean(el.querySelector('h3')),
    heading: intro[0],
    body: [intro[1], clean(el.querySelector('h2 ~ p, p')), quote.length ? `“${quote[0]}” ${quote[1] ?? ''}`.trim() : ''].filter(Boolean).join('\n\n'),
    bulletsHeading: stepsHead,
    bullets: all(el, 'ul li').map(clean).filter(Boolean),
    footnote: mentionText || undefined,
    specsHeading: clean(all(el, 'h4').find((h) => /technical/i.test(clean(h)))) || undefined,
    specs,
    buttons: all(el, 'a.btn, a[href*="store."], a[href*="operator"]')
      .filter((a) => clean(a) && !a.closest('p'))
      .map((a) => ({...button(a, ctx.pagePath), label: clean(a)}))
      .slice(0, 3),
    media: {_type: 'lpMedia', kind: 'image', image: img(el.querySelector('img')?.getAttribute('src'), 'PLANIX R1 camera')},
    mediaSide: 'right',
    background: 'surface',
  }
}

/** AU showcase "See what agents and buyers see": tours are in the page script, one per property type */
function auTours(el) {
  const script = all(el, 'script')
    .map((s) => s.textContent)
    .join('\n')
  const tours = [...script.matchAll(/(\w+):\s*'(https:\/\/youriguide\.com\/embed\/[^']+)'/g)]
  const labels = Object.fromEntries([...script.matchAll(/(\w+):\s*'([A-Z][a-z]+)'/g)].map((m) => [m[1], m[2]]))
  return {
    _type: 'lpTourDemo',
    _key: k(),
    heading: heading2(el),
    subheading: introAfterHeading(el),
    tips: [],
    tours: tours.map(([, type, url]) => ({
      _type: 'tour',
      _key: k(),
      label: labels[type] ?? type,
      media: embedMedia(url, `iGuide tour: ${labels[type] ?? type}`),
    })),
    background: 'white',
  }
}

/** AU showcase realestate.com.au block: looping video, label, text and link */
function auRea(el, ctx) {
  const video = el.querySelector('video source')
  const label = clean([...el.querySelectorAll('*')].find((n) => !n.children.length && /Partner$/.test(clean(n))))
  return {
    _type: 'lpSplit',
    _key: k(),
    ...(label ? {eyebrow: label} : {}),
    heading: heading2(el),
    body: all(el, 'p').map(clean).filter(Boolean).join('\n\n'),
    buttons: all(el, 'a[href]').map((a) => ({...button(a, ctx.pagePath), label: clean(a).replace(/\s*\(opens[^)]*\)$/, '')})),
    media: {
      _type: 'lpMedia',
      kind: 'video',
      url: new URL(video.getAttribute('src'), 'https://goiguide.com').toString(),
      title: 'iGuide tour inside a realestate.com.au listing',
    },
    mediaSide: 'left',
    background: 'surface',
  }
}

/** Tours picked from a drop-down on live (NAR "Additional Tours"): each option holds an iframe */
function selectTours(el) {
  const tours = all(el, 'select option')
    .map((o) => ({label: clean(o), src: /src="([^"]+)"/.exec(o.getAttribute('value') ?? '')?.[1]}))
    .filter((t) => t.src)
    .map((t) => ({_type: 'tour', _key: k(), label: copy(t.label), media: {...embedMedia(t.src), title: `iGuide tour: ${copy(t.label)}`}}))
  return {_type: 'lpTourDemo', _key: k(), heading: heading2(el), tips: [], tours, background: 'white'}
}

/** The converter's feature grid, when live shows its heading as a subheading */
function featuresWithHeading(el, ctx) {
  const s = ELEMENT_TEXT_AND_ICONS(el, ctx)
  if (!s.heading && s.subheading) return {...s, heading: s.subheading, subheading: undefined}
  return s
}

/** Survey pages: heading and intro, then the HubSpot form embedded below (the form is in the next element's script) */
function surveyHero(el) {
  const formEl = el.nextElementSibling
  const formId = /formId:\s*"([\w-]+)"/.exec(
    all(formEl ?? el, 'script')
      .map((sc) => sc.textContent)
      .join('\n'),
  )?.[1]
  return {
    _type: 'lpHero',
    _key: k(),
    style: 'centered',
    heading: clean(el.querySelector('h1, h2')),
    subheading: all(el, 'p').map(clean).filter(Boolean).join('\n\n') || undefined,
    ...(formId ? {hubspotFormId: formId} : {}),
  }
}

export const showcasePages = {
  '/get-iguide/aec/showcase': drawingShowcase('e2185', 'e2187', 'e2380', 'e2195'),
  '/get-iguide/fm/showcase': drawingShowcase('banner', 'e2483', 'e2487', 'e2493'),

  '/get-iguide/irc/showcase-forensic': {
    top: subNav,
    anchor,
    elements: {
      e2921: (el, ctx) => split(el, ctx, {background: 'surface'}),
      viewer: gallery('e2923'),
      e2923: skip,
      report: (el) => reportSection(el, ['reportIrc']),
      packages: (el, ctx) => cardsSection(el, {level: 'h5', columns: 4, background: 'surface', pagePath: ctx.pagePath}),
      processing: (el) => tablesSection(el, {background: 'white'}),
      floorplan: (el) => imageTabs(el),
      planix: (el, ctx) => cameraSplit(el, {background: 'white', pagePath: ctx.pagePath}),
      resources: (el) => tourSection(el, {background: 'surface'}),
      e974: showcaseLinks,
      e2932: skip,
    },
  },

  '/get-iguide/irc/showcase': {
    top: subNav,
    anchor,
    elements: {
      e804: (el, ctx) => cardsSection(el, {level: 'h2', columns: 2, background: 'surface', pagePath: ctx.pagePath}),
      e128: logos,
      viewer: (el) => tourSection(el),
      e1005: (el, ctx) => cardsSection(el, {level: 'h3', columns: 3, background: 'surface', pagePath: ctx.pagePath}),
      e973: (el) => tablesSection(el, {background: 'white'}),
      e1769: (el, ctx) => textMediaSplit(el, {pagePath: ctx.pagePath, background: 'surface'}),
      reports: (el) => reportSection(el, ['reportIrc']),
      e811: (el) => imageTabs(el),
      e1350: ircCamera,
      e1909: (el) => tourSection(el, {background: 'white'}),
      e974: showcaseLinks,
      e1903: skip,
    },
  },

  '/get-iguide/irc/show': {
    anchor,
    elements: {
      hero: heroMedia,
      'top-nav': navElement,
      'section-1': (el) => tourSection(el),
      'section-2': (el) => imageTabs(el),
      'section-5': (el) => reportSection(el, ['reportIrc']),
      packages: (el, ctx) => cardsSection(el, {level: 'h5', columns: 3, background: 'surface', pagePath: ctx.pagePath}),
      e3862: (el, ctx) => textMediaSplit(el, {pagePath: ctx.pagePath}),
      'section-6': (el, ctx) => cameraSplit(el, {pagePath: ctx.pagePath}),
      'section-7': (el) => tablesSection(el, {background: 'white'}),
      'section-8': (el) => tourSection(el, {background: 'surface'}),
      e974: showcaseLinks,
      e3839: skip,
    },
  },

  '/get-iguide/rep/showcase': {
    anchor,
    elements: {
      hero: heroMedia,
      'top-nav': navElement,
      'section-1': (el) => tourSection(el),
      'section-2': (el) => imageTabs(el),
      'site-plans': (el) => tourSection(el, {background: 'surface'}),
      'section-5': (el) => reportSection(el, ['reportResidential', 'analyticsResidential']),
      'section-2:2': platformTabs,
      'section-6': (el, ctx) => cameraSplit(el, {pagePath: ctx.pagePath}),
      'section-7': (el) => tablesSection(el, {background: 'white'}),
      'section-8': (el) => tourSection(el, {background: 'surface'}),
      e974: showcaseLinks,
      e3152: skip,
    },
  },

  // Survey pages (HubSpot forms on live)
  '/get-iguide/survey/tell-us-how-we-did': {elements: {e568: surveyHero, e570: skip}},
  '/get-iguide/survey/tell-us-how-we-did-non-re': {elements: {e571: surveyHero, e572: skip}},

  // Ad pages (mission 3): only the elements the converter can't read well are listed
  '/get-iguide/rep/learn-more-2025-07-24': {
    elements: {e1880: skip, e652: skip},
  },
  '/get-iguide/aec/learn-more-old': {
    elements: {theplanixid: (el, ctx) => split(el, ctx)},
  },
  '/get-iguide/rep/nar': {
    elements: {
      e1456: (el, ctx) => cardsSection(el, {level: 'h2', columns: 2, background: 'surface', pagePath: ctx.pagePath}),
      e80: logos,
      viewer: (el) => tourSection(el, {background: 'surface'}),
      e1477: selectTours,
      portals: (el) => imageTabs(el),
      report: (el) => reportSection(el, ['reportResidential', 'analyticsResidential']),
      floorplan: (el, ctx) => textMediaSplit(el, {pagePath: ctx.pagePath, background: 'surface'}),
      e1471: featuresWithHeading,
      e974: showcaseLinks,
    },
  },

  '/get-iguide/rep-au/showcase': {
    anchor,
    // Live: the page's own menu bar has a "Shop PLANIX R1" button
    extra: {headerButton: {_type: 'lpButton', label: 'Shop PLANIX R1', action: 'url', url: 'https://store.goiguide.com/products/iguide-planix-r1'}},
    elements: {
      css: skip,
      nav: navElement,
      hero: heroMedia,
      rea: auRea,
      'camera-system': (el, ctx) => cameraSplit(el, {background: 'white', pagePath: ctx.pagePath}),
      steps,
      'iguide-viewer': auTours,
      deliverables: (el, ctx) => cardsSection(el, {level: 'h3', columns: 4, background: 'surface', pagePath: ctx.pagePath}),
      'extend-iguide': mediaTabs,
      processing: (el) => tablesSection(el, {background: 'white'}),
      scripts: skip,
    },
  },
}
