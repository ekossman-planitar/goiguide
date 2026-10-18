import type {Metadata} from 'next'
import Image from 'next/image'
import {Container} from '@/components/ui/Container'
import {ArrowRight} from '@/components/ui/icons'
import {catalogues, getCatalogue, type CatalogueId} from '@/lib/catalogue'
import {fetchSanity} from '@/sanity/lib/fetch'
import {urlFor} from '@/sanity/lib/image'
import {CATALOGUE_ITEMS_QUERY} from '@/sanity/lib/queries'
import type {CatalogueItemData} from '@/sanity/lib/types'

export function catalogueMetadata(id: CatalogueId): Metadata {
  const c = getCatalogue(id)!
  const title = c.title
  return {title: {absolute: title}, alternates: {canonical: c.path}, openGraph: {title, url: c.path, images: ['/assets/iGUIDE-Meta-Thumbnail.png']}}
}

/**
 * One Marketing Catalogue holder (/photos, /catalogue-videos, …): a grid of
 * downloadable files, with links to the other catalogues. Each card goes to
 * /<catalogue>/<slug>, which redirects to the file (same URLs as the live site).
 */
export async function CatalogueListing({id}: {id: CatalogueId}) {
  const catalogue = getCatalogue(id)!
  const all = await fetchSanity<CatalogueItemData[]>(CATALOGUE_ITEMS_QUERY, [])
  const items = all.filter((item) => item.catalogue === id)

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <p className="font-semibold text-primary">Marketing Catalogue</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">{catalogue.label}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">Ready-made marketing files to promote your iGuide services.</p>

        <nav aria-label="Catalogues" className="mt-10 flex flex-wrap gap-2">
          {catalogues.map((c) => (
            <a
              key={c.id}
              href={c.path}
              aria-current={c.id === id ? 'page' : undefined}
              className={
                c.id === id
                  ? 'inline-flex h-10 items-center rounded-full border border-primary bg-primary px-4 text-[15px] font-medium text-white'
                  : 'inline-flex h-10 items-center rounded-full border border-line bg-white px-4 text-[15px] font-medium text-body hover:border-primary-hover hover:text-primary-hover'
              }
            >
              {c.label}
            </a>
          ))}
        </nav>

        {items.length ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {items.map((item) => (
              <li key={item._id}>
                <a
                  href={`${catalogue.path}/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:border-primary-hover/40 hover:shadow-xl"
                >
                  <span className="relative block aspect-[16/9] bg-surface">
                    {item.thumbnail?.asset && (
                      <Image
                        src={urlFor(item.thumbnail).width(800).height(450).fit('crop').auto('format').url()}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="text-xl font-bold leading-snug text-ink group-hover:text-primary-hover">{item.title}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-primary">
                      Download
                      <ArrowRight width={16} height={16} />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-line p-12 text-center text-muted">Nothing here yet. Check back soon.</p>
        )}
      </Container>
    </section>
  )
}
