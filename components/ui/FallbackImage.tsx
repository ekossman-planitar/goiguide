'use client'

import Image, {type ImageProps} from 'next/image'
import {useCallback, useState, type ReactNode} from 'react'

/**
 * next/image that shows `fallback` instead if the file fails to load
 * (e.g. an image not yet added to /public).
 */
export function FallbackImage({fallback = null, ...props}: ImageProps & {fallback?: ReactNode}) {
  const [failed, setFailed] = useState(false)

  // Catch images that already failed before React hydrated (onError won't fire for those)
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  if (failed) return <>{fallback}</>
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props
  return <Image {...props} ref={ref} onError={() => setFailed(true)} />
}
