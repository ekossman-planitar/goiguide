import Image from 'next/image'
import {ArrowRight} from '@/components/ui/icons'
import {formatDate, resourceLink} from '@/lib/resources'
import {getResourceType, undatedTypes} from '@/lib/resourceTypes'
import {urlFor} from '@/sanity/lib/image'
import type {ResourceCardData} from '@/sanity/lib/types'

/**
 * Card for any Resource Center item: featured image with a type pill, then
 * date, title, short description and link. The whole card is one link (the
 * title link stretches over the card), so it can be clicked anywhere.
 */
export function ResourceCard({item}: {item: ResourceCardData}) {
  const type = getResourceType(item._type)
  const {href, external, label} = resourceLink(item)
  const linkProps = external ? {target: '_blank', rel: 'noopener noreferrer'} : {}
  const showDate = !undatedTypes.has(item._type) && item.publishedAt
  const image = item.featuredImage

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-hover/40 hover:shadow-xl hover:shadow-primary/10 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-primary">
      <div className="relative">
        <div className="relative aspect-[16/9] overflow-hidden bg-surface">
          {image?.asset && (
            <Image
              src={urlFor(image).width(800).height(450).fit('crop').auto('format').url()}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={image.asset.metadata?.lqip}
            />
          )}
        </div>
        {type && (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary shadow-sm">
            {type.label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {showDate ? (
          <time dateTime={item.publishedAt!} className="text-sm text-muted">
            {formatDate(item.publishedAt)}
          </time>
        ) : (
          <span className="text-sm text-muted">Interactive 3D tour</span>
        )}
        <h3 className="mt-3 text-xl font-semibold leading-snug text-ink">
          {/* Stretched link: its ::after covers the whole card */}
          <a
            href={href}
            {...linkProps}
            aria-label={`${item.title} (${label})`}
            className="transition-colors group-hover:text-primary-hover after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {item.title}
          </a>
        </h3>
        {item.excerpt && <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{item.excerpt}</p>}
        <span aria-hidden className="mt-auto pt-6 text-link">
          {label}
          <ArrowRight width={16} height={16} />
        </span>
      </div>
    </article>
  )
}
