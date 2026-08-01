interface StarRatingProps {
  rating: number;
  variant?: 'compact' | 'row';
  className?: string;
}

export default function StarRating({ rating, variant = 'compact', className = '' }: StarRatingProps) {
  const safeRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;

  if (variant === 'row') {
    return (
      <div className={`flex items-center gap-0.5 ${className}`}>
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < Math.round(safeRating);
          return (
            <svg
              key={i}
              className={`w-4 h-4 ${filled ? 'text-coral' : 'text-gray-200'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
      <span className="text-sm font-medium text-gray-900">{safeRating.toFixed(2)}</span>
    </div>
  );
}