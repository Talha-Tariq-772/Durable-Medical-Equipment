import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ClipboardList, Mail, MapPin, Menu, Moon, Phone, Sun, X } from 'lucide-react'
import { emailHref, nav, site } from '../data/site.js'
import { useModal } from '../lib/useModal.js'
import { useTheme } from '../lib/theme.js'
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
          className={`grid size-6 place-items-center rounded-full bg-ember text-xs font-bold text-on-ember ${className}`}
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export function ThemeToggle({ className = '', onDark = false }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className={`relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border-[1.5px] transition-colors ${
        onDark ? 'border-cream/40 text-cream hover:bg-cream/10' : 'border-ink/25 hover:border-ink/70 hover:bg-paper-2'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, rotate: -40, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 40, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {dark ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

/** Slim contact strip above the header on tablet and desktop; folds away on scroll. */
function TopBar({ hidden }) {
  return (
    <div
      className={`hidden overflow-hidden bg-pine-deep text-sm text-cream transition-[max-height,opacity] duration-300 md:block ${
        hidden ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
      }`}
      aria-hidden={hidden || undefined}
    >
      <div className="wrap flex h-10 items-center justify-between gap-6">
        <p className="flex items-center gap-2 text-sage">
          <MapPin aria-hidden="true" className="size-4 text-glow" />
          {site.serviceArea}
        </p>
        <div className="flex items-center gap-6">
          <a href={site.phone.href} tabIndex={hidden ? -1 : undefined} className="flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
            <Phone aria-hidden="true" className="size-4 text-glow" />
            {site.phone.display}
          </a>
          <a href={emailHref} tabIndex={hidden ? -1 : undefined} className="flex items-center gap-2 underline-offset-4 hover:underline">
            <Mail aria-hidden="true" className="size-4 text-glow" />
            {site.email}
          </a>
        </div>
      </div>
    </div>
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
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? 'bg-paper/85 shadow-[0_1px_0_var(--color-line),0_10px_30px_-20px_rgb(0_0_0/0.35)] backdrop-blur-xl backdrop-saturate-150' : ''
        }`}
      >
        <TopBar hidden={scrolled} />
        <div className={`wrap flex items-center justify-between gap-3 transition-[padding] duration-300 ${scrolled ? 'py-2.5' : 'py-4 md:py-5'}`}>
          <Link to="/" aria-label={`${site.name} home`} className="shrink-0 rounded-lg">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            {nav
              .filter((item) => item.desktop !== false)
              .map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative whitespace-nowrap rounded-full px-3.5 py-2 font-medium transition-colors xl:px-4 ${isActive ? 'text-cream' : 'hover:text-teal'}`
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
            {scrolled && (
              <a href={site.phone.href} className="hidden items-center gap-2 rounded-full px-3 py-2 font-semibold hover:text-teal 2xl:inline-flex">
                <Phone aria-hidden="true" className="size-4" />
                {site.phone.display}
              </a>
            )}
            <ThemeToggle />
            <button
              type="button"
              onClick={open}
              aria-label={`Open request list, ${count} ${count === 1 ? 'item' : 'items'}`}
              className="hidden min-h-12 items-center gap-2 rounded-full border-[1.5px] border-ink/70 px-3.5 font-semibold transition-colors hover:bg-ink hover:text-paper lg:inline-flex"
            >
              <ClipboardList aria-hidden="true" className="size-5" />
              <span className="hidden xl:inline">My list</span>
              <CountBadge count={count} />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-12 place-items-center rounded-full bg-pine text-cream lg:hidden"
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
            className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-pine-deep text-cream lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="wrap flex items-center justify-between gap-3 py-4">
              <Logo light />
              <div className="flex items-center gap-2">
                <ThemeToggle onDark />
                <button
                  type="button"
                  data-autofocus
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="grid size-12 place-items-center rounded-full bg-cream text-pine-deep"
                >
                  <X aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>
            <nav aria-label="Mobile" className="wrap flex flex-1 flex-col justify-center gap-0.5 py-6">
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
                      `block py-1.5 font-display text-[clamp(2rem,9vw,3.25rem)] leading-tight ${isActive ? 'display-italic text-glow' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="wrap space-y-1 border-t border-cream/20 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <a href={site.phone.href} className="flex min-h-12 items-center gap-3 text-lg font-semibold">
                <Phone aria-hidden="true" className="size-5 text-glow" />
                {site.phone.display}
              </a>
              <a href={emailHref} className="flex min-h-12 items-center gap-3 break-all">
                <Mail aria-hidden="true" className="size-5 shrink-0 text-glow" />
                {site.email}
              </a>
              <p className="flex items-center gap-3 text-sage">
                <MapPin aria-hidden="true" className="size-5 shrink-0 text-glow" />
                {site.serviceArea}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
