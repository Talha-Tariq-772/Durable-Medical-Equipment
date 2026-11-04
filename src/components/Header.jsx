import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ClipboardList, Menu, Phone, X } from 'lucide-react'
import { nav, site } from '../data/site.js'
import { useModal } from '../lib/useModal.js'
import { useRequestList } from './RequestList.jsx'
import { Logo } from './ui.jsx'

export function CountBadge({ count, className = '' }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          className={`grid size-6 place-items-center rounded-full bg-ember text-xs font-bold text-white ${className}`}
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, open } = useRequestList()
  const { pathname } = useLocation()
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const menuRef = useModal(menuOpen, closeMenu)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(closeMenu, [pathname, closeMenu])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : ''
        }`}
      >
        <div className={`wrap flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4 md:py-5'}`}>
          <Link to="/" aria-label={`${site.name} home`} className="rounded-lg">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 font-medium transition-colors ${isActive ? 'text-paper' : 'hover:text-teal'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-pine"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.phone.href} className="hidden items-center gap-2 rounded-full px-3 py-2 font-semibold hover:text-teal xl:inline-flex">
              <Phone aria-hidden="true" className="size-4" />
              {site.phone.display}
            </a>
            <button
              type="button"
              onClick={open}
              aria-label={`Open request list, ${count} ${count === 1 ? 'item' : 'items'}`}
              className="hidden min-h-12 items-center gap-2 rounded-full border-[1.5px] border-ink/70 px-4 font-semibold transition-colors hover:bg-ink hover:text-paper lg:inline-flex"
            >
              <ClipboardList aria-hidden="true" className="size-5" />
              My list
              <CountBadge count={count} />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-12 place-items-center rounded-full bg-pine text-paper lg:hidden"
            >
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-pine-deep text-paper lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="wrap flex items-center justify-between py-4">
              <Logo light />
              <button
                type="button"
                data-autofocus
                onClick={closeMenu}
                aria-label="Close menu"
                className="grid size-12 place-items-center rounded-full bg-paper text-ink"
              >
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <nav aria-label="Mobile" className="wrap flex flex-1 flex-col justify-center gap-1 py-6">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-1.5 font-display text-[clamp(2.25rem,10vw,3.5rem)] leading-tight ${isActive ? 'display-italic text-glow' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="wrap border-t border-paper/20 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <a href={site.phone.href} className="inline-flex min-h-12 items-center gap-3 text-lg font-semibold">
                <Phone aria-hidden="true" className="size-5" />
                {site.phone.display}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
