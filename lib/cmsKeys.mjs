/**
 * Stable Sanity document IDs for content that starts in code and is then
 * managed in Sanity (logo bands, testimonials). Shared by the site and by
 * scripts/seed-cms-library.mjs, so both always agree on the ID.
 *
 * Plain JS so the Sanity CLI script can import it.
 */

/** @param {string} s */
export const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replaceAll(/[̀-ͯ]/g, '')
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '')

/** Short, stable hash of a string (djb2, base 36). @param {string} s */
const hash = (s) => {
  let h = 5381
  for (const ch of s) h = ((h << 5) + h + ch.codePointAt(0)) >>> 0
  return h.toString(36)
}

/**
 * ID of the testimonial document seeded from a quote in code. Based on the
 * person and the original quote text, so the same quote on several pages is
 * one document. Editing the quote in Sanity doesn't change it.
 * @param {{quote: string, name?: string, company?: string}} q
 */
export const testimonialId = (q) =>
  `testimonial-${slugify(q.name || q.company || 'quote').slice(0, 40)}-${hash(q.quote.replaceAll(/\s+/g, ' ').trim())}`

/** @param {string} band */
export const logoBandId = (band) => `logoBand-${slugify(band)}`
