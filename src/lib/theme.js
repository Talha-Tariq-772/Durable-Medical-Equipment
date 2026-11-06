import { useCallback, useSyncExternalStore } from 'react'

/**
 * Theme lives on <html data-theme="light|dark">. The inline script in index.html
 * sets it before React renders (no flash). This module keeps every toggle in sync,
 * remembers the visitor's choice, and follows the system setting until they choose.
 */
export const THEME_KEY = 'daud-dme-theme'
const THEME_COLORS = { light: '#F6F2EA', dark: '#161514' }

function storedTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

let transitionTimer
function applyTheme(theme, animate) {
  const root = document.documentElement
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (animate && !reduce) {
    root.classList.add('theme-transition')
    clearTimeout(transitionTimer)
    transitionTimer = setTimeout(() => root.classList.remove('theme-transition'), 450)
  }
  root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

function getSnapshot() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function subscribe(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onSystemChange = (e) => {
    if (!storedTheme()) applyTheme(e.matches ? 'dark' : 'light', true)
  }
  media.addEventListener('change', onSystemChange)

  return () => {
    observer.disconnect()
    media.removeEventListener('change', onSystemChange)
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'light')

  const toggle = useCallback(() => {
    const next = getSnapshot() === 'dark' ? 'light' : 'dark'
    applyTheme(next, true)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
  }, [])

  return { theme, toggle }
}
