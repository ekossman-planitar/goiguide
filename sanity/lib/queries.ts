import {defineQuery} from 'next-sanity'

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage" && _id == "homePage"][0]{
  hero{
    eyebrow,
    heading,
    subheading,
    cta,
    secondaryCta,
    media{
      mediaType,
      image{
        alt,
        hotspot,
        crop,
        asset->{_id, url, metadata{lqip, dimensions{width, height}}}
      },
      "videoSrc": coalesce(videoFile.asset->url, videoUrl),
      "posterSrc": poster.asset->url
    }
  },
  logoCarousel{
    heading,
    // Skip references to logos that are unpublished, deleted or have no image
    "logos": logos[defined(@->logo.asset)]->{_id, name, "src": logo.asset->url}
  }
}`)

// Everything not yet expired. Start times are checked again in the browser
// so a scheduled message appears on time even on a cached page.
export const ANNOUNCEMENTS_QUERY = defineQuery(`*[
  _type == "announcement"
  && defined(message)
  && (!defined(endAt) || dateTime(endAt) > dateTime(now()))
] | order(coalesce(sortOrder, 9999) asc, _createdAt asc){
  _id, message, link, startAt, endAt
}`)

// Types shown in the Resource Center (eBooks have pages but no filter)
const RESOURCE_TYPES = `["blogPost", "whitePaper", "customerStory", "brochure", "video", "webinar", "newsArticle", "galleryItem"]`

const RESOURCE_CARD_FIELDS = `
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  categories,
  linkType,
  "externalUrl": coalesce(externalUrl, tourUrl),
  featuredImage{alt, hotspot, crop, asset->{_id, url, metadata{lqip}}}
`

// Every published resource, newest first
export const RESOURCES_QUERY = defineQuery(`*[_type in ${RESOURCE_TYPES} && defined(publishedAt)]
  | order(publishedAt desc){${RESOURCE_CARD_FIELDS}}`)

// Newest few resources for homepage rows
export const LATEST_RESOURCES_QUERY = defineQuery(`*[_type in ${RESOURCE_TYPES} && defined(publishedAt)]
  | order(publishedAt desc)[0...$limit]{${RESOURCE_CARD_FIELDS}}`)

// Every item of one type (e.g. eBooks), newest first
export const RESOURCES_OF_TYPE_QUERY = defineQuery(`*[_type == $type && defined(publishedAt)] | order(publishedAt desc){${RESOURCE_CARD_FIELDS}}`)

// Slugs of one type, for static generation of its detail pages
export const RESOURCE_SLUGS_QUERY = defineQuery(`*[_type == $type && defined(slug.current)].slug.current`)

const IMAGE_FIELDS = `alt, caption, href, hotspot, crop, asset->{_id, url, metadata{lqip, dimensions{width, height}}}`

// One resource of any type, with everything its detail page shows
export const RESOURCE_DETAIL_QUERY = defineQuery(`*[_type == $type && slug.current == $slug][0]{
  ${RESOURCE_CARD_FIELDS},
  _updatedAt,
  headerVideoUrl,
  customerName,
  customerLocation,
  eventDateText,
  eventCta,
  newsCta,
  body[]{
    ...,
    _type == "image" => {${IMAGE_FIELDS}},
    _type == "ctaBanner" => {..., image{asset->{_id, url}}}
  },
  author->{name, role, bio, linkedin, photo{hotspot, crop, asset->{_id, url}}},
  seo{metaTitle, metaDescription, noIndex, ogImage{hotspot, crop, asset->{_id, url}}},
  "related": *[_type == ^._type && _id != ^._id && defined(slug.current) && (!defined(^.categories) || count(categories[@ in ^.^.categories]) > 0)]
    | order(publishedAt desc)[0...3]{${RESOURCE_CARD_FIELDS}}
}`)

// Kept for the blog route
export const BLOG_SLUGS_QUERY = defineQuery(`*[_type == "blogPost" && defined(slug.current)].slug.current`)

const CATALOGUE_FIELDS = `_id, title, catalogue, "slug": slug.current, fileUrl, publishedAt,
  thumbnail{alt, hotspot, crop, asset->{_id, url, metadata{lqip}}}`

export const CATALOGUE_ITEMS_QUERY = defineQuery(`*[_type == "catalogueItem"] | order(publishedAt desc){${CATALOGUE_FIELDS}}`)

export const CATALOGUE_ITEM_QUERY = defineQuery(`*[_type == "catalogueItem" && catalogue == $catalogue && slug.current == $slug][0]{${CATALOGUE_FIELDS}}`)

// Every resource and catalogue page for sitemap.xml. Imported entries keep the
// old site's <lastmod> until someone edits them in the Studio.
export const SITEMAP_ENTRIES_QUERY = defineQuery(`*[_type in $types && defined(slug.current) && seo.noIndex != true]{
  _type,
  "slug": slug.current,
  catalogue,
  "lastModified": select(
    defined(legacy.lastModified) && dateTime(_updatedAt) < dateTime(legacy.importedAt) + 3600 => legacy.lastModified,
    _updatedAt
  ),
  "image": coalesce(featuredImage.asset->url, thumbnail.asset->url)
}`)

// One type's entries for its RSS feed (/blogs/rss etc.), newest first
export const RSS_ITEMS_QUERY = defineQuery(`*[_type == $type && defined(publishedAt) && defined(slug.current)] | order(publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}`)

// Logo bands and testimonials managed in Sanity (see lib/cmsLibrary.ts)
const LOGO_FIELDS = `name, "url": logo.asset->url, "dims": logo.asset->metadata.dimensions{width, height}`
export const CMS_LIBRARY_QUERY = defineQuery(`{
  "bands": *[_type == "logoBand"]{_id, "logos": logos[defined(@->logo.asset)]->{${LOGO_FIELDS}}},
  "testimonials": *[_type == "testimonial"]{
    _id, hidden, quote, detail, name, role, company,
    link{label, href},
    photo{alt, hotspot, crop, asset->{_id, url, metadata{dimensions{width, height}}}},
    "companyLogo": companyLogo->{${LOGO_FIELDS}}
  }
}`)

// Paid-media landing pages (any URL; see lib/landingPages)
const LP_IMG = `{alt, hotspot, crop, asset->{_id, url, metadata{dimensions{width, height}}}}`
const LP_MEDIA = `{kind, url, title, "image": image${LP_IMG}}`
export const LANDING_PAGE_QUERY = defineQuery(`*[_type == "landingPage" && path == $path && live != false][0]{
  _id, title, path, seoTitle, metaDescription, "shareImage": shareImage.asset->url, layout, headerButton,
  sections[]{
    ...,
    _type == "lpHero" => {"media": media${LP_MEDIA}},
    _type == "lpLogos" => {"logos": band->logos[defined(@->logo.asset)]->{name, "url": logo.asset->url, "dims": logo.asset->metadata.dimensions{width, height}}},
    _type == "lpFeatures" => {"items": items[]{..., "icon": icon${LP_IMG}}},
    _type == "lpSplit" => {"media": media${LP_MEDIA}},
    _type == "lpSteps" => {"steps": steps[]{..., "image": image${LP_IMG}}},
    _type == "lpTabs" => {"tabs": tabs[]{..., "media": media${LP_MEDIA}}},
    _type == "lpTestimonials" => {"quotes": items[@->hidden != true]->{
      quote, detail, name, role, company, link{label, href},
      photo{alt, hotspot, crop, asset->{_id, url}},
      "logo": companyLogo->{name, "url": logo.asset->url, "dims": logo.asset->metadata.dimensions{width, height}}
    }}
  }
}`)

export const LANDING_PATHS_QUERY = defineQuery(`*[_type == "landingPage" && defined(path) && live != false].path`)

// Site pop-ups that are on and not yet ended. Schedule and page targeting are
// checked again in the browser (pages are cached for up to a minute).
export const POPUPS_QUERY = defineQuery(`*[
  _type == "sitePopup" && enabled == true && defined(image.asset)
  && (!defined(endAt) || dateTime(endAt) > dateTime(now()))
] | order(coalesce(priority, 9999) asc, _createdAt desc){
  _id, name, layout, imageLink, imageSide, title, description,
  image{alt, hotspot, crop, asset->{_id, url, metadata{dimensions{width, height}}}},
  countdown{endsAt, label, hidePopupWhenDone},
  button{label, href, openBooking, newTab, background, textColour},
  backgroundColour, textColour, highlightColour,
  startAt, endAt, showOn, paths, excludePaths, includeLandingPages,
  trigger, delaySeconds, scrollPercent, frequency, frequencyDays
}`)

// Events (Studio → Events). The list hides ended events; the browser re-checks,
// since pages are cached for up to a minute.
const EVENT_CARD_FIELDS = `_id, title, "slug": slug.current, eventType, categories, attendance, timeZone,
  startAt, endAt, allDay, venue, city, region, country, booth, price, shortDescription,
  featuredImage{alt, hotspot, crop, asset->{_id, url, metadata{lqip}}}`

export const UPCOMING_EVENTS_QUERY = defineQuery(`*[_type == "event" && defined(slug.current) && defined(startAt)
  && dateTime(coalesce(endAt, startAt)) > dateTime(now())] | order(startAt asc){${EVENT_CARD_FIELDS}}`)

export const EVENT_QUERY = defineQuery(`*[_type == "event" && slug.current == $slug][0]{
  ${EVENT_CARD_FIELDS},
  _updatedAt, address, eventUrl, eventUrlLabel, registrationUrl, hubspotFormId, formHeading,
  speakers[]{name, role, photo{hotspot, crop, asset->{_id, url}}},
  body[]{
    ...,
    _type == "image" => {${IMAGE_FIELDS}},
    _type == "ctaBanner" => {..., image{asset->{_id, url}}}
  },
  seo{metaTitle, metaDescription, noIndex, ogImage{hotspot, crop, asset->{_id, url}}},
  "more": *[_type == "event" && _id != ^._id && defined(slug.current) && dateTime(coalesce(endAt, startAt)) > dateTime(now())]
    | order(startAt asc)[0...3]{${EVENT_CARD_FIELDS}}
}`)

export const EVENT_SLUGS_QUERY = defineQuery(`*[_type == "event" && defined(slug.current)].slug.current`)

export const SITEMAP_EVENTS_QUERY = defineQuery(`*[_type == "event" && defined(slug.current) && seo.noIndex != true
  && dateTime(coalesce(endAt, startAt)) > dateTime(now())]{"slug": slug.current, "lastModified": _updatedAt}`)
