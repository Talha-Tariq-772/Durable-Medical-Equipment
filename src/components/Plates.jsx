import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, FileSignature, Plus, X } from 'lucide-react'
import { categories, equipment } from '../data/equipment.js'
import { useModal } from '../lib/useModal.js'
import EquipmentArt from './EquipmentArt.jsx'
import { useRequestList } from './RequestList.jsx'
import { Button } from './ui.jsx'

const plateNo = (item) => String(equipment.indexOf(item) + 1).padStart(2, '0')
const categoryLabel = (item) => categories.find((c) => c.id === item.category)?.label

function AddButton({ item, compact = false }) {
  const { has, toggle } = useRequestList()
  const added = has(item.id)
  const label = added ? `Remove ${item.name} from list` : `Add ${item.name} to list`

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => toggle(item.id)}
        aria-pressed={added}
        aria-label={label}
        className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors ${
          added ? 'border-pine bg-pine text-cream' : 'border-ink/70 hover:bg-ink hover:text-paper'
        }`}
      >
        {added ? <Check aria-hidden="true" className="size-5" /> : <Plus aria-hidden="true" className="size-5" />}
      </button>
    )
  }
  return (
    <Button variant={added ? 'outline' : 'primary'} icon={false} onClick={() => toggle(item.id)} aria-pressed={added} className="w-full sm:w-auto">
      {added ? <Check aria-hidden="true" className="size-5" /> : <Plus aria-hidden="true" className="size-5" />}
      {added ? 'On your list' : 'Add to my list'}
    </Button>
  )
}

function Plate({ item, onOpen }) {
  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-paper transition-colors duration-300 hover:bg-card"
    >
      <div className="flex items-baseline justify-between px-5 pt-5 text-sm md:px-6 md:pt-6">
        <span className="font-display italic text-ember">Plate {plateNo(item)}</span>
        <span className="text-ink-soft">{categoryLabel(item)}</span>
      </div>
      <div className="drafting mx-5 mt-4 rounded-sm px-[8%] py-4 text-pine-ink md:mx-6">
        <EquipmentArt id={item.id} className="mx-auto w-full max-w-xs transition-transform duration-500 ease-soft group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 items-end justify-between gap-4 p-5 md:p-6">
        <div>
          <h3 className="text-[1.75rem]">
            {/* The stretched link makes the whole plate clickable while staying one tab stop. */}
            <button type="button" onClick={() => onOpen(item)} className="text-left after:absolute after:inset-0 after:content-['']">
              {item.name}
            </button>
          </h3>
          <p className="mt-2 text-ink-soft">{item.summary}</p>
        </div>
        <AddButton item={item} compact />
      </div>
    </motion.article>
  )
}

function PlateDialog({ item, onClose }) {
  const ref = useModal(Boolean(item), onClose)
  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
          <motion.div
            className="absolute inset-0 bg-pine-deep/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="plate-title"
            className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-paper md:grid-cols-[5fr_6fr] md:rounded-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-3 top-3 z-10 grid size-12 place-items-center rounded-full bg-card shadow-sm hover:bg-paper-2"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
            <div className="drafting flex items-center justify-center bg-card p-8 text-pine-ink">
              <EquipmentArt id={item.id} eager className="w-full max-w-[17rem] md:max-w-sm" />
            </div>
            <div className="p-6 md:p-9">
              <p className="font-display italic text-ember">Plate {plateNo(item)} · {categoryLabel(item)}</p>
              <h2 id="plate-title" className="mt-2 pr-10 text-4xl md:text-5xl">{item.name}</h2>
              <p className="mt-4 text-lg">{item.summary}</p>
              <h3 className="eyebrow mt-6 font-sans! tracking-[0.14em]!">Who it helps</h3>
              <p className="mt-2 text-ink-soft">{item.forWhom}</p>
              <h3 className="eyebrow mt-6 font-sans! tracking-[0.14em]!">Typical features</h3>
              <ul className="mt-2 space-y-1.5">
                {item.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-teal" />
                    {f}
                  </li>
                ))}
              </ul>
              {item.rx && (
                <p className="mt-6 flex gap-3 rounded-xl bg-mist/60 p-4 text-[0.95rem] leading-snug">
                  <FileSignature aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-pine-ink" />
                  A prescription or provider’s order is usually needed. We can help you find out what is required.
                </p>
              )}
              <div className="mt-6">
                <AddButton item={item} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/** A ruled ledger of plates. Hairlines come from the 1px gap showing the container behind. */
export default function PlateGrid({ items }) {
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])
  return (
    <>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-rule sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => (
            <Plate key={item.id} item={item} onOpen={setActive} />
          ))}
        </AnimatePresence>
      </div>
      <PlateDialog item={active} onClose={close} />
    </>
  )
}
