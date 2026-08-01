import Link from 'next/link'
import type { Listing } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  if (!listing) return null;

  const image = listing.metadata?.featured_image;
  const location = getMetafieldValue(listing.metadata?.location);
  const propertyType = getMetafieldValue(listing.metadata?.property_type);
  const price = listing.metadata?.price_per_night;
  const rating = listing.metadata?.average_rating;
  const isFeatured = Boolean(listing.metadata?.is_featured);

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={listing.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
        {isFeatured && (
          <span className="absolute top-3 left-3 bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            ✨ Featured
          </span>
        )}
      </div>
      <div className="p-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 truncate">{listing.title}</h3>
          {typeof rating === 'number' && rating > 0 && (
            <StarRating rating={rating} variant="compact" className="flex-shrink-0" />
          )}
        </div>
        {location && <p className="text-sm text-gray-500 truncate">{location}</p>}
        {propertyType && <p className="text-sm text-gray-500">{propertyType}</p>}
        {typeof price === 'number' && (
          <p className="pt-1">
            <span className="font-semibold text-gray-900">${price}</span>
            <span className="text-gray-500 text-sm"> night</span>
          </p>
        )}
      </div>
    </Link>
  );
}