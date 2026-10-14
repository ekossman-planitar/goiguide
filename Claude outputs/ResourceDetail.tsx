import type {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {AuthorBox} from '@/components/blog/AuthorBox'
import {PortableBody} from '@/components/blog/PortableBody'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {SmartLink} from '@/components/ui/SmartLink'
import {ChevronLeft} from '@/components/ui/icons'
import {formatDate, resourceLink} from '@/lib/resources'
import {categoryLabel, getResourceType, undatedTypes, type ResourceTypeName} from '@/lib/resourceTypes'
import {fetchSanity} from '@/sanity/lib/fetch'
import {urlFor} from '@/sanity/lib/image'
import {RESOURCE_DETAIL_QUERY, RESOURCE_SLUGS_QUERY} from '@/sanity/lib/queries'
import type {ResourceDetailData} from '@/sanity/lib/types'
import {ResourceCard} from './ResourceCard'

/**
 * Detail page shared by every Resource Center type (/blogs/<slug>,
 * /news/<slug>, /customer-stories/<slug>, …). Each route file passes its type.
 */
type RouteProps = {params: Promise<{slug: string}>}

const getItem = (type: ResourceTypeName, slug: string) =>
  fetchSanity<ResourceDetailData>(RESOURCE_DETAIL_QUERY, null, {type, slug})

/** generateStaticParams for a type's detail route */
export function resourceStaticParams(type: ResourceTypeName) {
  return async () => {
    const slugs = await fetchSanity<string[]>(RESOURCE_SLUGS_QUERY, [], {type})
    return slugs.map((slug) => ({slug}))
  }
}

/** generateMetadata for a type's detail route */
export function resourceMetadata(type: ResourceTypeName) {
  return async ({params}: RouteProps): Promise<Metadata> => {
    const {slug} = await params
    const item = await getItem(type, slug)
    if (!item) return {}
    const path = `${getResourceType(type)!.basePath}/${slug}`
    // Live titles are "<title> | iGUIDE"; imported meta titles already include it
    const title = item.seo?.metaTitle || `${item.title} | iGUIDE`
    const description = item.seo?.metaDescription || item.excerpt || undefined
    const shareImage = item.seo?.ogImage?.asset ? item.seo.ogImage : item.featuredImage
    const ogImage = shareImage?.asset
      ? {url: urlFor(shareImage).width(1200).height(630).fit('crop').auto('format').url(), width: 1200, height: 630}
      : {url: '/assets/iGUIDE-Meta-Thumbnail.png'}
    return {
      title: {absolute: title},
      description,
      alternates: {canonical: path},
      robots: item.seo?.noIndex ? {index: false, follow: true} : undefined,
      openGraph: {
        type: 'article',
        title,
        description,
        url: path,
        siteName: 'iGUIDE',
        publishedTime: item.publishedAt ?? undefined,
        modifiedTime: item._updatedAt,
        authors: item.author?.name ? [item.author.name] : undefined,
        images: [ogImage],
      },
      twitter: {card: 'summary_large_image', title, description, images: [ogImage.url]},
    }
  }
}

const schemaTypes: Partial<Record<ResourceTypeName, string>> = {blogPost: 'BlogPosting', newsArticle: 'NewsArticle'}

export async function ResourceDetail({type, params}: {type: ResourceTypeName} & RouteProps) {
  const {slug} = await params
  const item = await getItem(type, slug)
  if (!item) notFound()

  const config = getResourceType(type)!
  const url = `https://goiguide.com${config.basePath}/${slug}`
  const image = item.featuredImage
  const action = resourceLink(item)
  const showDate = !undatedTypes.has(type) && item.publishedAt

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaTypes[type] ?? 'Article',
    headline: item.title,
    description: item.seo?.metaDescription || item.excerpt || undefined,
    datePublished: item.publishedAt ?? undefined,
    dateModified: item._updatedAt,
    image: image?.asset ? urlFor(image).width(1200).height(630).fit('crop').url() : undefined,
    author: item.author?.name ? {'@type': 'Person', name: item.author.name} : undefined,
    publisher: {'@type': 'Organization', name: 'iGUIDE', url: 'https://goiguide.com'},
    mainEntityOfPage: url,
  }

  const share = [
    {label: 'Facebook', href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`},
    {label: 'X (Twitter)', href: `https://twitter.com/share?url=${encodeURIComponent(url)}`},
    {label: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`},
    {label: 'Email', href: `mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(url)}`},
  ]

  return (
    <article className="pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')}} />

      {/* Header: title and details left, image or video right */}
      <header className="bg-surface pt-8 pb-12 lg:pt-12 lg:pb-[60px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SmartLink href={config.basePath} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
              <ChevronLeft /> {config.label}
            </SmartLink>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
              {(item.categories?.length ? item.categories : [null]).map((cat) => (
                <span key={cat ?? 'type'} className="rounded-full bg-primary-soft px-3 py-1 font-semibold text-primary">
                  {cat ? categoryLabel(config, cat) : config.singular}
                </span>
              ))}
              {showDate && (
                <time dateTime={item.publishedAt!} className="text-muted">
                  {formatDate(item.publishedAt)}
                </time>
              )}
              {item.author?.name && <span className="text-muted">· By {item.author.name}</span>}
            </div>
            <h1 className="mt-5 text-balance text-[40px] font-bold leading-[1.15] text-ink md:text-5xl">{item.title}</h1>
            {item.excerpt && <p className="mt-6 text-xl leading-[30px] text-muted">{item.excerpt}</p>}
            {item.eventDateText && (
              <p className="mt-6 text-lg">
                <span className="font-semibold text-ink">Date:</span> <span className="text-body">{item.eventDateText}</span>
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              {action.external && (
                <Button href={action.href} size="lg" newTab>
                  {action.label}
                </Button>
              )}
              {item.eventCta?.href && (
                <Button href={item.eventCta.href} size="lg" variant={action.external ? 'secondary' : 'primary'} newTab>
                  {item.eventCta.label || 'Register'}
                </Button>
              )}
              {item.newsCta?.href && (
                <Button href={item.newsCta.href} size="lg" variant="secondary" newTab>
                  {item.newsCta.label || 'Read more'}
                </Button>
              )}
            </div>
          </div>
          <div className="min-w-0">
            {item.headerVideoUrl ? (
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-white shadow-lg">
                <iframe src={item.headerVideoUrl} title={item.title} className="absolute inset-0 h-full w-full" allowFullScreen />
              </div>
            ) : image?.asset ? (
              <Image
                src={urlFor(image).width(1400).fit('max').auto('format').url()}
                alt={image.alt ?? ''}
                width={1400}
                height={788}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full rounded-2xl shadow-lg"
                placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
                blurDataURL={image.asset.metadata?.lqip}
              />
            ) : null}
          </div>
        </Container>
      </header>

      <Container size="narrow">
        {item.body?.length ? <PortableBody value={item.body} /> : null}
        {item.author && <AuthorBox author={item.author} />}
        <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-6 text-sm">
          <span className="font-semibold text-ink">Share:</span>
          {share.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
              {s.label}
            </a>
          ))}
        </div>
      </Container>

      {item.related?.length ? (
        <section className="mt-20">
          <Container>
            <h2 className="text-[32px] font-bold leading-[normal] text-ink md:text-5xl md:leading-[normal]">Related {config.label.toLowerCase()}</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {item.related.map((r) => (
                <li key={r._id}>
                  <ResourceCard item={r} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </article>
  )
}
