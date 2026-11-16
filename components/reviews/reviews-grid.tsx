import { Quote } from 'lucide-react'
import { REVIEWS } from '@/lib/reviews'
import { StarRating } from './star-rating'

export function ReviewsGrid() {
  const [featured, ...rest] = REVIEWS

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

      <figure className="mt-14 rounded-3xl bg-primary p-8 text-primary-foreground md:p-14">
        <Quote className="size-10 text-gold" aria-hidden="true" />
        <blockquote className="mt-6 font-serif text-2xl leading-snug text-balance md:text-4xl">
          &ldquo;{featured.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">{featured.name}</p>
            <p className="text-sm text-primary-foreground/65">
              {featured.event} &middot; {featured.location}
            </p>
          </div>
          <StarRating rating={featured.rating} />
        </figcaption>
      </figure>

      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((review) => (
          <li key={review.name}>
            <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
              <StarRating rating={review.rating} />
              <blockquote className="mt-5 flex-1 leading-relaxed text-pretty text-card-foreground">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-muted-foreground">
                  {review.event} &middot; {review.location}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
