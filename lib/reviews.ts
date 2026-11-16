import 'server-only'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { reviews } from '@/lib/db/schema'

export type Review = {
  id: number
  name: string
  event: string | null
  rating: number
  quote: string
  createdAt: Date
}

export async function getReviews(): Promise<Review[]> {
  return db
    .select({
      id: reviews.id,
      name: reviews.name,
      event: reviews.event,
      rating: reviews.rating,
      quote: reviews.review,
      createdAt: reviews.createdAt,
    })
    .from(reviews)
    .orderBy(desc(reviews.createdAt))
    .limit(100)
}
