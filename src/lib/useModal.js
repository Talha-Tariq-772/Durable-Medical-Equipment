import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Shared behaviour for dialogs and drawers: Esc to close, focus trapped inside,
 * page scroll locked, and focus handed back to the trigger when it closes.
 */
export function useModal(open, onClose) {
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const gutter = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = gutter ? `${gutter}px` : ''

    const node = ref.current
    node?.querySelector('[data-autofocus]')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !node) return
      const items = [...node.querySelectorAll(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      previous?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  return ref
}
