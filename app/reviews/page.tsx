import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ReviewsHero } from '@/components/reviews/reviews-hero'
import { ReviewsGrid } from '@/components/reviews/reviews-grid'
import { ReviewFormSection } from '@/components/reviews/review-form-section'

export const metadata: Metadata = {
  title: 'Reviews',
  description:
    'Read what clients say about Elite Royal Flush luxury portable restrooms for weddings, parties, and corporate events — and share your own experience.',
}

export default function ReviewsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ReviewsHero />
        <ReviewsGrid />
        <ReviewFormSection />
      </main>
      <SiteFooter />

      <a
        href="/#deposit"
        className="fixed inset-x-4 bottom-4 z-40 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-gold-foreground shadow-lg shadow-black/25 sm:hidden"
      >
        Make a Deposit
      </a>
    </>
  )
}
