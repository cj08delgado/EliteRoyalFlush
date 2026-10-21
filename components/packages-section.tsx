'use client'

import { Check, Crown } from 'lucide-react'
import { PACKAGES } from '@/lib/packages'
import { cn } from '@/lib/utils'

function selectPackage(name: string) {
  window.dispatchEvent(new CustomEvent('rf:select-package', { detail: name }))
}

export function PackagesSection() {
  return (
    <section id="packages" className="scroll-mt-20 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">Packages</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-5xl">
            Choose your Royal experience
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
            Transparent, all-in pricing for our luxury mobile restroom trailers. Pick the package
            that fits your event and reserve your date in seconds.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.name}
              className={cn(
                'relative flex flex-col rounded-3xl border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5',
                pkg.featured
                  ? 'border-gold shadow-lg shadow-gold/10'
                  : 'border-border hover:border-gold/50',
              )}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold tracking-wide text-gold-foreground uppercase">
                  <Crown className="size-3.5" aria-hidden="true" />
                  Most Popular
                </span>
              )}

              <h3 className="font-serif text-xl font-semibold text-balance">{pkg.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pkg.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-serif text-4xl font-semibold text-gold">${pkg.price}</span>
                <span className="text-sm text-muted-foreground">/ event</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm leading-relaxed">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#deposit"
                onClick={() => selectPackage(pkg.name)}
                className={cn(
                  'mt-7 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]',
                  pkg.featured
                    ? 'bg-gold text-gold-foreground'
                    : 'border border-gold/50 text-foreground hover:bg-gold hover:text-gold-foreground',
                )}
              >
                Select {pkg.name.replace('Royal ', '').replace(' Experience', '')}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Deliveries beyond 30 miles may include a small travel fee. Have something custom in mind?{' '}
          <a href="#deposit" className="font-semibold text-gold underline-offset-4 hover:underline">
            Ask about a custom package
          </a>
          .
        </p>
      </div>
    </section>
  )
}
