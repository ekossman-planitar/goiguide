import type {QueryParams} from 'next-sanity'
import {client} from './client'

/** Seconds a fetched Sanity result is reused before Next.js refetches it. */
export const SANITY_REVALIDATE = 60

/**
 * Fetch from Sanity on the server. If Sanity can't be reached, log the error
 * and return `fallback` so the page still renders.
 */
export async function fetchSanity<T>(query: string, fallback: T, params: QueryParams = {}): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params, {next: {revalidate: SANITY_REVALIDATE}})
    return result ?? fallback
  } catch (error) {
    console.error('[sanity] fetch failed, using fallback content', error)
    return fallback
  }
}
