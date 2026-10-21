import type {ComponentProps} from 'react'
import {LogoBand} from '@/components/blocks/LogoBand'
import {resolveLogos} from '@/lib/cmsLibrary'

/** LogoBand whose logos can be managed in Sanity (Logos → Logo bands). `band` is the band's fixed ID. */
export async function CmsLogoBand({band, logos, ...props}: Readonly<ComponentProps<typeof LogoBand> & {band?: string}>) {
  return <LogoBand {...props} logos={await resolveLogos(band, logos)} />
}
