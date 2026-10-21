import Image from 'next/image'
import { Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <Image
        src="/images/hero-luxury-restroom.png"
        alt="An Elite Royal Flush luxury restroom trailer set up at an elegant outdoor wedding at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-16 md:px-8 md:pt-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold uppercase backdrop-blur-sm">
            <Star className="size-3.5 fill-gold" aria-hidden="true" />
            Premium Event Sanitation
          </span>

          <h1 className="mt-6 font-serif text-4xl leading-[1.05] font-semibold text-balance text-background sm:text-5xl md:text-6xl lg:text-7xl">
            Luxury Restrooms. Wherever You Celebrate.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-background/80 md:text-xl">
            Premium portable restroom solutions for events, businesses, and special occasions.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#deposit"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-base font-semibold text-gold-foreground shadow-lg shadow-black/20 transition-transform hover:scale-[1.03]"
            >
              Make a Deposit
            </a>
            <a
              href="#availability"
              className="inline-flex items-center justify-center rounded-full border border-background/40 bg-background/5 px-8 py-4 text-base font-semibold text-background backdrop-blur-sm transition-colors hover:bg-background/15"
            >
              Check Availability
            </a>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-background">
            {[
              { value: 'Spotless', label: 'Professionally cleaned' },
              { value: 'On Time', label: 'Delivered & picked up' },
              { value: 'Upscale', label: 'Event-ready presentation' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-serif text-2xl font-semibold text-gold">{stat.value}</dt>
                <dd className="mt-1 text-sm text-background/70">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
