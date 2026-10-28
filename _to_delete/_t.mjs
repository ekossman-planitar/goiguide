import {JSDOM} from 'jsdom'
import {htmlToPortableText} from '@portabletext/html'
const html = `<ul><li><p>One</p></li><li><div class="fusion-li-item-content"><p>Two</p></div></li><li><div class="fusion-li-item-content"><p>Three</p></div></li></ul>`
const run = (h) => htmlToPortableText(h, {parseHtml: (x) => new JSDOM(x).window.document}).map((b) => (b.listItem ?? 'plain') + ':' + b.children.map((c) => c.text).join(''))
console.log('before', run(html))
const doc = new JSDOM(`<body>${html}</body>`).window.document
for (const wrap of doc.body.querySelectorAll('li > div')) if (wrap.parentElement.children.length === 1) wrap.replaceWith(...wrap.childNodes)
console.log('after', run(doc.body.innerHTML))
