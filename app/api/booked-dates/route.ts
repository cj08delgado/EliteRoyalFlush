import { getBookedDates } from '@/lib/bookings'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const dates = await getBookedDates()
    return Response.json({ dates })
  } catch (error) {
    console.error('Failed to load booked dates:', error)
    return Response.json({ error: 'Unable to load availability.' }, { status: 500 })
  }
}
