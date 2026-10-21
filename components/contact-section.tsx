import { Phone, Mail, MapPin } from 'lucide-react'

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: 'Phone',
    value: '442-258-0222',
    href: 'tel:+14422580222',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'EliteRoyalFlush7@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: 'Imperial Valley, Yuma & San Diego',
    note: 'Outside these areas? Contact us — we travel further for your event.',
    wide: true,
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid gap-10 p-8 md:grid-cols-2 md:items-center md:p-12">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">Contact</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-4xl">
              Let&apos;s make your event effortless
            </h2>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
              Have a question or ready to book? Reach out and our team will help you choose the
              right luxury restroom for your occasion.
            </p>
            <a
              href="#deposit"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-base font-semibold text-gold-foreground transition-transform hover:scale-[1.03]"
            >
              Make a Deposit
            </a>
          </div>

          <dl className="grid gap-5 sm:grid-cols-2">
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`min-w-0 rounded-2xl border border-border bg-background p-5 ${item.wide ? 'sm:col-span-2' : ''}`}
              >
                <dt className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <item.icon className="size-4 text-gold" aria-hidden="true" />
                  {item.label}
                </dt>
                <dd className="mt-2 font-medium break-words">
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-gold">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                  {item.note && (
                    <span className="mt-1 block text-sm font-normal leading-relaxed text-muted-foreground">
                      {item.note}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
