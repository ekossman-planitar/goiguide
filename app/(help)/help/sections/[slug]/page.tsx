import type {Metadata} from 'next'
import {notFound, permanentRedirect} from 'next/navigation'
import {ArticleLinkList} from '@/components/help/ArticleLinkList'
import {HelpCta} from '@/components/help/HelpCta'
import {HelpSubnav} from '@/components/help/HelpSubnav'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ChevronRight} from '@/components/ui/icons'
import {
  categoryPath,
  getArticles,
  getCategories,
  getSections,
  idFromSlug,
  sectionPath,
  sectionTrail,
  zendeskSlug,
} from '@/lib/help/zendesk'
import {pageMetadata} from '@/lib/pageMetadata'

// Refresh from Zendesk every 2 minutes (must be a literal; keep in step with HELP_REVALIDATE)
export const revalidate = 120

type Props = {params: Promise<{slug: string}>}

export async function generateStaticParams() {
  try {
    return (await getSections()).map((s) => ({slug: zendeskSlug(s.html_url)}))
  } catch {
    return [] // Zendesk unreachable at build: pages render on first visit instead
  }
}

async function load(slug: string) {
  const id = idFromSlug(slug)
  if (!id) return null
  const sections = await getSections()
  const section = sections.find((s) => s.id === id)
  return section ? {section, sections} : null
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const found = await load((await params).slug)
  if (!found) return {}
  const {section} = found
  return pageMetadata({title: `${section.name} | iGuide Help Center`, description: section.description || section.name, path: sectionPath(section)})
}

export default async function SectionPage({params}: Props) {
  const {slug} = await params
  const found = await load(slug)
  if (!found) notFound()
  const {section, sections} = found
  if (decodeURIComponent(slug) !== zendeskSlug(section.html_url)) permanentRedirect(sectionPath(section))

  const [categories, articles] = await Promise.all([getCategories(), getArticles()])
  const category = categories.find((c) => c.id === section.category_id)
  const children = sections.filter((s) => s.parent_section_id === section.id)
  const own = articles.filter((a) => a.section_id === section.id)

  return (
    <>
      <HelpSubnav
        crumbs={[
          ...(category ? [{label: category.name, href: categoryPath(category)}] : []),
          ...sectionTrail(section, sections).map((s) => ({label: s.name, href: sectionPath(s)})),
        ]}
      />
      <section className="py-12 lg:py-16">
        <Container size="medium">
          <h1 className="text-balance text-[36px] leading-tight font-semibold text-ink md:text-[48px]">{section.name}</h1>
          {section.description && <p className="mt-4 text-xl leading-[30px] text-muted">{section.description}</p>}

          {children.length > 0 && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {children.map((c) => (
                <li key={c.id}>
                  <SmartLink
                    href={sectionPath(c)}
                    className="help-subsection group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-5 py-4 font-semibold text-ink transition-colors hover:border-primary-hover hover:text-primary-hover"
                  >
                    {c.name}
                    <ChevronRight aria-hidden width={18} height={18} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}

          {own.length > 0 && (
            <div className="mt-8">
              <ArticleLinkList articles={own} />
            </div>
          )}
        </Container>
      </section>
      <HelpCta />
    </>
  )
}
