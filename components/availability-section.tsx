'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Booked dates keyed as "YYYY-M-D" (month is 0-indexed). Placeholder data —
// swap for real bookings from your calendar/backend when ready.
const BOOKED_DATES = new Set([
  keyFor(new Date().getFullYear(), new Date().getMonth(), 6),
  keyFor(new Date().getFullYear(), new Date().getMonth(), 7),
  keyFor(new Date().getFullYear(), new Date().getMonth(), 13),
  keyFor(new Date().getFullYear(), new Date().getMonth(), 14),
  keyFor(new Date().getFullYear(), new Date().getMonth(), 20),
  keyFor(new Date().getFullYear(), new Date().getMonth(), 21),
  keyFor(new Date().getFullYear(), new Date().getMonth(), 27),
  keyFor(new Date().getFullYear(), new Date().getMonth() + 1, 3),
  keyFor(new Date().getFullYear(), new Date().getMonth() + 1, 4),
  keyFor(new Date().getFullYear(), new Date().getMonth() + 1, 11),
  keyFor(new Date().getFullYear(), new Date().getMonth() + 1, 18),
])

function keyFor(year: number, month: number, day: number) {
  const normalized = new Date(year, month, day)
  return `${normalized.getFullYear()}-${normalized.getMonth()}-${normalized.getDate()}`
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function AvailabilitySection() {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [view, setView] = useState(() => ({ year: today.getFullYear(), month: today.getMonth() }))

  const cells = useMemo(() => {
    const firstDay = new Date(view.year, view.month, 1).getDay()
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
    const result: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) result.push(null)
    for (let d = 1; d <= daysInMonth; d++) result.push(d)
    return result
  }, [view])

  const atCurrentMonth = view.year === today.getFullYear() && view.month === today.getMonth()

  function shift(delta: number) {
    setView((v) => {
      const next = new Date(v.year, v.month + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }

  return (
    <section id="availability" className="scroll-mt-20 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">Availability</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-5xl">
            See which dates are open
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Browse our calendar to find your event date. Open dates are ready to reserve &mdash;
            booked dates are already taken. Found your day? Make a deposit to lock it in.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-5 shadow-xl shadow-black/5 md:p-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => shift(-1)}
              disabled={atCurrentMonth}
              aria-label="Previous month"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="size-5" />
            </button>
            <h3 className="font-serif text-xl font-semibold md:text-2xl" aria-live="polite">
              {MONTHS[view.month]} {view.year}
            </h3>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Next month"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1.5 md:gap-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="pb-2 text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase"
              >
                {day}
              </div>
            ))}

            {cells.map((day, index) => {
              if (day === null) return <div key={`empty-${index}`} aria-hidden="true" />

              const date = new Date(view.year, view.month, day)
              const isPast = date < today
              const isBooked = BOOKED_DATES.has(keyFor(view.year, view.month, day))
              const isToday = date.getTime() === today.getTime()

              let state: 'past' | 'booked' | 'available' = 'available'
              if (isPast) state = 'past'
              else if (isBooked) state = 'booked'

              const base =
                'relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium md:text-base'

              if (state === 'past') {
                return (
                  <div
                    key={day}
                    className={`${base} text-muted-foreground/30`}
                    aria-label={`${MONTHS[view.month]} ${day}, unavailable`}
                  >
                    {day}
                  </div>
                )
              }

              if (state === 'booked') {
                return (
                  <div
                    key={day}
                    className={`${base} bg-secondary text-muted-foreground line-through`}
                    aria-label={`${MONTHS[view.month]} ${day}, booked`}
                  >
                    {day}
                  </div>
                )
              }

              return (
                <a
                  key={day}
                  href="#deposit"
                  className={`${base} border border-gold/40 bg-gold/10 text-foreground transition-colors hover:bg-gold hover:text-gold-foreground ${
                    isToday ? 'ring-2 ring-gold ring-offset-2 ring-offset-card' : ''
                  }`}
                  aria-label={`${MONTHS[view.month]} ${day}, available — request this date`}
                >
                  {day}
                </a>
              )
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border pt-6 text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="size-4 rounded-md border border-gold/40 bg-gold/10" aria-hidden="true" />
              <span className="text-muted-foreground">Available</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-4 rounded-md bg-secondary" aria-hidden="true" />
              <span className="text-muted-foreground">Booked</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-4 rounded-md ring-2 ring-gold" aria-hidden="true" />
              <span className="text-muted-foreground">Today</span>
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#deposit"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-base font-semibold text-gold-foreground transition-transform hover:scale-[1.02]"
          >
            Request Your Date
          </a>
        </div>
      </div>
    </section>
  )
}
