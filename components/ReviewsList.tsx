import type { Review } from '@/types'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'

interface ReviewsListProps {
  reviews: Review[];
  averageRating?: number;
}

export default function ReviewsList({ reviews, averageRating }: ReviewsListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-6">
        <p className="text-gray-500">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <StarRating rating={averageRating || 0} variant="compact" />
        <span className="text-gray-500">
          · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}