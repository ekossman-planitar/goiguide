import {mkdir, writeFile} from 'node:fs/promises'
import {join} from 'node:path'

/**
 * DEV ONLY (404 in production). Returns a live goiguide.com page's HTML so the
 * migration tooling running on localhost can compare it with the new page.
 * With &save=<name>, also writes it to scripts/.import-samples/<name>.html for
 * testing the import script offline.
 * Temporary: delete app/api/dev/ before launch.
 */
const LIVE = 'https://goiguide.com'

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') return new Response('Not found', {status: 404})
  const params = new URL(request.url).searchParams
  const path = params.get('path') ?? ''
  if (!path.startsWith('/') || path.startsWith('//')) return new Response('Bad path', {status: 400})
  const res = await fetch(LIVE + path, {cache: 'no-store'})
  const html = await res.text()
  const save = params.get('save')
  if (save && /^[\w-]+$/.test(save)) {
    const dir = join(process.cwd(), 'scripts', '.import-samples')
    await mkdir(dir, {recursive: true})
    await writeFile(join(dir, `${save}.html`), html)
  }
  return new Response(html, {status: res.status, headers: {'Content-Type': 'text/html; charset=utf-8'}})
}
