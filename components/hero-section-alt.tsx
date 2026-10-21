import Image from 'next/image'
import { Star, Phone } from 'lucide-react'

export function HeroSectionAlt() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-background pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold uppercase">
            <Star className="size-3.5 fill-gold" aria-hidden="true" />
            Elite Royal Flush
          </span>

          <h1 className="mt-6 font-serif text-4xl leading-[1.05] font-semibold text-balance text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Five-Star Restrooms for Every Occasion.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
            From weddings to job sites, our luxury mobile restroom trailers bring comfort,
            cleanliness, and class wherever you need them.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#deposit"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-base font-semibold text-gold-foreground shadow-lg shadow-black/20 transition-transform hover:scale-[1.03]"
            >
              Make a Deposit
            </a>
            <a
              href="tel:4422580222"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Phone className="size-4" aria-hidden="true" />
              442-258-0222
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { value: 'Spotless', label: 'Professionally cleaned' },
              { value: 'On Time', label: 'Delivered & picked up' },
              { value: 'Upscale', label: 'Event-ready presentation' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-2xl font-semibold text-gold">{stat.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/30">
          <Image
            src="/images/hero-luxury-restroom.png"
            alt="A luxury portable restroom trailer set up at an elegant outdoor wedding at dusk"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
