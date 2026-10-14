import {existsSync} from 'node:fs'
import {mkdir, writeFile} from 'node:fs/promises'
import {dirname, join, normalize, sep} from 'node:path'

/**
 * DEV ONLY (404 in production). Copies live goiguide.com media into public/ at
 * the same path, so /assets/... URLs keep working on the new site.
 * POST {paths: ["/assets/…"]} → [{path, status, bytes}]. Existing files are skipped.
 * Temporary: delete app/api/dev/ before launch.
 */
const LIVE = 'https://goiguide.com'
const PUBLIC_DIR = join(process.cwd(), 'public')

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') return new Response('Not found', {status: 404})
  const {paths} = (await request.json()) as {paths?: string[]}
  const results = []
  for (const path of paths ?? []) {
    // Only live media folders, never outside public/
    const target = normalize(join(PUBLIC_DIR, decodeURIComponent(path)))
    if (!/^\/(assets|_resources)\//.test(path) || !target.startsWith(PUBLIC_DIR + sep)) {
      results.push({path, status: 'rejected'})
      continue
    }
    if (existsSync(target)) {
      results.push({path, status: 'exists'})
      continue
    }
    try {
      const res = await fetch(LIVE + path, {cache: 'no-store'})
      if (!res.ok) {
        results.push({path, status: `HTTP ${res.status}`})
        continue
      }
      const body = Buffer.from(await res.arrayBuffer())
      await mkdir(dirname(target), {recursive: true})
      await writeFile(target, body)
      results.push({path, status: 'saved', bytes: body.length})
    } catch (error) {
      results.push({path, status: `error: ${(error as Error).message}`})
    }
  }
  return Response.json(results)
}
