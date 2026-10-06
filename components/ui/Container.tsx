import type {ComponentPropsWithoutRef, ElementType} from 'react'
import {cn} from '@/lib/cn'

const widths = {
  default: 'max-w-[1320px]',
  wide: 'max-w-5xl',
  medium: 'max-w-4xl',
  narrow: 'max-w-3xl',
}

type ContainerProps<T extends ElementType> = {as?: T; size?: keyof typeof widths} & ComponentPropsWithoutRef<T>

/** Centred page-width wrapper with responsive side padding. */
export function Container<T extends ElementType = 'div'>({as, size = 'default', className, ...props}: ContainerProps<T>) {
  const Tag = as ?? 'div'
  return <Tag className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', widths[size], className)} {...props} />
}
