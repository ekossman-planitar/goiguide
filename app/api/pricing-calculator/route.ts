import {calcPackages, calculator} from '@/lib/content/pricing'

/**
 * Server-side port of the Silverstripe pricing calculator (ElementPricingCalculatorController
 * + CalculatorAPI). Calls the iGUIDE Portal's public cost endpoint, as the live site's
 * server does today. No credentials are involved.
 */
const COST_API = 'https://manage.youriguide.com/apiro/v1/calculator/cost'

type Body = {currency?: string; packageId?: number; addons?: string[]; unit?: string; size?: number}

export async function POST(request: Request) {
  let body: Body
  try {
    body = await request.json()
  } catch {
    return Response.json({status: false}, {status: 400})
  }

  const pkg = calcPackages[Number(body.packageId)]
  const currency = calculator.currencies.find((c) => c === body.currency)
  const unit = body.unit === 'm' ? 'm' : 'ft'
  const size = Math.floor(Number(body.size))
  if (!pkg || !currency || !Number.isFinite(size) || size <= 0) return Response.json({status: false}, {status: 400})

  // Only add-ons offered for this package
  const addons = (body.addons ?? []).filter((a) => pkg.addons.includes(a))

  // Convert m² to ft² exactly like CalculatorAPI::convertMetersToFeet
  const sizeFt = unit === 'm' ? Math.trunc(size * 10.76391041671) : size

  // Large properties get a custom quote (except Radix, where size is a scan count)
  if (pkg.iguideType !== 'radix' && sizeFt >= calculator.customQuoteMaxSizeFt) {
    return Response.json({status: true, total: '$0.00', currency, enableCustomQuote: true})
  }

  const taskTypes =
    pkg.iguideType === 'instant-sketch'
      ? ['instant-sketch-init']
      : pkg.iguideType === 'radix'
        ? ['radix-init']
        : [pkg.iguideType === 'premium' ? 'draft-premium' : 'draft', ...addons]

  const item: Record<string, unknown> = {modelName: currency, iguideType: pkg.iguideType, taskTypes}
  if (pkg.iguideType === 'radix') item.panos = sizeFt
  else item.size = sizeFt

  try {
    const res = await fetch(COST_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify([item]),
      signal: AbortSignal.timeout(17_000),
      cache: 'no-store',
    })
    if (!res.ok) return Response.json({status: false}, {status: 502})
    const data = await res.json()
    const result = Array.isArray(data) && data.length === 1 ? data[0] : data
    const dollars = (Number(result?.total) / 1000).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    return Response.json({status: true, total: `$${dollars}`, currency: result?.currency ?? currency, enableCustomQuote: false})
  } catch {
    return Response.json({status: false}, {status: 502})
  }
}
