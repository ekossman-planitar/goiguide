/**
 * DEV ONLY (404 in production). Returns a live goiguide.com page's HTML so the
 * migration tooling running on localhost can compare it with the new page.
 * Temporary: delete app/api/dev/ before launch.
 */
const LIVE = 'https://goiguide.com'

export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') return new Response('Not found', {status: 404})
  const path = new URL(request.url).searchParams.get('path') ?? ''
  if (!path.startsWith('/') || path.startsWith('//')) return new Response('Bad path', {status: 400})
  const res = await fetch(LIVE + path, {cache: 'no-store'})
  return new Response(await res.text(), {status: res.status, headers: {'Content-Type': 'text/html; charset=utf-8'}})
}
