// TEMP (delete after use): saves a live goiguide.com page into scripts/.import-samples/unlisted/. Dev only.
import {writeFileSync} from 'node:fs'
import {join} from 'node:path'

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') return new Response('Not found', {status: 404})
  const path = new URL(request.url).searchParams.get('path') ?? ''
  if (!/^\/get-iguide\/[\w/-]+$/.test(path)) return new Response('bad path', {status: 400})
  const res = await fetch(`https://goiguide.com${path}`)
  const name = `${path.slice(1).replaceAll('/', '_')}.html`
  writeFileSync(join(process.cwd(), 'scripts/.import-samples/unlisted', name), await res.text())
  return Response.json({path, name, status: res.status})
}
