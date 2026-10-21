import {ResourceDetail, resourceMetadata, resourceStaticParams} from '@/components/resources/ResourceDetail'

export const revalidate = 60

export const generateStaticParams = resourceStaticParams('galleryItem')
export const generateMetadata = resourceMetadata('galleryItem')

export default function Page({params}: Readonly<{params: Promise<{slug: string}>}>) {
  return <ResourceDetail type="galleryItem" params={params} />
}
