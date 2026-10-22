import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {LandingSections} from '@/components/landing/LandingSections'
import {LpFooter, LpHeader} from '@/components/landing/LpChrome'
import {SiteFooter} from '@/components/layout/SiteFooter'
import {FloatingBookButton} from '@/components/pages/FloatingBookButton'
import {SiteHeader} from '@/components/layout/SiteHeader'
import type {LandingPageData} from '@/components/landing/types'
import {fetchSanity} from '@/sanity/lib/fetch'
import {LANDING_PAGE_QUERY, LANDING_PATHS_QUERY} from '@/sanity/lib/queries'

/**
 * Paid-media landing pages, at whatever URL the editor set in Sanity
 * (Landing pages). Every other site route is more specific and wins over this
 * catch-all; anything that isn't a live landing page is a 404.
 */
export const revalidate = 60

type Props = {params: Promise<{path: string[]}>}

const getPage = async (params: Props['params']) => {
  const {path} = await params
  return fetchSanity<LandingPageData | null>(LANDING_PAGE_QUERY, null, {path: `/${path.join('/')}`})
}

export async function generateStaticParams() {
  const paths = await fetchSanity<string[]>(LANDING_PATHS_QUERY, [])
  return paths.map((p) => ({path: p.split('/').filter(Boolean)}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const page = await getPage(params)
  if (!page) return {}
  const title = page.seoTitle || `${page.title ?? 'iGuide'} | iGuide`
  const image = page.shareImage ?? '/assets/iGUIDE-Meta-Thumbnail.png'
  return {
    title: {absolute: title},
    description: page.metaDescription,
    alternates: {canonical: page.path},
    // Hidden from search engines unless the page says otherwise (pages from the old site keep its setting)
    robots: {index: page.noindex === false, follow: page.nofollow !== true},
    openGraph: {title, description: page.metaDescription, url: page.path, siteName: 'iGuide', locale: 'en_CA', type: 'website', images: [image]},
  }
}

export default async function LandingPage({params}: Readonly<Props>) {
  const page = await getPage(params)
  if (!page) notFound()
  // "Full site navigation" pages (e.g. thank-you pages) use the normal site header and footer, as on live
  const site = page.chrome === 'site'
  return (
    <>
      {site ? <SiteHeader /> : <LpHeader button={page.headerButton} />}
      <main className="flex-1">
        <LandingSections sections={page.sections ?? []} />
      </main>
      {site ? <SiteFooter /> : <LpFooter />}
      {page.floatingBookButton && <FloatingBookButton />}
    </>
  )
}
