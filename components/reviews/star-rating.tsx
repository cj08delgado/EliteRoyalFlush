import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1', className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn('size-4', i < Math.round(rating) ? 'fill-gold text-gold' : 'text-gold/30')}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
