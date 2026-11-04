import { ClipboardList, Phone } from 'lucide-react'
import { site } from '../data/site.js'
import { useRequestList } from './RequestList.jsx'
import { CountBadge } from './Header.jsx'

/** Always-reachable call and list actions on phones and tablets. */
export default function MobileBar() {
  const { count, open } = useRequestList()
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-paper/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <a href={site.phone.href} className="flex min-h-13 items-center justify-center gap-2 rounded-full bg-ember font-semibold text-white">
        <Phone aria-hidden="true" className="size-5" />
        Call us
      </a>
      <button
        type="button"
        onClick={open}
        aria-label={`Open request list, ${count} ${count === 1 ? 'item' : 'items'}`}
        className="flex min-h-13 items-center justify-center gap-2 rounded-full border-[1.5px] border-ink/70 font-semibold"
      >
        <ClipboardList aria-hidden="true" className="size-5" />
        My list
        <CountBadge count={count} />
      </button>
    </div>
  )
}
