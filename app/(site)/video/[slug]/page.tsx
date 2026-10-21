import {ResourceDetail, resourceMetadata, resourceStaticParams} from '@/components/resources/ResourceDetail'

export const revalidate = 60

export const generateStaticParams = resourceStaticParams('video')
export const generateMetadata = resourceMetadata('video')

export default function Page({params}: Readonly<{params: Promise<{slug: string}>}>) {
  return <ResourceDetail type="video" params={params} />
}
