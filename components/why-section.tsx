import Image from 'next/image'
import { Sparkles, SprayCan, Truck, ShieldCheck, Gem, CalendarCheck } from 'lucide-react'

const REASONS = [
  {
    icon: Sparkles,
    title: 'Luxury appearance',
    description: 'Restrooms that look and feel like they belong at an upscale venue.',
  },
  {
    icon: SprayCan,
    title: 'Professionally cleaned',
    description: 'Every unit arrives spotless, fully stocked, and guest-ready.',
  },
  {
    icon: Truck,
    title: 'Delivered & picked up',
    description: 'We handle drop-off and pickup so you never have to think about it.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable service',
    description: 'On-time, dependable, and communicative from first call to final pickup.',
  },
  {
    icon: Gem,
    title: 'Perfect for upscale events',
    description: 'A presentation that matches weddings, galas, and special occasions.',
  },
  {
    icon: CalendarCheck,
    title: 'Easy booking process',
    description: 'Make a deposit, confirm the details, and consider it handled.',
  },
]

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-20 bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">
            Why Elite Royal Flush
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-5xl">
            The difference is in the details
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-primary-foreground/70">
            This isn&apos;t a regular porta-potty company. Elite Royal Flush is the standard you want when
            the experience matters.
          </p>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {REASONS.map((reason) => (
              <div key={reason.title} className="flex gap-4">
                <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                  <reason.icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold">{reason.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-primary-foreground/65">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/images/about-event.png"
            alt="An elegant outdoor event reception at golden hour with a tasteful luxury restroom trailer"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
