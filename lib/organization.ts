/**
 * Organization structured data (schema.org). Addresses confirmed by Evan,
 * 2026-10-14: Canadian HQ in Waterloo (also in the site footer), and the
 * Australian team at REA Group's Melbourne head office. iGuide is owned by REA Group.
 */
const SITE = 'https://goiguide.com'
const LOGO = `${SITE}/_resources/themes/main/public/images/favicons/android-chrome-192x192.png`

const canada = {
  '@type': 'PostalAddress',
  streetAddress: '560 Parkside Drive, Unit 401',
  addressLocality: 'Waterloo',
  addressRegion: 'ON',
  postalCode: 'N2L 5Z4',
  addressCountry: 'CA',
}

const australia = {
  '@type': 'PostalAddress',
  streetAddress: '511 Church Street',
  addressLocality: 'Richmond',
  addressRegion: 'VIC',
  postalCode: '3121',
  addressCountry: 'AU',
}

const reaGroup = {'@type': 'Organization', name: 'REA Group', url: 'https://www.rea-group.com'}

const australianOffice = {
  '@type': 'Organization',
  '@id': `${SITE}/au#organization`,
  name: 'iGuide Australia',
  url: `${SITE}/au`,
  address: australia,
}

/** Global organization: on the homepage (as on live) */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'iGuide',
  legalName: 'Planitar Inc.',
  url: SITE,
  logo: LOGO,
  image: LOGO,
  description: 'Precise floor plans & 3D virtual tours made easy',
  telephone: '1-844-568-1723',
  email: 'sales@planitar.com',
  address: canada,
  parentOrganization: reaGroup,
  subOrganization: australianOffice,
}

/** Australian organization: on /au */
export const australiaOrganizationJsonLd = {
  '@context': 'https://schema.org',
  ...australianOffice,
  logo: LOGO,
  description: 'iGuide 3D tours, floor plans and Site Plans for realestate.com.au listings',
  parentOrganization: {'@id': `${SITE}/#organization`, '@type': 'Organization', name: 'iGuide', url: SITE},
}

export const jsonLdScript = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')
