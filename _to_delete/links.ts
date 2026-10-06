/** True for links that leave goiguide.com (or use a non-http scheme). */
export function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) && !/^https?:\/\/(www\.)?goiguide\.com(\/|$)/.test(href)
}
