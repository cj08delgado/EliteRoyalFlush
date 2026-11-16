import { MessageSquareQuote, Quote } from 'lucide-react'
import type { Review } from '@/lib/reviews'
import { StarRating } from './star-rating'

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })

function ReviewMeta({ review, className }: { review: Review; className: string }) {
  return (
    <p className={className}>
      {review.event ? `${review.event} · ` : ''}
      {dateFormatter.format(review.createdAt)}
    </p>
  )
}

export function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  const [featured, ...rest] = reviews

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">Testimonials</p>
        <h2 id="reviews-heading" className="mt-3 font-serif text-3xl font-semibold text-balance md:text-5xl">
          Every detail, noticed
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          Real words from the people who trusted us with their most important occasions.
        </p>
      </div>

      {!featured ? (
        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <MessageSquareQuote className="size-10 text-gold" aria-hidden="true" />
          <p className="font-serif text-2xl font-semibold">No reviews yet</p>
          <p className="max-w-md leading-relaxed text-pretty text-muted-foreground">
            Hosted an event with us? Your review will be the first one future clients see.
          </p>
          <a
            href="#leave-review"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-gold-foreground transition-transform hover:scale-[1.02]"
          >
            Write a review
          </a>
        </div>
      ) : (
        <>
          <figure className="mt-14 rounded-3xl bg-primary p-8 text-primary-foreground md:p-14">
            <Quote className="size-10 text-gold" aria-hidden="true" />
            <blockquote className="mt-6 font-serif text-2xl leading-snug text-balance whitespace-pre-line md:text-4xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{featured.name}</p>
                <ReviewMeta review={featured} className="text-sm text-primary-foreground/65" />
              </div>
              <StarRating rating={featured.rating} />
            </figcaption>
          </figure>

          {rest.length > 0 && (
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((review) => (
                <li key={review.id}>
                  <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                    <StarRating rating={review.rating} />
                    <blockquote className="mt-5 flex-1 leading-relaxed text-pretty whitespace-pre-line text-card-foreground">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6 border-t border-border pt-5">
                      <p className="font-semibold">{review.name}</p>
                      <ReviewMeta review={review} className="text-sm text-muted-foreground" />
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}
