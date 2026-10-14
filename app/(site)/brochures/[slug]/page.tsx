import {ResourceDetail, resourceMetadata, resourceStaticParams} from '@/components/resources/ResourceDetail'

export const revalidate = 60

export const generateStaticParams = resourceStaticParams('brochure')
export const generateMetadata = resourceMetadata('brochure')

export default function Page({params}: {params: Promise<{slug: string}>}) {
  return <ResourceDetail type="brochure" params={params} />
}
