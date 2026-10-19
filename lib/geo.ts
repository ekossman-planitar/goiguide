/**
 * Australian visitors to the homepage go to the Australia homepage (/au).
 * The country comes from the hosting platform (Vercel's x-vercel-ip-country
 * header, worked out from the visitor's IP). The IP itself is never read or stored.
 */
export const REGION_COOKIE = 'site_region'
/** ?region=global or ?region=au sets the visitor's choice (e.g. the "Global site" link in the AU menu) */
export const REGION_PARAM = 'region'
/** ?geo-preview=AU pretends the visitor is in that country, for testing */
export const GEO_PREVIEW_PARAM = 'geo-preview'
export const GLOBAL_SITE_HREF = `/?${REGION_PARAM}=global`

/** Search engines and link-preview bots always get the page they asked for */
export const isBot = (ua: string | null) =>
  !!ua && /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse|pagespeed|headless/i.test(ua)
