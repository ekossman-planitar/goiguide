import {ResourceDetail, resourceMetadata, resourceStaticParams} from '@/components/resources/ResourceDetail'

export const revalidate = 60

export const generateStaticParams = resourceStaticParams('customerStory')
export const generateMetadata = resourceMetadata('customerStory')

export default function Page({params}: {params: Promise<{slug: string}>}) {
  return <ResourceDetail type="customerStory" params={params} />
}
