export type Package = {
  name: string
  price: number
  tagline: string
  features: string[]
  featured?: boolean
  includesGenerator?: boolean
}

export const PACKAGES: Package[] = [
  {
    name: 'Royal Signature Experience',
    price: 700,
    tagline: 'Our upscale standard trailer, ready for almost any event.',
    features: [
      'Luxury 3-stall restroom trailer (2 Women / 1 Men)',
      'Interior sinks, AC, LED lighting & Bluetooth',
      'Soap, hand towels, toilet paper & seat covers',
      'Delivery up to 30 miles',
      'Setup 2 hours prior to event',
      'Pickup at end of event or next morning',
    ],
  },
  {
    name: 'Royal No-Hookup Experience',
    price: 800,
    tagline: 'Everything in Signature, built for sites without power.',
    includesGenerator: true,
    features: [
      'Everything in Royal Signature Experience, plus:',
      'Generator & fuel included',
      'Best for locations without available power hookup',
      'Delivery up to 30 miles',
      'Setup 2 hours prior to event',
      'Pickup at end of event or next morning',
    ],
  },
  {
    name: 'Royal Wedding Experience',
    price: 1000,
    tagline: 'A white-glove touch for your most important day.',
    featured: true,
    features: [
      'Everything in Royal Signature Experience, plus:',
      'Attendant (4 hours)',
      'Complimentary walkthrough at delivery & pickup',
      'Priority scheduling',
      'Premium event presentation',
    ],
  },
  {
    name: 'Royal Premier Experience',
    price: 1250,
    tagline: 'Our top-tier, fully-appointed luxury package.',
    includesGenerator: true,
    features: [
      'Everything in Royal Wedding Experience, plus:',
      'Extended generator support',
      'Custom décor touch (floral or theme accent)',
      'Complimentary welcome sign with your event name',
      'Premium placement assistance',
      'VIP scheduling',
    ],
  },
]
