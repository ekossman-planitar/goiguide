/** Server-side only: loads the stored email HTML for the "Sample report" section */
import type {ReportSampleId} from './reportSamples'

const loaders: Record<ReportSampleId, () => Promise<{html: string}>> = {
  reportCommercial: () => import('./reportSamples/reportCommercial'),
  reportIrc: () => import('./reportSamples/reportIrc'),
  reportResidential: () => import('./reportSamples/reportResidential'),
  analyticsResidential: () => import('./reportSamples/analyticsResidential'),
}

/** HTML of a stored sample email, or null for an unknown id */
export async function reportSampleHtml(id: string) {
  const load = loaders[id as ReportSampleId]
  return load ? (await load()).html : null
}
