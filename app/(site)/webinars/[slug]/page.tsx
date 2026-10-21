import {ResourceDetail, resourceMetadata, resourceStaticParams} from '@/components/resources/ResourceDetail'

export const revalidate = 60

export const generateStaticParams = resourceStaticParams('webinar')
export const generateMetadata = resourceMetadata('webinar')

export default function Page({params}: Readonly<{params: Promise<{slug: string}>}>) {
  return <ResourceDetail type="webinar" params={params} />
}
