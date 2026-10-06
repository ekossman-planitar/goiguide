import type {Metadata} from 'next'
import {Suspense} from 'react'
import {ResourceCenter, ResourceCenterView} from '@/components/resources/ResourceCenter'
import {Container} from '@/components/ui/Container'
import {fetchSanity} from '@/sanity/lib/fetch'
import {RESOURCES_QUERY} from '@/sanity/lib/queries'
import type {ResourceCardData} from '@/sanity/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Resource Center | iGUIDE',
  description:
    'Blogs, customer stories, webinars, videos, brochures, news, white papers and sample iGUIDE tours in one place.',
  alternates: {canonical: '/resource-center'},
}

export default async function ResourceCenterPage() {
  const items = await fetchSanity<ResourceCardData[]>(RESOURCES_QUERY, [])

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <p className="font-semibold text-primary">Resource Center</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Get more out of iGUIDE</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">
          Articles, customer stories, webinars and sample tours to help you capture, measure and share spaces.
        </p>

        <div className="mt-10">
          {/* Suspense is required because the filter reads ?tab= from the URL */}
          <Suspense fallback={<ResourceCenterView items={items} />}>
            <ResourceCenter items={items} />
          </Suspense>
        </div>
      </Container>
    </section>
  )
}
