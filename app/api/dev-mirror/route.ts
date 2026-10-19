// TEMP (delete after use): copies a live goiguide.com /assets file into public/ at the same path, for the page migration. Dev only.
import {existsSync, mkdirSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') return new Response('Not found', {status: 404})
  const path = new URL(request.url).searchParams.get('path') ?? ''
  if (!path.startsWith('/assets/') || path.includes('..')) return new Response('bad path', {status: 400})
  const dest = join(process.cwd(), 'public', path)
  if (existsSync(dest)) return Response.json({path, status: 'exists'})
  const res = await fetch(`https://goiguide.com${encodeURI(path)}`)
  if (!res.ok) return Response.json({path, status: res.status})
  mkdirSync(dirname(dest), {recursive: true})
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
  return Response.json({path, status: 'saved'})
}
