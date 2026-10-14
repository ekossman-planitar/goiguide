import {notFound, redirect} from 'next/navigation'
import {fetchSanity} from '@/sanity/lib/fetch'
import {CATALOGUE_ITEM_QUERY} from '@/sanity/lib/queries'
import type {CatalogueItemData} from '@/sanity/lib/types'

/** Live behaviour: the item's page sends visitors straight to its file. */
export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const item = await fetchSanity<CatalogueItemData | null>(CATALOGUE_ITEM_QUERY, null, {catalogue: 'drawing-package-samples', slug})
  if (!item?.fileUrl) notFound()
  redirect(item.fileUrl)
}
