import type {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {AuthorBox} from '@/components/blog/AuthorBox'
import {PortableBody} from '@/components/blog/PortableBody'
import {Container} from '@/components/ui/Container'
import {ChevronLeft} from '@/components/ui/icons'
import {formatDate} from '@/lib/resources'
import {fetchSanity} from '@/sanity/lib/fetch'
import {urlFor} from '@/sanity/lib/image'
import {BLOG_POST_QUERY, BLOG_SLUGS_QUERY} from '@/sanity/lib/queries'
import type {BlogPostData} from '@/sanity/lib/types'

export const revalidate = 60

const getPost = (slug: string) => fetchSanity<BlogPostData>(BLOG_POST_QUERY, null, {slug})

export async function generateStaticParams() {
  const slugs = await fetchSanity<string[]>(BLOG_SLUGS_QUERY, [])
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const {slug} = await params
  const post = await getPost(slug)
  if (!post) return {}

  const title = post.seo?.metaTitle || `${post.title} | iGUIDE`
  const description = post.seo?.metaDescription || post.excerpt || undefined
  // Social image: the SEO override if set, otherwise the featured image
  const shareImage = post.seo?.ogImage?.asset ? post.seo.ogImage : post.featuredImage
  const ogImage = shareImage?.asset
    ? {url: urlFor(shareImage).width(1200).height(630).fit('crop').auto('format').url(), width: 1200, height: 630}
    : undefined

  return {
    title,
    description,
    alternates: {canonical: `/blogs/${slug}`},
    robots: post.seo?.noIndex ? {index: false, follow: true} : undefined,
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/blogs/${slug}`,
      siteName: 'iGUIDE',
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage.url] : undefined,
    },
  }
}

export default async function BlogPostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const image = post.featuredImage

  // Structured data for search engines and AI answers
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt || undefined,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post._updatedAt,
    image: image?.asset ? urlFor(image).width(1200).height(630).fit('crop').url() : undefined,
    author: post.author?.name ? {'@type': 'Person', name: post.author.name} : undefined,
    publisher: {'@type': 'Organization', name: 'iGUIDE', url: 'https://goiguide.com'},
    mainEntityOfPage: `https://goiguide.com/blogs/${slug}`,
  }

  return (
    <article className="pb-24 pt-10 lg:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')}}
      />

      <Container size="medium">
        <a
          href="/resource-center?tab=blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
        >
          <ChevronLeft /> Resource Center
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-primary-soft px-3 py-1 font-semibold text-primary">Blog</span>
          {post.publishedAt && (
            <time dateTime={post.publishedAt} className="text-muted">
              {formatDate(post.publishedAt)}
            </time>
          )}
          {post.author?.name && <span className="text-muted">· By {post.author.name}</span>}
        </div>

        <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && <p className="mt-6 text-xl leading-relaxed text-muted">{post.excerpt}</p>}
      </Container>

      {image?.asset && (
        <Container size="wide" className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface">
            <Image
              src={urlFor(image).width(1800).height(1013).fit('crop').auto('format').url()}
              alt={image.alt ?? ''}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={image.asset.metadata?.lqip}
            />
          </div>
        </Container>
      )}

      <Container size="narrow">
        <div className="mt-6">{post.body?.length ? <PortableBody value={post.body} /> : null}</div>
        {post.author && <AuthorBox author={post.author} />}
      </Container>
    </article>
  )
}
