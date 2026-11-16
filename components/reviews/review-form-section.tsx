'use client'

import { useActionState, useState } from 'react'
import { Star, CheckCircle2 } from 'lucide-react'
import { submitReview, type ReviewFormState } from '@/app/actions/submit-review'
import { cn } from '@/lib/utils'

const initialState: ReviewFormState = { status: 'idle', message: '' }

const inputClass =
  'w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none'

export function ReviewFormSection() {
  const [state, formAction, pending] = useActionState(submitReview, initialState)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <section id="leave-review" className="scroll-mt-20 border-t border-border bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">Share Your Experience</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-4xl">
            Hosted with us? We&apos;d love to hear about it.
          </h2>
          <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
            Your feedback helps future hosts plan with confidence and helps us keep raising the
            standard. Your review appears on this page as soon as you submit it. Your email is never
            shown publicly.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-7 md:p-10 lg:col-span-3">
          {state.status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center" role="status">
              <CheckCircle2 className="size-12 text-gold" aria-hidden="true" />
              <p className="font-serif text-2xl font-semibold">Thank you!</p>
              <p className="max-w-sm leading-relaxed text-muted-foreground">{state.message}</p>
            </div>
          ) : (
            <form action={formAction} className="flex flex-col gap-5">
              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-medium">Your rating</legend>
                <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="cursor-pointer" onMouseEnter={() => setHover(value)}>
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={rating === value}
                        onChange={() => setRating(value)}
                        className="peer sr-only"
                        required
                      />
                      <span className="sr-only">{`${value} star${value > 1 ? 's' : ''}`}</span>
                      <Star
                        className={cn(
                          'size-8 rounded-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gold',
                          value <= (hover || rating) ? 'fill-gold text-gold' : 'text-gold/35',
                        )}
                        aria-hidden="true"
                      />
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="review-name" className="text-sm font-medium">
                    Name
                  </label>
                  <input id="review-name" name="name" required maxLength={80} autoComplete="name" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="review-email" className="text-sm font-medium">
                    Email <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="review-email"
                    name="email"
                    type="email"
                    maxLength={120}
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="review-event" className="text-sm font-medium">
                  Event type <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="review-event"
                  name="event"
                  maxLength={80}
                  placeholder="Wedding, birthday, corporate event..."
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="review-text" className="text-sm font-medium">
                  Your review
                </label>
                <textarea
                  id="review-text"
                  name="review"
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell us about your experience..."
                  className={cn(inputClass, 'resize-y leading-relaxed')}
                />
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="review-company">Company</label>
                <input id="review-company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              {state.status === 'error' && (
                <p className="text-sm text-destructive" role="alert">
                  {state.message}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-base font-semibold text-gold-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:self-start"
              >
                {pending ? 'Sending...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
