'use server'

import { randomUUID } from 'node:crypto'
import { getBookedDates } from '@/lib/bookings'
import { PACKAGES } from '@/lib/packages'
import { DEPOSIT_AMOUNT_CENTS, stripe } from '@/lib/stripe'

export type DepositDetails = {
  packageName: string
  name: string
  phone: string
  email: string
  eventDate: string
  eventType: string
  location: string
  guests: string
  electricity: string
  details: string
}

const clean = (value: unknown, max = 200) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export async function startDepositCheckout(input: DepositDetails) {
  const packageName = clean(input.packageName)
  const selectedPackage = PACKAGES.find((pkg) => pkg.name === packageName)
  if (packageName && !selectedPackage) throw new Error('Unknown package selected.')

  const name = clean(input.name, 100)
  const phone = clean(input.phone, 30)
  const email = clean(input.email, 254)
  const eventDate = clean(input.eventDate, 10)
  const eventType = clean(input.eventType, 60)
  const location = clean(input.location, 300)

  if (!name || !phone || !eventDate || !eventType || !location) {
    throw new Error('Please fill in all required fields.')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Please enter a valid email.')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) throw new Error('Please enter a valid event date.')

  const bookedDates = await getBookedDates()
  if (bookedDates.includes(eventDate)) {
    throw new Error('Sorry, that date is already booked. Please choose another date.')
  }

  const guests = clean(input.guests, 6).replace(/\D/g, '')
  const electricity = selectedPackage?.includesGenerator ? 'N/A (generator included)' : clean(input.electricity, 20)

  const session = await stripe.checkout.sessions.create(
    {
      ui_mode: 'embedded_page',
      redirect_on_completion: 'never',
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: DEPOSIT_AMOUNT_CENTS,
            product_data: {
              name: 'Booking Deposit',
              description: `${selectedPackage?.name ?? 'Package to be decided'} — event on ${eventDate}`,
            },
          },
        },
      ],
      metadata: {
        package: selectedPackage ? `${selectedPackage.name} ($${selectedPackage.price})` : 'Undecided',
        name,
        phone,
        eventDate,
        eventType,
        location,
        guests: guests || 'Not specified',
        electricity: electricity || 'Not specified',
        details: clean(input.details, 500) || 'None',
      },
    },
    { idempotencyKey: randomUUID() },
  )

  if (!session.client_secret) throw new Error('Unable to start checkout.')
  return session.client_secret
}
