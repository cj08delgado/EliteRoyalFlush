import Image from 'next/image'
import { Star } from 'lucide-react'
import type { Review } from '@/lib/reviews'
import { StarRating } from './star-rating'

export function ReviewsHero({ reviews }: { reviews: Review[] }) {
  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Image
        src="/images/about-event.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pt-36 pb-20 md:px-8 md:pt-44 md:pb-28 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold uppercase backdrop-blur-sm">
            <Star className="size-3.5 fill-gold" aria-hidden="true" />
            Guest Reviews
          </span>
          <h1 className="mt-6 font-serif text-4xl leading-[1.05] font-semibold text-balance text-background sm:text-5xl md:text-6xl">
            Loved by hosts. Remembered by guests.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-background/80">
            From weddings to corporate gatherings, here&apos;s what our clients say about the Elite
            Royal Flush experience.
          </p>
        </div>

        {reviews.length > 0 ? (
          <div className="flex shrink-0 flex-col gap-2 rounded-3xl border border-background/15 bg-background/5 p-7 text-background backdrop-blur-md">
            <p className="font-serif text-5xl font-semibold text-gold">{average.toFixed(1)}</p>
            <StarRating rating={average} />
            <p className="text-sm text-background/70">
              Average from {reviews.length} client {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        ) : (
          <a
            href="#leave-review"
            className="inline-flex shrink-0 items-center justify-center self-start rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-gold-foreground transition-transform hover:scale-[1.02] lg:self-end"
          >
            Be the first to review
          </a>
        )}
      </div>
    </section>
  )
}
