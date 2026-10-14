import {ResourceDetail, resourceMetadata, resourceStaticParams} from '@/components/resources/ResourceDetail'

export const revalidate = 60

export const generateStaticParams = resourceStaticParams('newsArticle')
export const generateMetadata = resourceMetadata('newsArticle')

export default function Page({params}: {params: Promise<{slug: string}>}) {
  return <ResourceDetail type="newsArticle" params={params} />
}
