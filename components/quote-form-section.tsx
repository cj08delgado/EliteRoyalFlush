'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { ArrowLeft, Check, Crown, Loader2 } from 'lucide-react'
import { PACKAGES } from '@/lib/packages'
import { startDepositCheckout } from '@/app/actions/deposit'
import { DepositCheckout } from '@/components/deposit-checkout'

const EVENT_TYPES = [
  'Wedding',
  'Private Party',
  'Corporate Event',
  'Festival / Large Event',
  'Construction / Job Site',
  'Graduation / Quinceañera',
  'Other',
]

const fieldClass =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/30'

const labelClass = 'mb-1.5 block text-sm font-medium text-foreground'

export function QuoteFormSection() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState('')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    function onSelectPackage(event: Event) {
      const name = (event as CustomEvent<string>).detail
      if (name) setSelectedPackage(name)
    }
    window.addEventListener('rf:select-package', onSelectPackage)
    return () => window.removeEventListener('rf:select-package', onSelectPackage)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (key: string) => String(data.get(key) ?? '')
    setPending(true)
    setError(null)
    try {
      const secret = await startDepositCheckout({
        packageName: selectedPackage,
        name: field('name'),
        phone: field('phone'),
        email: field('email'),
        eventDate: field('eventDate'),
        eventType: field('eventType'),
        location: field('location'),
        guests: field('guests'),
        electricity: field('electricity'),
        details: field('details'),
      })
      setClientSecret(secret)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setPending(false)
    }
  }

  function resetForm() {
    setClientSecret(null)
    setSubmitted(false)
  }

  const activePackage = PACKAGES.find((pkg) => pkg.name === selectedPackage)
  const needsPower = !activePackage?.includesGenerator

  return (
    <section id="deposit" className="scroll-mt-20 bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">Make a Deposit</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-5xl">
            Reserve your date
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
            Every booking is secured with a $200 deposit, applied toward your package total. Tell
            us about your event, then pay securely to lock in your date.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/5 md:p-9">
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="inline-flex size-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Check className="size-8" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold">Booking confirmed!</h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Your $200 deposit was received and your date is reserved. A receipt is on its way to
                your email, and the Elite Royal Flush team will reach out to finalize your event
                details.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-6 text-sm font-semibold text-gold underline-offset-4 hover:underline"
              >
                Make another booking
              </button>
            </div>
          ) : clientSecret ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setClientSecret(null)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold underline-offset-4 hover:underline"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Edit details
                </button>
                <p className="text-sm text-muted-foreground">Deposit due today: $200</p>
              </div>
              <DepositCheckout clientSecret={clientSecret} onComplete={() => setSubmitted(true)} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="package" className={labelClass}>
                  Package
                </label>
                <select
                  id="package"
                  name="package"
                  value={selectedPackage}
                  onChange={(event) => setSelectedPackage(event.target.value)}
                  className={fieldClass}
                >
                  <option value="">Not sure yet — help me choose</option>
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.name} value={pkg.name}>
                      {pkg.name} — ${pkg.price}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone
                </label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} placeholder="(555) 123-4567" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="eventDate" className={labelClass}>
                  Event date
                </label>
                <input id="eventDate" name="eventDate" type="date" required className={fieldClass} />
              </div>
              <div>
                <label htmlFor="eventType" className={labelClass}>
                  Event type
                </label>
                <select id="eventType" name="eventType" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Select event type
                  </option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="location" className={labelClass}>
                  Address or venue
                </label>
                <input id="location" name="location" type="text" required autoComplete="street-address" className={fieldClass} placeholder="Venue name or full address" />
              </div>
              <div>
                <label htmlFor="guests" className={labelClass}>
                  Number of guests
                </label>
                <input id="guests" name="guests" type="number" min={1} className={fieldClass} placeholder="e.g. 150" />
              </div>
              {needsPower && (
                <div className="sm:col-span-2">
                  <label htmlFor="electricity" className={labelClass}>
                    Is there electricity within 50ft?
                  </label>
                  <select id="electricity" name="electricity" required defaultValue="" className={fieldClass}>
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    This package doesn&apos;t include a generator, so we need a power source within
                    50ft. Need power on-site? Ask us about the Royal No-Hookup Experience.
                  </p>
                </div>
              )}
              <div className="sm:col-span-2">
                <label htmlFor="details" className={labelClass}>
                  Additional details
                </label>
                <textarea id="details" name="details" rows={4} className={fieldClass} placeholder="Anything else we should know about your event?" />
              </div>

              {error && (
                <p role="alert" className="sm:col-span-2 text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={pending}
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-gold-foreground transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
              >
                {pending ? (
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                ) : (
                  <Crown className="size-5" aria-hidden="true" />
                )}
                {pending ? 'Preparing secure checkout...' : 'Continue to $200 Deposit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
