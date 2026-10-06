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

const RESOURCE_TYPES = `["blogPost", "whitePaper", "customerStory", "brochure", "video", "webinar", "newsArticle", "galleryItem"]`

const RESOURCE_CARD_FIELDS = `
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  externalUrl,
  tourUrl,
  featuredImage{alt, hotspot, crop, asset->{_id, url, metadata{lqip}}}
`

// Every published resource, newest first
export const RESOURCES_QUERY = defineQuery(`*[_type in ${RESOURCE_TYPES} && defined(publishedAt)]
  | order(publishedAt desc){${RESOURCE_CARD_FIELDS}}`)

export const BLOG_SLUGS_QUERY = defineQuery(`*[_type == "blogPost" && defined(slug.current)].slug.current`)

export const BLOG_POST_QUERY = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  ${RESOURCE_CARD_FIELDS},
  _updatedAt,
  body[]{..., _type == "image" => {..., asset->{_id, url, metadata{lqip, dimensions{width, height}}}}},
  author->{name, role, bio, linkedin, photo{hotspot, crop, asset->{_id, url}}},
  seo{metaTitle, metaDescription, noIndex, ogImage{hotspot, crop, asset->{_id, url}}}
}`)
