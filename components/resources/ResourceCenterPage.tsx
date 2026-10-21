import type {Metadata} from 'next'
import {Container} from '@/components/ui/Container'
import {getResourceType, RESOURCE_CENTER_PATH, resourceCenterTitle, type ResourceTypeName} from '@/lib/resourceTypes'
import {fetchSanity} from '@/sanity/lib/fetch'
import {RESOURCES_QUERY} from '@/sanity/lib/queries'
import type {ResourceCardData} from '@/sanity/lib/types'
import {ResourceCenter} from './ResourceCenter'

/** Title + description for the Resource Center and its per-type listing URLs */
export function resourceCenterMetadata(type?: ResourceTypeName): Metadata {
  const config = type ? getResourceType(type) : undefined
  const title = resourceCenterTitle(config)
  const description =
    'Learn how to get more out of iGuide with blogs, white papers, customer stories, brochures, videos, webinars, and news. Everything you need to start strong and scale faster with iGuide.'
  const path = config?.basePath ?? RESOURCE_CENTER_PATH
  return {
    title,
    description,
    alternates: {canonical: path},
    openGraph: {title, description, url: path, siteName: 'iGuide', type: 'website', images: ['/assets/iGUIDE-Meta-Thumbnail.png']},
  }
}

/** The Resource Center, optionally opened on one type (e.g. /blogs shows the Blog filter) */
export async function ResourceCenterPage({type}: Readonly<{type?: ResourceTypeName}>) {
  const items = await fetchSanity<ResourceCardData[]>(RESOURCES_QUERY, [])

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <p className="font-semibold text-primary">Resource Center</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">Get more out of iGuide</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">
          Articles, customer stories, webinars and sample tours to help you capture, measure and share spaces.
        </p>
        <div className="mt-10">
          <ResourceCenter items={items} initialType={type} />
        </div>
      </Container>
    </section>
  )
}
