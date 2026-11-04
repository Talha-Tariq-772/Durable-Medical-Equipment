import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Clock, Mail, MailCheck, MapPin, Phone, X } from 'lucide-react'
import { site } from '../data/site.js'
import { useRequestList } from '../components/RequestList.jsx'
import { Button, PageHero, Reveal } from '../components/ui.jsx'

const roles = ['Patient', 'Family member or caregiver', 'Hospital', 'Clinic', 'Healthcare provider', 'Other']
const blank = { name: '', role: '', phone: '', email: '', message: '' }

function validate(v) {
  const errors = {}
  if (!v.name.trim()) errors.name = 'Please enter your name.'
  if (!v.role) errors.role = 'Please choose the option closest to you.'
  const email = v.email.trim()
  const digits = v.phone.replace(/\D/g, '')
  if (!email && !digits) {
    errors.phone = 'Please give us a phone number or an email address.'
  } else {
    if (digits && digits.length < 10) errors.phone = 'Please enter a full phone number, including area code.'
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please check this email address.'
  }
  return errors
}

function buildMailto(v, items) {
  const lines = [
    `Name: ${v.name.trim()}`,
    `I am: ${v.role}`,
    v.phone.trim() && `Phone: ${v.phone.trim()}`,
    v.email.trim() && `Email: ${v.email.trim()}`,
    items.length > 0 && `\nEquipment I'm interested in:\n${items.map((i) => `- ${i.name}`).join('\n')}`,
    v.message.trim() && `\nMessage:\n${v.message.trim()}`,
  ].filter(Boolean)
  const subject = `Equipment request from ${v.name.trim()}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-medium">
        {label} {optional && <span className="font-normal text-ink-soft">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.95rem] font-medium text-ember-deep">{error}</p>
      )}
    </div>
  )
}

export default function Contact() {
  const { items, toggle } = useRequestList()
  const [values, setValues] = useState(blank)
  const [errors, setErrors] = useState({})
  const [drafted, setDrafted] = useState(false)
  const { address } = site

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }
  const describe = (key) => ({
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })

  const submit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    window.location.href = buildMailto(values, items)
    setDrafted(true)
  }

  return (
    <>
      <title>Contact | Daud DME</title>
      <PageHero
        eyebrow="Contact"
        title={['Let’s work out', { text: 'what’s next.', italic: true }]}
        intro="Call us, or send your request below. You do not need to have everything figured out first."
      />

      <section className="wrap grid gap-10 pb-20 lg:grid-cols-[3fr_2fr] lg:gap-16 md:pb-32">
        <Reveal y={16}>
          <div className="rounded-3xl bg-card p-5 ring-1 ring-line md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {drafted ? (
                <motion.div key="done" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <span className="grid size-16 place-items-center rounded-full bg-mist text-pine">
                    <MailCheck aria-hidden="true" className="size-8" />
                  </span>
                  <h2 className="mt-5 text-4xl">One last step: press send.</h2>
                  <p className="mt-4 text-lg text-ink-soft">
                    We opened your email app with your request written out. It has not reached us until you send it from there.
                  </p>
                  <p className="mt-3 text-lg text-ink-soft">
                    If no email opened, please call us on{' '}
                    <a href={site.phone.href} className="font-semibold text-ink underline underline-offset-4">{site.phone.display}</a>{' '}
                    or write to{' '}
                    <a href={`mailto:${site.email}`} className="break-all font-semibold text-ink underline underline-offset-4">{site.email}</a>.
                  </p>
                  <Button variant="outline" icon={false} onClick={() => setDrafted(false)} className="mt-7">Back to the form</Button>
                </motion.div>
              ) : (
                <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0 }} className="space-y-5">
                  <h2 className="text-4xl">Send a request</h2>

                  <div>
                    <h3 className="mb-2 font-sans! font-medium tracking-normal! text-base leading-normal">Equipment on your list</h3>
                    {items.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <li key={item.id} className="flex items-center gap-1 rounded-full bg-mist py-1 pl-4 pr-1 font-medium">
                            {item.name}
                            <button
                              type="button"
                              onClick={() => toggle(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="grid size-10 place-items-center rounded-full hover:bg-paper"
                            >
                              <X aria-hidden="true" className="size-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-ink-soft">
                        Nothing yet. You can <Link to="/equipment" className="font-semibold text-ink underline underline-offset-4">browse the equipment</Link> or just tell us below.
                      </p>
                    )}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Your name" error={errors.name}>
                      <input id="name" className="field" autoComplete="name" value={values.name} onChange={update('name')} {...describe('name')} />
                    </Field>
                    <Field id="role" label="I am a" error={errors.role}>
                      <select id="role" className="field" value={values.role} onChange={update('role')} {...describe('role')}>
                        <option value="">Please choose</option>
                        {roles.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </Field>
                    <Field id="phone" label="Phone" error={errors.phone}>
                      <input id="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" value={values.phone} onChange={update('phone')} {...describe('phone')} />
                    </Field>
                    <Field id="email" label="Email" optional error={errors.email}>
                      <input id="email" type="email" inputMode="email" className="field" autoComplete="email" value={values.email} onChange={update('email')} {...describe('email')} />
                    </Field>
                  </div>
                  <Field id="message" label="How can we help?" optional>
                    <textarea id="message" rows={4} className="field" value={values.message} onChange={update('message')} />
                  </Field>

                  <p className="flex gap-3 rounded-xl bg-paper-2 p-4 text-[0.95rem] leading-snug">
                    <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-ember" />
                    Email is not a secure channel. Please leave out diagnoses, insurance numbers and other private medical details. We can take those by phone.
                  </p>

                  <Button type="submit" className="w-full sm:w-auto">Write my request email</Button>
                  <p className="text-sm text-ink-soft">This opens your own email app with your request ready to send.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <ul className="space-y-1">
              <li>
                <a href={site.phone.href} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-paper-2">
                  <span className="grid size-13 shrink-0 place-items-center rounded-full bg-pine text-paper"><Phone aria-hidden="true" className="size-5" /></span>
                  <span><span className="block text-sm text-ink-soft">Call</span><span className="font-display text-2xl">{site.phone.display}</span></span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-paper-2">
                  <span className="grid size-13 shrink-0 place-items-center rounded-full bg-pine text-paper"><Mail aria-hidden="true" className="size-5" /></span>
                  <span className="min-w-0"><span className="block text-sm text-ink-soft">Email</span><span className="block break-all text-lg font-medium">{site.email}</span></span>
                </a>
              </li>
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-paper-2">
                  <span className="grid size-13 shrink-0 place-items-center rounded-full bg-pine text-paper"><MapPin aria-hidden="true" className="size-5" /></span>
                  <span><span className="block text-sm text-ink-soft">Office</span><span className="text-lg font-medium">{address.street}, {address.city}, {address.state} {address.zip}</span></span>
                </a>
              </li>
              {site.hours && (
                <li className="flex items-center gap-4 p-3">
                  <span className="grid size-13 shrink-0 place-items-center rounded-full bg-pine text-paper"><Clock aria-hidden="true" className="size-5" /></span>
                  <span><span className="block text-sm text-ink-soft">Hours</span><span className="text-lg font-medium">{site.hours}</span></span>
                </li>
              )}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <iframe
              title={`Map showing ${site.name} in ${address.city}`}
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full rounded-2xl border-0 bg-paper-2 grayscale-[35%]"
            />
          </Reveal>
          <Reveal delay={0.25}>
            <p className="rounded-2xl border-[1.5px] border-ember/50 p-4">
              <strong className="font-semibold">In a medical emergency, call 911.</strong> Do not wait for a reply from us.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
