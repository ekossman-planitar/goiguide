import {CatalogueListing, catalogueMetadata} from '@/components/catalogue/CatalogueListing'

export const revalidate = 60
export const metadata = catalogueMetadata('drawing-package-samples')

export default function Page() {
  return <CatalogueListing id="drawing-package-samples" />
}
