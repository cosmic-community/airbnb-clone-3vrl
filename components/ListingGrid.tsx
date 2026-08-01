import type { Listing } from '@/types'
import ListingCard from '@/components/ListingCard'
import EmptyState from '@/components/EmptyState'

interface ListingGridProps {
  listings: Listing[];
  emptyMessage?: string;
}

export default function ListingGrid({ listings, emptyMessage }: ListingGridProps) {
  if (!listings || listings.length === 0) {
    return <EmptyState message={emptyMessage || 'No listings found.'} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}