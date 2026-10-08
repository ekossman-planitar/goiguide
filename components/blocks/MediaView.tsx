import {FallbackImage} from '@/components/ui/FallbackImage'
import {cn} from '@/lib/cn'
import type {Media} from './types'

/** Renders an image, looping muted video or iframe embed. */
export function MediaView({media, className, sizes = '(min-width: 1024px) 50vw, 100vw'}: {media: Media; className?: string; sizes?: string}) {
  if (media.type === 'video') {
    return (
      <video
        className={cn('w-full rounded-2xl', className)}
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.label}
      />
    )
  }
  if (media.type === 'embed') {
    return (
      <div className={cn('relative w-full overflow-hidden rounded-2xl bg-surface', media.aspect ?? 'aspect-video', className)}>
        <iframe src={media.src} title={media.title} className="absolute inset-0 h-full w-full" allowFullScreen loading="lazy" />
      </div>
    )
  }
  const {image} = media
  return (
    <FallbackImage
      src={image.src}
      alt={image.alt}
      width={image.width ?? 1200}
      height={image.height ?? 900}
      sizes={sizes}
      priority={media.priority}
      // Animated GIFs must skip optimisation or they stop animating
      unoptimized={image.src.endsWith('.gif')}
      className={cn('h-auto w-full', className)}
      fallback={<div className={cn('aspect-[4/3] w-full rounded-2xl bg-surface', className)} />}
    />
  )
}
