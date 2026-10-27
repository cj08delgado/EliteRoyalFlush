import 'server-only'
import { stripe } from '@/lib/stripe'

const MAX_SESSIONS_SCANNED = 1000

/** Event dates ("YYYY-MM-DD") that already have a paid deposit in Stripe. */
export async function getBookedDates(): Promise<string[]> {
  const booked = new Set<string>()
  const sessions = stripe.checkout.sessions.list({ status: 'complete', limit: 100 })

  let scanned = 0
  for await (const session of sessions) {
    if (++scanned > MAX_SESSIONS_SCANNED) break
    const eventDate = session.metadata?.eventDate
    if (session.payment_status === 'paid' && eventDate && /^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
      booked.add(eventDate)
    }
  }

  return [...booked].sort()
}
