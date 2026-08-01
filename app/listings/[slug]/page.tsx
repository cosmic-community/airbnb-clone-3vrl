// app/listings/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getListingBySlug, getReviewsForListing, getMetafieldValue } from '@/lib/cosmic'
import ImageGallery from '@/components/ImageGallery'
import PropertySpecs from '@/components/PropertySpecs'
import AmenitiesList from '@/components/AmenitiesList'
import HostProfileCard from '@/components/HostProfileCard'
import ReviewsList from '@/components/ReviewsList'
import StarRating from '@/components/StarRating'

interface ListingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    return { title: 'Listing not found' };
  }

  return {
    title: `${listing.title} - Nestly`,
    description: getMetafieldValue(listing.metadata?.description).slice(0, 160),
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const reviews = await getReviewsForListing(listing.id);

  const location = getMetafieldValue(listing.metadata?.location);
  const propertyType = getMetafieldValue(listing.metadata?.property_type);
  const description = getMetafieldValue(listing.metadata?.description);
  const price = listing.metadata?.price_per_night;
  const rating = listing.metadata?.average_rating;
  const category = listing.metadata?.category;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{listing.title}</h1>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-600">
          {typeof rating === 'number' && rating > 0 && <StarRating rating={rating} variant="compact" />}
          {location && <span>· {location}</span>}
          {category && (
            <Link href={`/categories/${category.slug}`} className="text-coral hover:underline">
              · {getMetafieldValue(category.metadata?.icon_emoji)} {category.title}
            </Link>
          )}
        </div>
      </div>

      <ImageGallery
        featuredImage={listing.metadata?.featured_image}
        gallery={listing.metadata?.gallery}
        title={listing.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="border-b border-gray-100 pb-8">
            {propertyType && <p className="text-lg font-semibold text-gray-900 mb-2">{propertyType}</p>}
            <PropertySpecs
              maxGuests={listing.metadata?.max_guests}
              bedrooms={listing.metadata?.bedrooms}
              beds={listing.metadata?.beds}
              bathrooms={listing.metadata?.bathrooms}
            />
          </div>

          {description && (
            <div className="border-b border-gray-100 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About this place</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          )}

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What this place offers</h2>
            <AmenitiesList amenities={listing.metadata?.amenities} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Guest reviews</h2>
            <ReviewsList reviews={reviews} averageRating={rating} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {typeof price === 'number' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">
                ${price} <span className="text-base font-normal text-gray-500">/ night</span>
              </p>
              {typeof rating === 'number' && rating > 0 && (
                <div className="mt-2">
                  <StarRating rating={rating} variant="compact" />
                </div>
              )}
            </div>
          )}
          <HostProfileCard host={listing.metadata?.host} />
        </div>
      </div>
    </div>
  );
}