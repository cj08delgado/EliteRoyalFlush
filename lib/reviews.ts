export type Review = {
  name: string
  event: string
  location: string
  rating: number
  quote: string
}

export const REVIEWS: Review[] = [
  {
    name: 'Alyssa & Marco',
    event: 'Wedding',
    location: 'El Centro, CA',
    rating: 5,
    quote:
      'Our guests could not stop talking about the restroom trailer. It was spotless all night, and it honestly looked like part of the venue. One less thing to worry about on our big day.',
  },
  {
    name: 'Daniel R.',
    event: 'Corporate Event',
    location: 'San Diego, CA',
    rating: 5,
    quote:
      'Delivered early, set up perfectly, and picked up without us lifting a finger. Communication was clear from the first call. We will be booking again for next year.',
  },
  {
    name: 'Veronica L.',
    event: 'Quinceañera',
    location: 'Yuma, AZ',
    rating: 5,
    quote:
      'Clean, stocked, and so much nicer than we expected. The team was respectful and on time. Our family felt like VIPs.',
  },
  {
    name: 'Chris M.',
    event: 'Backyard Party',
    location: 'Brawley, CA',
    rating: 5,
    quote:
      'Booking with the deposit was simple and the whole process was easy. Having a real restroom outside kept everyone out of the house.',
  },
  {
    name: 'Samantha G.',
    event: 'Birthday Celebration',
    location: 'Imperial, CA',
    rating: 5,
    quote:
      'Elegant, comfortable, and perfectly clean. It made our outdoor celebration feel upscale. Highly recommend Elite Royal Flush.',
  },
  {
    name: 'Jorge T.',
    event: 'Festival',
    location: 'Calexico, CA',
    rating: 4,
    quote:
      'Great units and very reliable service for a busy weekend. Our vendors and guests appreciated having something clean and well-kept.',
  },
  {
    name: 'Monica & Eli',
    event: 'Anniversary Dinner',
    location: 'Holtville, CA',
    rating: 5,
    quote:
      'Everything about the trailer felt high-end, from the lighting to the finishes. It fit our evening perfectly and the team made it effortless.',
  },
]
