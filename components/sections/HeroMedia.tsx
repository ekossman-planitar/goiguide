import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import type {HeroMediaData} from '@/sanity/lib/types'

/** Right side of the hero: Sanity image or autoplaying muted video in a 16:9 frame. */
export function HeroMedia({media}: {media?: HeroMediaData | null}) {
  const frame = 'relative aspect-video w-full overflow-hidden rounded-2xl bg-surface'

  if (media?.mediaType === 'video' && media.videoSrc) {
    return (
      <div className={frame}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.videoSrc}
          poster={media.posterSrc ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      </div>
    )
  }

  const image = media?.mediaType !== 'video' ? media?.image : null
  if (image?.asset) {
    return (
      <div className={frame}>
        <Image
          src={urlFor(image).width(1600).height(900).fit('crop').auto('format').url()}
          alt={image.alt ?? ''}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={image.asset.metadata?.lqip}
        />
      </div>
    )
  }

  // Nothing set in Sanity yet
  return <div className={frame} aria-hidden />
}
