import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  event: text('event'),
  rating: integer('rating').notNull(),
  review: text('review').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
