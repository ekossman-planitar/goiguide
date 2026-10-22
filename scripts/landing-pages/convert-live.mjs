/**
 * Converts a saved live goiguide.com page (Silverstripe elemental blocks) into
 * a Sanity landing page document in the same marker format as content.mjs:
 *   {img: '/assets/…', alt}      image, uploaded by the import script
 *   {ref: '<id>'}                reference
 *   logoImages: [{src, alt}]     logo band, matched to (or added as) client logos
 * Testimonials found on the page are returned separately (created as documents).
 *
 * Copy follows the site's rules: "iGUIDE" → "iGuide" in visible text and no em dashes.
 * Elements it can't map are listed in `unsupported` so nothing is silently lost.
 */
import {createHash} from 'node:crypto'
import {manualPages} from './manual.mjs'
import {showcasePages} from './showcase.mjs'
import {JSDOM, VirtualConsole} from 'jsdom'

const vc = new VirtualConsole()
let keyCount = 0
const k = () => `c${(keyCount++).toString(36)}`
const hash = (s) => createHash('sha1').update(s).digest('hex').slice(0, 8)
const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replaceAll(/[̀-ͯ]/g, '')
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '')
    .slice(0, 60)

/** Visible-text rules: brand spelling and no em dashes (same rules as the code clean-up) */
export function copy(s) {
  if (!s) return s
  return s
    .replaceAll(/(?<![/\-_%0-9@A-Za-z])iGUIDE/g, 'iGuide')
    .replaceAll(/\s*—\s*(?=(?:it|it’s|it's|they|we|you|this) )/g, '; ')
    .replaceAll(/\s*—\s*/g, ', ')
    .replaceAll(/,\s*,/g, ',')
}
const text = (n) => copy((n?.textContent ?? '').replaceAll(/ /g, ' ').replaceAll(/\s+/g, ' ').trim())
/** Paragraph text of a rich-text container, paragraphs separated by blank lines */
const paras = (root) => {
  if (!root) return ''
  const ps = [...root.querySelectorAll('p')].map(text).filter(Boolean)
  return ps.length ? ps.join('\n\n') : text(root)
}
const assetPath = (src) => {
  if (!src) return undefined
  try {
    const u = new URL(src, 'https://goiguide.com')
    return u.hostname.endsWith('goiguide.com') ? decodeURI(u.pathname) : u.toString()
  } catch {
    return undefined
  }
}
const img = (src, alt = '') => (assetPath(src) ? {img: assetPath(src), alt: copy(alt) || ''} : undefined)
const bgUrl = (el) => el?.getAttribute('style')?.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/)?.[1]

/** Live button → landing page button */
function button(a, pagePath) {
  const label = text(a)
  const href = a.getAttribute('href') ?? ''
  if (/openCalendly|book-demo/.test(a.className) || /book-a-demo/.test(href)) return {_type: 'lpButton', _key: k(), label, action: 'demo'}
  if (!href || href === '#' || href.startsWith(`${pagePath}#`) || href.startsWith('#')) return {_type: 'lpButton', _key: k(), label, action: 'form'}
  const u = new URL(href, 'https://goiguide.com')
  const url = u.hostname === 'goiguide.com' ? decodeURI(u.pathname) + u.search : u.toString()
  return {_type: 'lpButton', _key: k(), label, action: 'url', url}
}
/** Live lightbox button (x-data="buttonDataNNN"): opens a HubSpot form in a pop-up; returns null for other pop-ups */
function popupButton(b) {
  const name = b.getAttribute('x-data')
  const script = [...b.ownerDocument.querySelectorAll('script')].map((sc) => sc.textContent).find((t) => t.includes(`const ${name} =`)) ?? ''
  const block = script.slice(script.indexOf(`const ${name} =`))
  const formId = /formId:\s*["']([\w-]+)["']/.exec(block)?.[1]
  if (!formId) return null
  const title = /title:\s*'([^']*)'/.exec(block)?.[1]
  return {_type: 'lpButton', _key: k(), label: text(b), action: 'popup', hubspotFormId: formId, ...(title ? {popupTitle: copy(title)} : {})}
}
const buttons = (root, pagePath) =>
  [...(root?.querySelectorAll('a.btn, button[x-data^="buttonData"]') ?? [])]
    .filter((a) => text(a))
    .map((a) => (a.tagName === 'BUTTON' ? popupButton(a) : button(a, pagePath)))
    .filter(Boolean)

/** iframe → lpMedia (iGuide tour / YouTube / other) */
function iframeMedia(iframe, title) {
  const raw = iframe?.getAttribute('src') || iframe?.dataset.src
  if (!raw) return undefined
  // A few live embeds join the parameters with "&" but no "?"; the tour still needs a proper query string
  const fixed = !raw.includes('?') && raw.includes('&') ? raw.replace('&', '?') : raw
  const url = new URL(fixed, 'https://goiguide.com').toString()
  if (/youtube\.com|youtu\.be/.test(url)) return {_type: 'lpMedia', kind: 'youtube', url, title: title || 'Video'}
  return {_type: 'lpMedia', kind: 'tour', url, title: title || 'iGuide 3D virtual tour'}
}
function mediaIn(root, title) {
  const iframe = root.querySelector('iframe')
  if (iframe) return iframeMedia(iframe, title)
  const video = root.querySelector('video')
  const vsrc = video?.getAttribute('src') || video?.querySelector('source')?.getAttribute('src')
  if (vsrc) return {_type: 'lpMedia', kind: 'video', url: new URL(vsrc, 'https://goiguide.com').toString(), title: title || 'Video'}
  const im = root.querySelector('img')
  if (im) return {_type: 'lpMedia', kind: 'image', image: img(im.getAttribute('src') || im.dataset.src, im.getAttribute('alt') ?? '')}
  return undefined
}

/* ---------------------------------------------------------------- elements */

function textAndIcons(el) {
  const head = el.querySelector('.text-center h2, h2')
  const intro = el.querySelector('.container .prose')
  const cards = [...el.querySelectorAll('.rounded-xl')].filter((c) => c.querySelector('h3'))
  const grid = cards[0]?.parentElement?.className ?? ''
  const cols = Number(grid.match(/lg:grid-cols-(\d)/)?.[1]) || ([2, 4].includes(cards.length) ? cards.length : 3)
  return {
    _type: 'lpFeatures',
    _key: k(),
    heading: text(head) || undefined,
    subheading: intro && !cards.some((c) => c.contains(intro)) ? paras(intro) || undefined : undefined,
    columns: Math.min(Math.max(cols, 2), 4),
    items: cards.map((c) => {
      const icon = c.querySelector('img')
      return {
        _type: 'feature',
        _key: k(),
        title: text(c.querySelector('h3')),
        text: paras(c.querySelector('.prose')) || text(c.querySelector('p')) || undefined,
        ...(icon ? {icon: img(icon.getAttribute('src'), icon.getAttribute('alt') ?? '')} : {}),
      }
    }),
    background: 'white',
  }
}

function logoSlider(el) {
  const logos = [...el.querySelectorAll('li:not(.glide__slide--clone) img')].map((i) => ({
    src: assetPath(i.getAttribute('src')),
    alt: i.getAttribute('alt') ?? '',
  }))
  const seen = new Set()
  return {
    _type: 'lpLogos',
    _key: k(),
    heading: text(el.querySelector('h2')) || undefined,
    logoImages: logos.filter((l) => l.src && !seen.has(l.src) && seen.add(l.src)),
  }
}

function tabEmbed(el) {
  const heading = text(el.querySelector('h2')) || undefined
  const intro = paras(el.querySelector('.prose')) || undefined
  // Tab buttons are the links in the list above the tab panes; each pane is a section with x-show
  const panes = [...el.querySelectorAll('*')].filter((p) => [...p.attributes].some((at) => at.name.startsWith('x-show')))
  const tabLabels = panes.length > 1 ? [...el.querySelectorAll('ul li a, ul li button')].map(text).filter(Boolean) : []
  const tips = [...el.querySelectorAll('.instructions-item')]
    .filter((t, i, all) => all.findIndex((x) => text(x) === text(t)) === i)
    .map((t) => {
      const icon = t.querySelector('img')
      return {_type: 'tip', _key: k(), text: text(t.querySelector('div') ?? t), ...(icon ? {icon: img(icon.getAttribute('src'), '')} : {})}
    })
  const sources = panes.length > 1 ? panes : [el]
  const tours = sources
    .map((p, i) => ({
      _type: 'tour',
      _key: k(),
      ...(tabLabels[i] ? {label: copy(tabLabels[i])} : {}),
      media: mediaIn(p, tabLabels[i] ? `iGuide 3D tour: ${tabLabels[i]}` : undefined),
    }))
    .filter((t) => t.media)
  // Tabs with pictures (e.g. before / after drawings) fit the samples tabs better
  if (tours.length > 1 && tours.every((t) => t.media.kind === 'image') && !tips.length) {
    return {
      _type: 'lpTabs',
      _key: k(),
      heading,
      subheading: intro,
      tabs: tours.map((t) => ({_type: 'tab', _key: t._key, label: t.label, media: t.media})),
      background: 'surface',
    }
  }
  return {_type: 'lpTourDemo', _key: k(), heading, subheading: intro, tips, tours, background: 'surface'}
}

/** Live "iGUIDE Packages" tabs (camerasystemcontent): one package per tab */
function packagesEl(el, pagePath) {
  const labels = [...el.querySelectorAll('ul li a')].map(text).filter(Boolean)
  const tabs = [...el.querySelectorAll('.product-loop')].map((pane, i) => {
    const prose = pane.querySelector('.prose')
    prose?.querySelectorAll('br').forEach((br) => br.replaceWith('\n'))
    const paragraphs = [...(prose?.querySelectorAll('p') ?? [])]
      .flatMap((p) => (p.textContent ?? '').split(/\n+/))
      .map((t) =>
        copy(
          t
            .replaceAll(/\u00a0/g, ' ')
            .replaceAll(/\s+/g, ' ')
            .trim(),
        ),
      )
      .filter(Boolean)
    const picture = [...pane.querySelectorAll('img')].pop()
    const image = picture ? img(picture.getAttribute('src'), picture.getAttribute('alt') ?? '') : undefined
    const heading = text(pane.querySelector('h3'))
    return {
      _type: 'tab',
      _key: k(),
      label: copy(labels[i] ?? heading),
      ...(heading && heading !== copy(labels[i] ?? '') ? {heading} : {}),
      text: paragraphs.join('\n\n') || undefined,
      bullets: [...(prose?.querySelectorAll('li') ?? [])].map(text).filter(Boolean),
      buttons: buttons(pane, pagePath),
      ...(image ? {media: {_type: 'lpMedia', kind: 'image', image}} : {}),
    }
  })
  return {
    _type: 'lpTabs',
    _key: k(),
    display: 'packages',
    heading: text(el.querySelector('h2')) || undefined,
    subheading: text(el.querySelector('.container > div h3, h2 + h3')) || undefined,
    tabs,
    background: 'surface',
  }
}

/** Hand-built quote slider (embedscript .slider): headshot, quote, name, company */
function quoteSlider(el, out) {
  const items = [...el.querySelectorAll('.slider .slides > div')].map((d) => {
    const quote = text(d.querySelector('h3')).replaceAll(/^["“]|["”]$/g, '')
    const name = text(d.querySelector('h5')) || undefined
    const company = text(d.querySelector('p')) || undefined
    const photo = d.querySelector('img')
    const _id = `testimonial-lp-${slugify(name || company || '') || 'quote'}-${hash(quote)}`
    out.testimonials.set(_id, {
      _id,
      _type: 'testimonial',
      quote,
      name,
      company,
      ...(photo ? {photo: {src: assetPath(photo.getAttribute('src')), alt: name ?? ''}} : {}),
    })
    return {ref: _id}
  })
  return {_type: 'lpTestimonials', _key: k(), heading: text(el.querySelector('h2')) || undefined, items}
}

/** Featured posts: cards linking to Resource Center items (resolved to references on import) */
function featuredPosts(el) {
  const items = [...el.querySelectorAll('a[href]')].filter((a) => a.querySelector('h3')).map((a) => ({resource: a.getAttribute('href')}))
  return {_type: 'lpResources', _key: k(), heading: text(el.querySelector('h2')) || undefined, items}
}

function testimonialsEl(el, out) {
  const items = [...el.querySelectorAll('figure')].map((f) => {
    const quote = paras(f.querySelector('blockquote'))
    const caption = [...f.querySelectorAll('figcaption > div')].map(text)
    const logo = f.querySelector('img')
    const name = caption[0] || undefined
    const company = caption.slice(1).filter(Boolean).join(', ') || undefined
    const _id = `testimonial-lp-${slugify(name || company || '') || 'quote'}-${hash(quote)}`
    out.testimonials.set(_id, {
      _id,
      _type: 'testimonial',
      quote,
      name,
      company,
      ...(logo ? {logo: {src: assetPath(logo.getAttribute('src')), alt: logo.getAttribute('alt') || company || name || ''}} : {}),
    })
    return {ref: _id}
  })
  return {_type: 'lpTestimonials', _key: k(), heading: text(el.querySelector('h2')) || undefined, items}
}

function textAndImage(el, pagePath) {
  const textCol = [...el.querySelectorAll('h2')][0]?.closest('div[class*="col-span"]') ?? el
  const mediaCol = [...el.querySelectorAll('div[class*="col-span"]')].find(
    (d) => d !== textCol && !d.contains(textCol) && (d.querySelector('img, iframe, video') || bgUrl(d)),
  )
  const prose = textCol.querySelector('.prose')
  const bullets = [...(prose?.querySelectorAll('li') ?? [])].map(text).filter(Boolean)
  const body = [...(prose?.children ?? [])]
    .filter((c) => c.tagName === 'P')
    .map(text)
    .filter(Boolean)
    .join('\n\n')
  const mediaSide = mediaCol && textCol.compareDocumentPosition(mediaCol) & 2 /* media before text */ ? 'left' : 'right'
  return {
    _type: 'lpSplit',
    _key: k(),
    heading: text(textCol.querySelector('h2, h3')) || undefined,
    body: body || undefined,
    bullets: bullets.length ? bullets : undefined,
    buttons: buttons(textCol, pagePath),
    media: mediaCol ? mediaIn(mediaCol, text(textCol.querySelector('h2'))) : undefined,
    mediaSide,
    background: /bg-gray-100/.test(el.innerHTML.slice(0, 400)) ? 'surface' : 'white',
  }
}

function ctaLarge(el, pagePath) {
  return {
    _type: 'lpCta',
    _key: k(),
    heading: text(el.querySelector('h2, h3')) || undefined,
    text: paras(el.querySelector('.prose, .prose-white')) || undefined,
    buttons: buttons(el, pagePath).slice(0, 2),
  }
}

function stepSlider(el) {
  const slides = [...el.querySelectorAll('li.glide__slide:not(.glide__slide--clone), .glide__slides > li')].filter((li) => li.querySelector('h3'))
  return {
    _type: 'lpSteps',
    _key: k(),
    heading: text(el.querySelector('h2')) || undefined,
    subheading: text(el.querySelector('h2')?.parentElement?.querySelector('p')) || undefined,
    steps: slides.map((li) => ({
      _type: 'step',
      _key: k(),
      title: text(li.querySelector('h3')),
      text: text(li.querySelector('p')),
      ...(bgUrl(li) ? {image: img(bgUrl(li), '')} : {}),
    })),
  }
}

function faqEl(el) {
  const items = [...el.querySelectorAll('[x-data*="open"]')].filter((i) => i.querySelector(':scope > button'))
  return {
    _type: 'lpFaq',
    _key: k(),
    heading: text(el.querySelector('h2')) || 'Frequently asked questions',
    items: items.map((i) => ({
      _type: 'qa',
      _key: k(),
      question: text(i.querySelector(':scope > button')),
      answer: paras(i.querySelector(':scope > button')?.nextElementSibling),
    })),
  }
}

/** contactcontent: heading, text and a button beside a HubSpot meetings calendar → form-style hero */
function contactContent(el, pagePath) {
  const prose = el.querySelector('.prose')
  const heading = text(prose?.querySelector('h1, h2'))
  const sub = [...(prose?.querySelectorAll('h3, p') ?? [])].map(text).filter(Boolean).join('\n\n')
  const meetings = el
    .querySelector('.meetings-iframe-container')
    ?.dataset.src?.replace(/[?&]embed=true/, '')
  const formId = el.innerHTML.match(/formId:\s*["']([^"']+)/)?.[1]
  return {
    _type: 'lpHero',
    _key: k(),
    style: meetings || formId ? 'form' : 'centered',
    heading,
    subheading: sub || undefined,
    buttons: buttons(el, pagePath),
    ...(meetings ? {meetingsUrl: meetings} : {}),
    ...(formId ? {hubspotFormId: formId} : {}),
  }
}

/** The page banner (between the navigation and <main>) */
function banner(doc, html) {
  const main = html.indexOf('<main')
  // The hero band sits just before <main>; ad pages have a stripped header with no </nav>
  const band = html.lastIndexOf('<div class="bg-primary bg-cover', main)
  const region = html.slice(band >= 0 ? band : html.lastIndexOf('</nav>', main), main)
  if (!/<h1/.test(region)) return null
  const d = new JSDOM(`<body>${region}</body>`, {virtualConsole: vc}).window.document
  const box = d.querySelector('[style*="background-image"]')
  const h1 = d.querySelector('h1')
  const p = h1?.parentElement?.querySelector('p')
  // Keep the live line breaks (<br>) in the subheading
  p?.querySelectorAll('br').forEach((br) => br.replaceWith('\n'))
  const sub = p
    ? copy(
        (p.textContent ?? '')
          .replaceAll(/\u00a0/g, ' ')
          .split('\n')
          .map((l) => l.replaceAll(/\s+/g, ' ').trim())
          .filter(Boolean)
          .join('\n')
          .trim(),
      )
    : ''
  const formBox = d.querySelector('.form-content')
  const formId = formBox?.innerHTML.match(/formId:\s*["']([0-9a-f-]{36})["']/)?.[1]
  return {
    _type: 'lpHero',
    _key: k(),
    style: 'banner',
    heading: text(h1),
    subheading: sub || undefined,
    ...(bgUrl(box) ? {backgroundImage: img(bgUrl(box), '')} : {}),
    ...(formId ? {hubspotFormId: formId, formHeading: text(formBox.querySelector('h3, h2')) || undefined} : {}),
  }
}

/* ---------------------------------------------------------------- page */

/** Skip the element: it carries no content */
const SKIP = Symbol('skip')

/** Footnote-only content block (small print under a section) */
function contentEl(el, {plain}) {
  if (el.querySelector('sub, small') && plain.length < 400) return {section: {_type: 'lpNotice', _key: k(), text: plain}}
  return undefined
}

/** Old theme embed-script elements: quote sliders, a lone YouTube video (ad pages), or style/script-only helpers */
function embedScriptEl(el, {out}) {
  const clone = el.cloneNode(true)
  clone.querySelectorAll('style, script, link, noscript').forEach((n) => n.remove())
  const noText = !clone.textContent.replaceAll(/\s+/g, '').length
  if (noText && !clone.querySelector('img, iframe, video')) return SKIP
  if (clone.querySelector('.slider .slides > div h3')) return {section: quoteSlider(el, out)}
  const yt = clone.querySelectorAll('iframe[src*="youtube"]')
  if (yt.length === 1 && noText && !clone.querySelector('img, video')) {
    const src = yt[0].getAttribute('src').replace(/\?si=[^&]*$/, '')
    return {section: {_type: 'lpVideos', _key: k(), fullWidth: true, videos: [{_key: k(), title: 'iGuide video', url: src.replace('/embed/', '/watch?v=')}]}}
  }
  return undefined
}

/**
 * Live element kind → converter. A converter returns {section}, SKIP, or
 * undefined when it can't map the element (listed as unsupported).
 */
const ELEMENT_CONVERTERS = new Map([
  ['textandicons', (el) => ({section: textAndIcons(el)})],
  ['logoslider', (el) => ({section: logoSlider(el)})],
  ['tabembedandbeforeafter', (el) => ({section: tabEmbed(el)})],
  ['testimonials', (el, ctx) => ({section: testimonialsEl(el, ctx.out)})],
  ['textandimage', (el, ctx) => ({section: textAndImage(el, ctx.pagePath)})],
  ['ctafeaturelarge', (el, ctx) => ({section: ctaLarge(el, ctx.pagePath)})],
  ['ctafeaturenotification', (el, ctx) => ({section: ctaLarge(el, ctx.pagePath)})],
  ['stepslider', (el) => ({section: stepSlider(el)})],
  ['faq', (el) => ({section: faqEl(el)})],
  ['contactcontent', (el, ctx) => ({section: contactContent(el, ctx.pagePath)})],
  ['camerasystemcontent', (el, ctx) => (el.querySelector('.product-loop') ? {section: packagesEl(el, ctx.pagePath)} : undefined)],
  ['featuredposts', (el) => ({section: featuredPosts(el)})],
  ['content', contentEl],
  ['embedscript', embedScriptEl],
])

/**
 * Live page elements → landing page sections (unmapped ones go to out.unsupported).
 * `showcase` (showcase.mjs) can replace any element's sections by its id ("id" or "id:2" for a repeated id)
 * and gives sections an anchor so the page's in-page menu keeps working.
 */
function convertElements(doc, pagePath, out, showcase) {
  const sections = []
  const seen = new Map()
  for (const el of doc.querySelectorAll('main .element')) {
    if (el.parentElement?.closest('.element')) continue
    const kind = el.className.match(/elements__element(\w+)/)?.[1]
    const plain = (el.textContent ?? '').replaceAll(/\s+/g, ' ').trim()
    const n = (seen.get(el.id) ?? 0) + 1
    seen.set(el.id, n)
    const ctx = {out, pagePath, plain, doc}
    const override = showcase?.elements?.[n > 1 ? `${el.id}:${n}` : el.id]
    if (override !== undefined) {
      const produced = [override?.(el, ctx)].flat().filter(Boolean)
      const anchor = showcase.anchor?.(el.id, n)
      if (produced[0] && anchor) produced[0].anchor = anchor
      sections.push(...produced)
      continue
    }
    const result = ELEMENT_CONVERTERS.get(kind)?.(el, ctx)
    if (result === SKIP) continue
    if (result) {
      const anchor = showcase?.anchor?.(el.id, n)
      sections.push(anchor ? {...result.section, anchor} : result.section)
    } else out.unsupported.push({kind, id: el.id, text: plain.slice(0, 160)})
  }
  return sections
}

function robotsOf(content) {
  const tokens = (content ?? '').toLowerCase().split(',').map((t) => t.trim())
  return {noindex: tokens.includes('noindex') || tokens.includes('none'), nofollow: tokens.includes('nofollow') || tokens.includes('none')}
}

export function convertPage(html, pagePath, {chrome = 'landing'} = {}) {
  const out = {testimonials: new Map(), unsupported: []}
  const doc = new JSDOM(html, {virtualConsole: vc}).window.document
  const meta = (n) => doc.querySelector(`meta[name="${n}"], meta[property="${n}"]`)?.getAttribute('content') ?? undefined
  const title = (doc.querySelector('title')?.textContent ?? '').replace(/\s*\|\s*iGUIDE\s*$/i, '').trim()
  const sections = []
  const manual = manualPages[pagePath]?.()
  const showcase = showcasePages[pagePath]
  if (manual) {
    sections.push(...manual.sections)
    for (const t of manual.testimonials ?? []) out.testimonials.set(t._id, t)
  } else if (showcase) {
    const hero = banner(doc, html)
    if (hero) sections.push(hero)
    sections.push(...[showcase.top?.(doc, pagePath)].flat().filter(Boolean))
    sections.push(...convertElements(doc, pagePath, out, showcase))
  } else {
    const hero = banner(doc, html)
    if (hero) sections.push(hero)
    sections.push(...convertElements(doc, pagePath, out))
  }
  return {
    doc: {
      _type: 'landingPage',
      title: copy(title),
      path: pagePath,
      seoTitle: copy(
        doc
          .querySelector('title')
          ?.textContent?.replaceAll(/iGUIDE/g, 'iGuide')
          .trim(),
      ),
      metaDescription: copy(meta('description')),
      chrome,
      live: true,
      // Same search engine setting as the live page. Only real directives count: live's "no-follow" isn't one,
      // so search engines ignore it and follow the links (e.g. "noindex,no-follow" = noindex, links followed)
      ...robotsOf(meta('robots')),
      ...manual?.extra,
      ...showcase?.extra,
      sections,
    },
    testimonials: [...out.testimonials.values()],
    unsupported: out.unsupported,
  }
}

/* Shared with showcase.mjs (used inside its functions only: the two modules import each other) */
export {SKIP, assetPath, bgUrl, button, featuredPosts, faqEl, iframeMedia, img, k, paras, tabEmbed, text, textAndIcons, textAndImage}
