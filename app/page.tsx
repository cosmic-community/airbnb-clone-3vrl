import type { Metadata } from 'next'
import { getListings, getCategories, getMetafieldValue } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import CategoryFilter from '@/components/CategoryFilter'
import ListingGrid from '@/components/ListingGrid'

export const metadata: Metadata = {
  title: 'Nestly - Find your next stay',
  description: 'Discover unique homes and unforgettable stays around the world.',
}

interface HomePageProps {
  searchParams: Promise<{ location?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { location } = await searchParams;
  const [listings, categories] = await Promise.all([getListings(), getCategories()]);

  const filteredListings = location
    ? listings.filter((listing) => {
        const listingLocation = getMetafieldValue(listing.metadata?.location).toLowerCase();
        return listingLocation.includes(location.toLowerCase());
      })
    : listings;

  return (
    <div>
      <Hero />
      <CategoryFilter categories={categories} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {location && (
          <p className="text-gray-500 mb-6">
            Showing results for <span className="font-medium text-gray-900">&quot;{location}&quot;</span>
          </p>
        )}
        <ListingGrid listings={filteredListings} emptyMessage="No stays found matching your search." />
      </section>
    </div>
  );
}