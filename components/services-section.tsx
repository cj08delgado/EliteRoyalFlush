import { Heart, PartyPopper, Building2, Music, HardHat, GraduationCap } from 'lucide-react'

const SERVICES = [
  {
    icon: Heart,
    title: 'Weddings & Special Events',
    description:
      'Elegant restrooms your guests will actually compliment. A refined finishing touch that matches the beauty of your big day.',
  },
  {
    icon: PartyPopper,
    title: 'Private Parties',
    description:
      'Keep the celebration flowing at home or off-site with clean, comfortable facilities that never feel like an afterthought.',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    description:
      'Impress clients and take care of your team with professional, polished restrooms suited to any company gathering.',
  },
  {
    icon: Music,
    title: 'Festivals & Large Events',
    description:
      'High-capacity, well-maintained units that handle big crowds while keeping the experience premium from open to close.',
  },
  {
    icon: HardHat,
    title: 'Construction & Job Sites',
    description:
      'Reliable, clean facilities that show your crew you care, delivered and serviced on a schedule you can count on.',
  },
  {
    icon: GraduationCap,
    title: 'Graduations & Quinceañeras',
    description:
      'Make milestone moments feel special with upscale restrooms that fit the occasion and keep guests comfortable.',
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-gold uppercase">What We Offer</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-5xl">
          Built for every kind of gathering
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          From intimate weddings to large festivals, Elite Royal Flush brings the same standard of clean,
          comfortable, upscale service to every event.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <article
            key={service.title}
            className="group rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl hover:shadow-black/5"
          >
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/12 text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
              <service.icon className="size-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-serif text-xl font-semibold">{service.title}</h3>
            <p className="mt-2.5 leading-relaxed text-muted-foreground">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
