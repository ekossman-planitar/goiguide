import {LegalPage} from '@/components/pages/LegalPage'
import {heading, meta, serialNumbers, supportTicketUrl} from '@/lib/content/pages/blacklistedCameras'
import {pageMetadata} from '@/lib/pageMetadata'

export const metadata = pageMetadata(meta)

export default function BlacklistedCamerasPage() {
  return (
    <LegalPage title={heading}>
      <p>
        The following camera serial numbers are unserviceable (we will not accept data processed by these cameras nor will we repair, replace or maintain any
        part of the camera).
      </p>
      <p>
        Please contact our Product Support Team via a{' '}
        <a href={supportTicketUrl} target="_blank" rel="noopener noreferrer">
          Support Ticket
        </a>{' '}
        if you have any knowledge or questions about the cameras detailed below.
      </p>
      <ul className="mt-8! grid list-none! space-y-0! pl-0! grid-cols-2 gap-x-6 gap-y-2 font-mono text-base sm:grid-cols-3 md:grid-cols-4">
        {serialNumbers.map((serial) => (
          <li key={serial}>{serial}</li>
        ))}
      </ul>
    </LegalPage>
  )
}
