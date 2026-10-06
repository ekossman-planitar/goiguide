import type {ComponentPropsWithoutRef} from 'react'

type SmartLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {href: string}

/**
 * The one link primitive for the site. Always a native <a> (not next/link) so
 * every click is a full page load, which GTM triggers on goiguide.com rely on.
 */
export function SmartLink({href, children, ...props}: SmartLinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
