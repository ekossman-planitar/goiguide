import {ResourceDetail, resourceMetadata, resourceStaticParams} from '@/components/resources/ResourceDetail'

export const revalidate = 60

export const generateStaticParams = resourceStaticParams('ebook')
export const generateMetadata = resourceMetadata('ebook')

export default function Page({params}: {params: Promise<{slug: string}>}) {
  return <ResourceDetail type="ebook" params={params} />
}
