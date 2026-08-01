import type { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  if (!review) return null;

  const guestName = getMetafieldValue(review.metadata?.guest_name) || 'Guest';
  const comment = getMetafieldValue(review.metadata?.comment);
  const rating = review.metadata?.rating || 0;
  const reviewDate = review.metadata?.review_date;

  const formattedDate = reviewDate
    ? new Date(reviewDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-coral/10 text-coral font-semibold flex items-center justify-center flex-shrink-0">
          {guestName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-gray-900">{guestName}</p>
          {formattedDate && <p className="text-xs text-gray-400">{formattedDate}</p>}
        </div>
      </div>
      <StarRating rating={rating} variant="row" />
      {comment && <p className="text-gray-600 text-sm leading-relaxed">{comment}</p>}
    </div>
  );
}