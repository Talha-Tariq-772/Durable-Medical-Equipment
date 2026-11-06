import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Trash2, X } from 'lucide-react'
import { equipment } from '../data/equipment.js'
import { useModal } from '../lib/useModal.js'
import EquipmentArt from './EquipmentArt.jsx'
import { Button } from './ui.jsx'

const KEY = 'daud-dme-request-list'
const RequestContext = createContext(null)

function loadIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(parsed) ? parsed.filter((id) => equipment.some((e) => e.id === id)) : []
  } catch {
    return []
  }
}

export function RequestListProvider({ children }) {
  const [ids, setIds] = useState(loadIds)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      // Private mode or blocked storage: the list still works for this visit.
    }
  }, [ids])

  const toggle = useCallback((id) => {
    setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
  }, [])
  const clear = useCallback(() => setIds([]), [])
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({
      ids,
      items: ids.map((id) => equipment.find((e) => e.id === id)),
      count: ids.length,
      has: (id) => ids.includes(id),
      toggle,
      clear,
      isOpen,
      open,
      close,
    }),
    [ids, isOpen, toggle, clear, open, close],
  )

  return <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
}

export function useRequestList() {
  return useContext(RequestContext)
}

export function RequestDrawer() {
  const { items, isOpen, close, toggle, clear } = useRequestList()
  const ref = useModal(isOpen, close)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            className="absolute inset-0 bg-pine-deep/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 id="request-title" className="text-3xl">Your request list</h2>
              <button
                type="button"
                data-autofocus
                onClick={close}
                aria-label="Close request list"
                className="grid size-12 place-items-center rounded-full hover:bg-paper-2"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <EquipmentArt id="rollator" eager className="w-40 text-pine-ink" />
                <p className="text-lg text-ink-soft">
                  Nothing here yet. Add the equipment you are interested in and we can talk it through together.
                </p>
                <Button to="/equipment" onClick={close}>Browse equipment</Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        exit={{ opacity: 0, x: 30 }}
                        className="flex items-center gap-4 py-4"
                      >
                        <div className="drafting w-20 shrink-0 rounded-lg bg-card p-1.5 text-pine-ink">
                          <EquipmentArt id={item.id} eager />
                        </div>
                        <p className="min-w-0 flex-1 font-medium leading-snug">{item.name}</p>
                        <button
                          type="button"
                          onClick={() => toggle(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="grid size-12 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-paper-2 hover:text-ember"
                        >
                          <Trash2 aria-hidden="true" className="size-5" />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="space-y-3 border-t border-line p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <p className="text-sm text-ink-soft">
                    This is not an order. It lets us know what to discuss with you.
                  </p>
                  <Button to="/contact" onClick={close} className="w-full">Continue to request</Button>
                  <button type="button" onClick={clear} className="min-h-12 w-full rounded-full font-medium text-ink-soft underline-offset-4 hover:underline">
                    Clear list
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
