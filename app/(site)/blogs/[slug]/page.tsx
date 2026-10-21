import {ResourceDetail, resourceMetadata, resourceStaticParams} from '@/components/resources/ResourceDetail'

export const revalidate = 60

export const generateStaticParams = resourceStaticParams('blogPost')
export const generateMetadata = resourceMetadata('blogPost')

export default function Page({params}: Readonly<{params: Promise<{slug: string}>}>) {
  return <ResourceDetail type="blogPost" params={params} />
}
