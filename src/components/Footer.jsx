import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { nav, site } from '../data/site.js'
import { Logo, PulseLine } from './ui.jsx'

export default function Footer() {
  const { address, registry } = site
  return (
    <footer className="bg-pine-deep pb-24 text-cream lg:pb-0">
      <PulseLine className="h-20 w-full md:h-28" color="#F6936F" />
      <div className="wrap grid gap-12 py-12 md:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-5">
          <Logo light />
          <p className="mt-6 max-w-sm font-display text-3xl leading-tight">
            Medical equipment for care, recovery, mobility and <span className="display-italic text-glow">daily living.</span>
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="eyebrow text-sage!">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="inline-block py-1.5 underline-offset-4 hover:underline">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2 lg:col-span-4">
          <h2 className="eyebrow text-sage!">Reach us</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={site.phone.href} className="flex items-center gap-3 py-1.5 underline-offset-4 hover:underline">
                <Phone aria-hidden="true" className="size-5 shrink-0 text-glow" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 py-1.5 break-all underline-offset-4 hover:underline">
                <Mail aria-hidden="true" className="size-5 shrink-0 text-glow" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 py-1.5 underline-offset-4 hover:underline">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-glow" />
                <span>{address.street}<br />{address.city}, {address.state} {address.zip}</span>
              </a>
            </li>
            {site.hours && <li className="py-1.5 pl-8">{site.hours}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="wrap space-y-3 py-6 text-sm text-sage">
          <p>
            <strong className="font-semibold text-cream">If this is a medical emergency, call 911.</strong>{' '}
            Information on this site is general and is not medical advice. Talk to your healthcare provider about what is right for you.
          </p>
          <p>
            © {new Date().getFullYear()} {site.legalName}. Utah {registry.type}, Entity No. {registry.entityNumber}.
          </p>
        </div>
      </div>
    </footer>
  )
}
