import type {Metadata} from 'next'
import {notFound, permanentRedirect} from 'next/navigation'
import {ArticleBody} from '@/components/help/ArticleBody'
import {HelpSubnav} from '@/components/help/HelpSubnav'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ChevronDown} from '@/components/ui/icons'
import {cn} from '@/lib/cn'
import {longDate} from '@/lib/help/format'
import {prepareArticleBody} from '@/lib/help/html'
import {supportContact, zendeskLinks} from '@/lib/help/navigation'
import {
  articlePath,
  categoryPath,
  excerpt,
  getArticle,
  getArticles,
  getCategories,
  getSections,
  idFromSlug,
  sectionPath,
  sectionTrail,
  zendeskSlug,
  type HelpArticleSummary,
} from '@/lib/help/zendesk'
import {pageMetadata} from '@/lib/pageMetadata'

// Refresh from Zendesk every 2 minutes (must be a literal; keep in step with HELP_REVALIDATE)
export const revalidate = 120

type Props = {params: Promise<{slug: string}>}

export async function generateStaticParams() {
  try {
    return (await getArticles()).map((a) => ({slug: zendeskSlug(a.html_url)}))
  } catch {
    return [] // Zendesk unreachable at build: pages render on first visit instead
  }
}

async function load(slug: string) {
  const id = idFromSlug(slug)
  return id ? getArticle(id) : null
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const article = await load((await params).slug)
  if (!article) return {}
  return pageMetadata({title: `${article.title} | iGuide Help Center`, description: excerpt(article.body), path: articlePath(article)})
}

export default async function ArticlePage({params}: Readonly<Props>) {
  const {slug} = await params
  const article = await load(slug)
  if (!article) notFound()
  if (decodeURIComponent(slug) !== zendeskSlug(article.html_url)) permanentRedirect(articlePath(article))

  const [categories, sections, articles] = await Promise.all([getCategories(), getSections(), getArticles()])
  const section = sections.find((s) => s.id === article.section_id)
  const category = section && categories.find((c) => c.id === section.category_id)
  const inSection = articles.filter((a) => a.section_id === article.section_id)

  return (
    <>
      <HelpSubnav
        crumbs={[
          ...(category ? [{label: category.name, href: categoryPath(category)}] : []),
          ...(section ? sectionTrail(section, sections).map((s) => ({label: s.name, href: sectionPath(s)})) : []),
        ]}
      />
      <Container className="grid gap-10 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14 lg:py-14">
        {section && inSection.length > 1 && (
          <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
            <SectionNav sectionName={section.name} articles={inSection} currentId={article.id} />
          </aside>
        )}

        <article className={cn('min-w-0 max-w-[800px]', !(section && inSection.length > 1) && 'lg:col-span-2 lg:mx-auto lg:w-full')}>
          <header className="border-b border-line pb-6">
            <h1 id="top" className="text-balance text-[34px] leading-tight font-semibold text-ink md:text-[44px]">
              {article.title}
            </h1>
            <p className="mt-3 text-sm text-muted">
              Updated <time dateTime={article.edited_at}>{longDate(article.edited_at)}</time>
            </p>
          </header>

          <div className="mt-8">
            <ArticleBody html={prepareArticleBody(article.body)} />
          </div>

          <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-ink">Still need help?</h2>
              <p className="mt-1 text-[15px] text-body">
                Call us at{' '}
                <a href={supportContact.phone.href} className="help-call underline underline-offset-2 hover:text-primary-hover">
                  {supportContact.phone.label}
                </a>{' '}
                or send our support team a request.
              </p>
            </div>
            <a
              href={zendeskLinks.submitRequest}
              className="help-submit-request inline-flex shrink-0 items-center justify-center rounded-lg border border-primary bg-primary px-5 py-2.5 font-semibold text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
            >
              Submit a request
            </a>
          </div>

          <p className="mt-8">
            <a href="#top" className="text-sm font-semibold text-primary hover:text-primary-hover">
              Return to top ↑
            </a>
          </p>
        </article>
      </Container>
    </>
  )
}

/** "Articles in this section": sidebar on desktop, collapsible on phones (as on help.youriguide.com) */
function SectionNav({sectionName, articles, currentId}: Readonly<{sectionName: string; articles: HelpArticleSummary[]; currentId: number}>) {
  const list = (
    <ul className="mt-3 space-y-0.5 border-l border-line">
      {articles.map((a) => (
        <li key={a.id}>
          <SmartLink
            href={articlePath(a)}
            aria-current={a.id === currentId ? 'page' : undefined}
            className={cn(
              'help-section-nav-link -ml-px block border-l-2 py-1.5 pl-4 text-[15px] leading-snug transition-colors',
              a.id === currentId ? 'border-primary-hover font-semibold text-ink' : 'border-transparent text-muted hover:text-ink',
            )}
          >
            {a.title}
          </SmartLink>
        </li>
      ))}
    </ul>
  )
  return (
    <nav aria-label="Articles in this section">
      <details className="group rounded-xl border border-line p-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink [&::-webkit-details-marker]:hidden">
          Articles in this section
          <ChevronDown className="transition-transform group-open:rotate-180" />
        </summary>
        {list}
      </details>
      <div className="hidden lg:block">
        <p className="text-sm font-semibold tracking-wide text-muted uppercase">{sectionName}</p>
        {list}
      </div>
    </nav>
  )
}
