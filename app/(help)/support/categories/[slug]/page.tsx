import type {Metadata} from 'next'
import {notFound, permanentRedirect} from 'next/navigation'
import {ArticleLinkList} from '@/components/help/ArticleLinkList'
import {HelpCta} from '@/components/help/HelpCta'
import {HelpSubnav} from '@/components/help/HelpSubnav'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ArrowRight} from '@/components/ui/icons'
import {categoryPath, getArticles, getCategories, getSections, idFromSlug, sectionPath, zendeskSlug} from '@/lib/help/zendesk'
import {pageMetadata} from '@/lib/pageMetadata'

// Refresh from Zendesk every 2 minutes (must be a literal; keep in step with HELP_REVALIDATE)
export const revalidate = 120

/** Articles shown per section before "See all" (as on help.youriguide.com) */
const PREVIEW = 6

type Props = {params: Promise<{slug: string}>}

export async function generateStaticParams() {
  try {
    return (await getCategories()).map((c) => ({slug: zendeskSlug(c.html_url)}))
  } catch {
    return [] // Zendesk unreachable at build: pages render on first visit instead
  }
}

async function load(slug: string) {
  const id = idFromSlug(slug)
  if (!id) return null
  const category = (await getCategories()).find((c) => c.id === id)
  return category ?? null
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const category = await load((await params).slug)
  if (!category) return {}
  return pageMetadata({title: `${category.name} | iGuide Help Center`, description: category.description || category.name, path: categoryPath(category)})
}

export default async function CategoryPage({params}: Readonly<Props>) {
  const {slug} = await params
  const category = await load(slug)
  if (!category) notFound()
  // Old or shortened slugs (e.g. /support/categories/123) go to the current URL, like Zendesk does
  if (decodeURIComponent(slug) !== zendeskSlug(category.html_url)) permanentRedirect(categoryPath(category))

  const [sections, articles] = await Promise.all([getSections(), getArticles()])
  const topLevel = sections.filter((s) => s.category_id === category.id && !s.parent_section_id)

  return (
    <>
      <HelpSubnav crumbs={[{label: category.name, href: categoryPath(category)}]} />
      <section className="py-12 lg:py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-balance text-[36px] leading-tight font-semibold text-ink md:text-[48px]">{category.name}</h1>
            {category.description && <p className="mt-4 text-xl leading-[30px] text-muted">{category.description}</p>}
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {topLevel.map((s) => {
              const own = articles.filter((a) => a.section_id === s.id)
              return (
                <section key={s.id} aria-labelledby={`sec-${s.id}`}>
                  <h2 id={`sec-${s.id}`} className="border-b border-line pb-3 text-[22px] leading-tight font-semibold text-ink">
                    <SmartLink href={sectionPath(s)} className="hover:text-primary-hover">
                      {s.name}
                    </SmartLink>
                  </h2>
                  <div className="mt-3">
                    <ArticleLinkList articles={own.slice(0, PREVIEW)} />
                  </div>
                  {own.length > PREVIEW && (
                    <SmartLink href={sectionPath(s)} className="mt-3 text-link text-sm">
                      See all {own.length} articles
                      <ArrowRight width={16} height={16} />
                    </SmartLink>
                  )}
                </section>
              )
            })}
          </div>
        </Container>
      </section>
      <HelpCta />
    </>
  )
}
