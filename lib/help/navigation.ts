import {MARKETING_CATALOGUE_SUPPORT_PATH} from '@/lib/content/marketingCatalogue'
import {HELP_BASE_PATH, ZENDESK_PUBLIC_ORIGIN} from './zendesk'

/**
 * Help Center microsite (/help) navigation and fixed copy.
 * Ported from the help.youriguide.com theme (checked 2026-10-20). Categories,
 * sections and articles come from Zendesk; the items here were hard-coded in
 * the Zendesk theme, so they live in code here too.
 */

const zendesk = (path: string) => `${ZENDESK_PUBLIC_ORIGIN}/hc/en-us${path}`

/** Stay on Zendesk: tickets and sign-in */
export const zendeskLinks = {
  submitRequest: zendesk('/requests/new'),
  myRequests: zendesk('/requests'),
  signIn: zendesk(`/signin?return_to=${encodeURIComponent(zendesk('/requests'))}`),
}

/** Plain header links after the Topics menu */
export const helpHeaderLinks: {label: string; href: string; external?: boolean}[] = [
  {label: 'Marketing Catalogue', href: MARKETING_CATALOGUE_SUPPORT_PATH},
  {label: 'iGuide Portal', href: 'https://manage.youriguide.com/iguides/', external: true},
  {label: 'iGuide Forum', href: 'https://forum.goiguide.com/', external: true},
]

/** "Top Articles" under the homepage search (hard-coded in the Zendesk theme) */
export const topArticles = [
  {label: 'Scanning Best Practices', href: `${HELP_BASE_PATH}/articles/27340688748818-Scanning-Best-Practices`},
  {label: 'Your First Scan', href: `${HELP_BASE_PATH}/articles/27340515503506-Your-First-Scan`},
  {label: 'Packages and Add Ons', href: `${HELP_BASE_PATH}/sections/31597793251090-Packages-and-Add-ons`},
]

export const supportContact = {
  phone: {label: '1-855-505-1723', href: 'tel:1-855-505-1723'},
  hours: 'Monday to Friday 8am to 6:30pm, Saturday 8:30am to 5pm ET',
  holidays: {label: 'holiday schedule', href: '/office-holidays'},
}

const a = (id: string) => `${HELP_BASE_PATH}/articles/${id}`

/**
 * Footer link columns, as on help.youriguide.com (labels and targets copied
 * as-is, including two links that point at a different article than their label).
 */
export const helpFooterColumns: {heading: string; links: {label: string; href: string; external?: boolean}[]}[] = [
  {
    heading: 'Getting Started',
    links: [
      {label: 'How to Set Up Your iGuide Account', href: a('27339218437010-How-to-Set-Up-Your-iGUIDE-Account')},
      {label: 'Your First Scan', href: a('27340515503506-Your-First-Scan')},
      {label: 'How to Edit Your iGuide Default Settings', href: a('27339617569042-How-to-Edit-Your-iGUIDE-Default-Settings')},
      {label: 'How to Upload and Publish an iGuide', href: a('27342235233042-How-to-Upload-and-Publish-an-iGUIDE')},
      {label: 'Setting Up Your ION Directory Profile', href: a('27360994969106-Setting-Up-Your-ION-Directory')},
    ],
  },
  {
    heading: 'Product Documentation',
    links: [
      {label: 'What is the R1 Camera?', href: a('27384549291410-What-is-the-R1-Camera')},
      {label: 'What is the PLANIX Pro Camera?', href: a('27490551007250-What-is-the-PLANIX-Pro-Camera')},
      {label: 'How to Download the PLANIX App', href: a('27515144667026-How-to-Download-the-PLANIX-App')},
      {label: 'How to Use Survey', href: a('27516503564306-How-to-Use-Survey')},
      {label: 'What is the iGuide Portal?', href: a('27594026625682-What-is-the-iGUIDE-Portal')},
    ],
  },
  {
    heading: 'Training & Support',
    links: [
      {label: 'Advanced iGuide Capture Techniques', href: a('27613795832594-Advanced-iGUIDE-Capture-Techniques')},
      // Live links this to "What is the R1 Camera?"
      {label: 'How to Use the R1 Camera', href: a('27384549291410-What-is-the-R1-Camera')},
      {label: 'R1 Camera Settings', href: a('27469584533906-R1-Camera-Settings')},
      {label: 'What is Included in a Published iGuide?', href: a('27594559739666-What-is-Included-in-a-Published-iGUIDE')},
      {label: 'Understanding Key iGuide 3D Tour Tools', href: a('27619557011730-Understanding-Key-iGUIDE-3D-Tour-Tools')},
    ],
  },
  {
    heading: 'Account & Billing',
    links: [
      {label: 'iGuide Portal', href: 'https://manage.youriguide.com/iguides/', external: true},
      {label: 'Account & Settings Information on the iGuide Portal', href: a('27749290579730-Account-Settings-Information-on-the-iGUIDE-Portal')},
      {label: 'Understanding Billing Information in Your iGuide Dashboard', href: a('27615218313234-Understanding-Billing-Information-in-Your-iGUIDE-Dashboard')},
      {label: 'iGuide Pricing Guide for Canada', href: a('31597338688658-Canada')},
      {label: 'iGuide Pricing for Australia', href: a('31538722129682-Australia')},
      {label: 'iGuide Pricing Outside of Canada for Imperial Measurements (USD)', href: a('31597372907154-US-and-Rest-of-World')},
    ],
  },
  {
    heading: 'Marketing & Resources',
    links: [
      {label: 'Using iGuide for Real Estate', href: a('27643835271186-Using-iGUIDE-for-Real-Estate')},
      {label: 'Using iGuide for Architecture & Remodel', href: a('27644044937234-Using-iGUIDE-for-Architecture-Remodel')},
      {label: 'Insurance & Restoration with iGuide', href: a('27644330172946-Insurance-Restoration-with-iGUIDE')},
      {label: 'Facility Management with iGuide', href: a('27644827316626-Facility-Management-with-iGUIDE')},
      {label: 'How to Add Branding with the iGuide Portal', href: a('27696902963858-How-to-Add-Branding-with-the-iGUIDE-Portal')},
    ],
  },
  {
    heading: 'Policies & Procedures',
    links: [
      {label: 'Understanding iGuide Measurements and Drafting Standards', href: a('27645625048210-Understanding-iGUIDE-Measurements-and-Drafting-Standards')},
      // Live links this to the billing article
      {label: 'Doors and Windows Summary CSV (Beta) & Enhanced Room Data CSV', href: a('27615218313234-Understanding-Billing-Information-in-Your-iGUIDE-Dashboard')},
      {label: 'Packages and Add-ons', href: `${HELP_BASE_PATH}/sections/31597793251090-Packages-and-Add-ons`},
      {label: 'iGuide Delivery Time Estimates', href: a('27362487646098-iGUIDE-Delivery-Time-Estimates')},
      {label: 'Integrating and Embedding Your iGuide', href: a('27618873292562-Integrating-and-Embedding-Your-iGUIDE')},
    ],
  },
]
