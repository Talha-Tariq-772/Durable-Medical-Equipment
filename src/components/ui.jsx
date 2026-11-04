import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]

const buttonStyles = {
  primary: 'bg-ember text-white hover:bg-ember-deep',
  outline: 'border-[1.5px] border-ink/70 text-ink hover:bg-ink hover:text-paper',
  light: 'bg-paper text-ink hover:bg-white',
  outlineLight: 'border-[1.5px] border-paper/60 text-paper hover:bg-paper hover:text-ink',
}

const buttonBase =
  'group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-7 py-3 text-center font-semibold transition-colors duration-200'

/** Renders a router link (`to`), an external link (`href`) or a button. */
export function Button({ to, href, variant = 'primary', icon = true, className = '', children, ...rest }) {
  const classes = `${buttonBase} ${buttonStyles[variant]} ${className}`
  const content = (
    <>
      {children}
      {icon && <ArrowRight aria-hidden="true" className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  )
  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>
  if (href) return <a href={href} className={classes} {...rest}>{content}</a>
  return <button type="button" className={classes} {...rest}>{content}</button>
}

export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/**
 * Masked word-by-word heading reveal.
 * `parts` is an array of strings or { text, italic } segments.
 */
export function TextReveal({ parts, as: Tag = 'h2', className = '', immediate = false, delay = 0 }) {
  const segments = parts.map((p) => (typeof p === 'string' ? { text: p } : p))
  const plain = segments.map((s) => s.text).join(' ')
  let index = 0

  const trigger = immediate
    ? { animate: 'shown' }
    : { whileInView: 'shown', viewport: { once: true, amount: 0.4 } }

  return (
    <Tag className={className}>
      <span className="sr-only">{plain}</span>
      <motion.span aria-hidden="true" initial="hidden" {...trigger}>
        {segments.map((seg, s) =>
          seg.text.split(' ').map((word, w) => {
            const i = index++
            return (
              <span key={`${s}-${w}`} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
                <motion.span
                  className={`inline-block ${seg.italic ? 'display-italic text-ember' : ''} ${seg.className ?? ''}`}
                  variants={{
                    hidden: { y: '115%' },
                    shown: { y: 0, transition: { duration: 0.95, delay: delay + i * 0.055, ease: EASE } },
                  }}
                >
                  {word}
                  {' '}
                </motion.span>
              </span>
            )
          }),
        )}
      </motion.span>
    </Tag>
  )
}

export function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="size-10 shrink-0">
        <rect width="64" height="64" rx="16" fill={light ? '#F6F2EA' : '#0F4C47'} />
        <path d="M16 12h15c12 0 21 8.5 21 20s-9 20-21 20H16z" fill={light ? '#0F4C47' : '#F6F2EA'} />
        <path d="M27 23h7v6h6v7h-6v6h-7v-6h-6v-7h6z" fill={light ? '#F6936F' : '#C8451F'} />
      </svg>
      <span className={`font-display text-[1.5rem] leading-none tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>
        Daud <span className="display-italic">DME</span>
      </span>
    </span>
  )
}

/** Rotating circular seal. Ours, deliberately not the State of Utah's. */
export function Seal({ className = '', dark = false }) {
  const label = 'DAUD DME  •  SALT LAKE CITY  •  UTAH  •  CARE AT HOME  •  '
  return (
    <div aria-hidden="true" className={className}>
      <svg viewBox="0 0 200 200" className="spin-slow size-full">
        <defs>
          <path id="seal-circle" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
        </defs>
        <circle cx="100" cy="100" r="99" fill={dark ? '#0A2F2C' : '#F6F2EA'} />
        <text fill={dark ? '#F6F2EA' : '#12302E'} fontSize="16.5" fontWeight="600" letterSpacing="2.4" fontFamily="var(--font-sans)">
          <textPath href="#seal-circle" textLength="472">{label}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 64 64" className="absolute inset-[34%]">
        <path d="M24 4h16v20h20v16H40v20H24V40H4V24h20z" fill="#C8451F" />
      </svg>
    </div>
  )
}

/** The heartbeat that runs across the page: draws on arrival. */
export function PulseLine({ className = '', color = 'currentColor' }) {
  const d =
    'M0 60H540l14-10 14 10h26l10 12 16-56 18 74 14-40 10 10h26l16-12 16 12H1440'
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true" className={className}>
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.6, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  )
}

export function Marquee({ items, className = '' }) {
  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap">{item}</span>
          <span className="mx-7 text-[0.6em] not-italic text-ember md:mx-10">+</span>
        </span>
      ))}
    </span>
  )
  return (
    <div aria-hidden="true" className={`overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  )
}

export function PageHero({ eyebrow, title, intro, children }) {
  return (
    <section className="wrap pb-12 pt-32 md:pb-20 md:pt-44">
      <Reveal y={12}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <TextReveal as="h1" immediate parts={title} className="mt-4 max-w-5xl text-[clamp(2.75rem,8vw,6.5rem)]" />
      {intro && (
        <Reveal delay={0.25}>
          <p className="mt-7 max-w-2xl text-lg text-ink-soft md:text-xl">{intro}</p>
        </Reveal>
      )}
      {children}
    </section>
  )
}

export function SectionHead({ eyebrow, title, intro, light = false, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal y={12}>
        <p className={`eyebrow ${light ? 'text-mist!' : ''}`}>{eyebrow}</p>
      </Reveal>
      <TextReveal parts={title} className="mt-4 text-[clamp(2.25rem,5.5vw,4.25rem)]" />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-6 text-lg ${light ? 'text-mist' : 'text-ink-soft'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
