import type {Metadata} from 'next'
import {ResourceCard} from '@/components/resources/ResourceCard'
import {Container} from '@/components/ui/Container'
import {fetchSanity} from '@/sanity/lib/fetch'
import {RESOURCES_OF_TYPE_QUERY} from '@/sanity/lib/queries'
import type {ResourceCardData} from '@/sanity/lib/types'

export const revalidate = 60

// Live: /ebooks is a CMS listing page titled "eBooks"
export const metadata: Metadata = {
  // Copied from the live page (2026-10-09)
  title: {absolute: 'Ebooks | iGuide'},
  description:
    'iGuide ebooks are available on a range of subjects to help users maximize their experience, learn how to use iGuide in their lines of business, and more.',
  alternates: {canonical: '/ebooks'},
  openGraph: {title: 'Ebooks | iGuide', url: '/ebooks', images: ['/assets/iGUIDE-Meta-Thumbnail.png']},
}

export default async function EbooksPage() {
  const items = await fetchSanity<ResourceCardData[]>(RESOURCES_OF_TYPE_QUERY, [], {type: 'ebook'})
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <h1 className="text-4xl font-semibold text-ink sm:text-5xl">eBooks</h1>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item) => (
            <li key={item._id}>
              <ResourceCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
