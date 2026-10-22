/** Server-side only: loads an agreement's legal text for the landing page "Agreement" section */
import type {AgreementTextId} from './agreementTexts'

const loaders: Record<AgreementTextId, () => Promise<{html: string}>> = {
  cameraAgreement: () => import('../content/legal/cameraAgreement'),
  cameraAgreementUsed: () => import('../content/legal/cameraAgreementUsed'),
  cameraAgreementItalian: () => import('../content/legal/cameraAgreementItalian'),
}

export async function agreementHtml(id: string) {
  const load = loaders[id as AgreementTextId]
  return load ? (await load()).html : null
}
