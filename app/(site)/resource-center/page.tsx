import {ResourceCenterPage, resourceCenterMetadata} from '@/components/resources/ResourceCenterPage'

export const revalidate = 60

export const metadata = resourceCenterMetadata()

export default function Page() {
  return <ResourceCenterPage />
}
