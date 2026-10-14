import {ResourceDetail, resourceMetadata, resourceStaticParams} from '@/components/resources/ResourceDetail'

export const revalidate = 60

export const generateStaticParams = resourceStaticParams('whitePaper')
export const generateMetadata = resourceMetadata('whitePaper')

export default function Page({params}: {params: Promise<{slug: string}>}) {
  return <ResourceDetail type="whitePaper" params={params} />
}
