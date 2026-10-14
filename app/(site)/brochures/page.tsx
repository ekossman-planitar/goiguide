import {ResourceCenterPage, resourceCenterMetadata} from '@/components/resources/ResourceCenterPage'

/** Resource Center opened on one filter (live site: /resource-center?tab=…) */
export const revalidate = 60

export const metadata = resourceCenterMetadata('brochure')

export default function Page() {
  return <ResourceCenterPage type="brochure" />
}
