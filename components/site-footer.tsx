import { Crown } from 'lucide-react'

const FOOTER_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Availability', href: '#availability' },
  { label: 'Why Us', href: '#why' },
  { label: 'How It Works', href: '#how' },
  { label: 'Make a Deposit', href: '#deposit' },
  { label: 'Contact', href: '#contact' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Crown className="size-6 text-gold" aria-hidden="true" />
              <span className="font-serif text-xl font-semibold tracking-wide">Elite Royal Flush</span>
            </div>
            <p className="mt-4 leading-relaxed text-primary-foreground/65">
              Luxury restrooms, wherever you celebrate. Premium portable restroom solutions for
              events, businesses, and special occasions.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/70 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Elite Royal Flush. All rights reserved.</p>
          <p>Premium event sanitation you can trust.</p>
        </div>
      </div>
    </footer>
  )
}
