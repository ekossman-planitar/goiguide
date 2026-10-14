import {CatalogueListing, catalogueMetadata} from '@/components/catalogue/CatalogueListing'

export const revalidate = 60
export const metadata = catalogueMetadata('presentations')

export default function Page() {
  return <CatalogueListing id="presentations" />
}
