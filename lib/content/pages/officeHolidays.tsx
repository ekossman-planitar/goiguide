/** /office-holidays — copy, links and asset paths from the live page (checked 2026-10-14). */
import type {Block} from '@/components/blocks/Blocks'

export const meta = {
  title: 'Office Holidays | iGuide',
  description:
    'iGuide observes the following holidays. Please note that our office closures may impact service delivery times. Thank you for your continued support.',
  path: '/office-holidays',
}

const holidays: [string, string, string, string][] = [
  ["New Year's Day", 'January 1, 2026', 'Closed', 'Closed'],
  ['Family Day', 'February 16, 2026', 'Closed', 'Closed'],
  ['Good Friday', 'April 3, 2026', 'Closed', 'Closed'],
  ['Victoria Day', 'May 18, 2026', 'Closed', 'Closed'],
  ['Canada Day', 'July 1, 2026', 'Closed', 'Closed'],
  ['Civic/Provincial Day', 'August 3, 2026', 'Closed', 'Closed'],
  ['Labour Day', 'September 7, 2026', 'Closed', 'Closed'],
  ['Thanksgiving Day', 'October 12, 2026', 'Closed', 'Closed'],
  ['Christmas Day', 'Friday, Dec 25, 2026', 'Closed', 'Closed'],
  ['Boxing Day', 'Saturday, Dec 26, 2026', 'Closed', 'Closed'],
]

function HolidayTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
      <table className="w-full min-w-[560px] border-collapse text-left text-base">
        <thead>
          <tr className="bg-brand text-lg font-semibold text-white">
            <th scope="col" className="px-6 py-4">
              Holiday
            </th>
            <th scope="col" className="px-6 py-4">
              Date
            </th>
            <th scope="col" className="w-1/5 px-6 py-4 text-center">
              Office and Support
            </th>
            <th scope="col" className="w-1/5 px-6 py-4 text-center">
              Drafting
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="bg-snowgum-400 px-6 py-4 text-sm text-white">
              *Limited iGuide drafts, ESX files and update requests processed. No DWG/RVT processing. No CAD Package processing. No Enterprise/Secure
              Portal processing. Processing will resume the next open day.
            </td>
          </tr>
          {holidays.map(([name, date, office, drafting]) => (
            <tr key={name} className="border-t border-line even:bg-surface">
              <th scope="row" className="px-6 py-3 font-normal">
                {name}
              </th>
              <td className="px-6 py-3">{date}</td>
              <td className="px-6 py-3 text-center">{office}</td>
              <td className="px-6 py-3 text-center">{drafting}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const blocks: Block[] = [
  {
    type: 'custom',
    children: (
      <div className="mx-auto max-w-5xl">
        <h1 className="text-balance text-[40px] font-bold leading-[normal] text-ink md:text-[56px]">2026 Holiday Hours and Service Delivery Updates</h1>
        <div className="mt-6 space-y-4 text-lg leading-7 text-body">
          <p>
            As we observe the following holidays in 2026, please note that our office closures may impact service delivery times. We encourage you to
            plan accordingly and reach out in advance for any time-sensitive requests.
          </p>
          <p>Thank you for your understanding, and we appreciate your continued support!</p>
        </div>
        <div className="mt-10">
          <HolidayTable />
        </div>
      </div>
    ),
  },
]
