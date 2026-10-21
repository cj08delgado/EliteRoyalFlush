'use client'

import { useEffect, useState } from 'react'
import { Crown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Availability', href: '#availability' },
  { label: 'Why Us', href: '#why' },
  { label: 'How It Works', href: '#how' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <a
          href="#top"
          className={cn(
            'flex items-center gap-2.5 transition-colors',
            scrolled ? 'text-foreground' : 'text-background',
          )}
        >
          <Crown className="size-6 text-gold md:size-7" aria-hidden="true" />
          <span className="font-serif text-lg font-semibold tracking-wide md:text-xl">
            Elite Royal Flush
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium tracking-wide transition-colors hover:text-gold',
                scrolled ? 'text-muted-foreground' : 'text-background/80',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#deposit"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Make a Deposit
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden',
              scrolled ? 'text-foreground hover:bg-muted' : 'text-background hover:bg-background/10',
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/50 py-3.5 text-base font-medium text-foreground last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#deposit"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground"
            >
              Make a Deposit
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
