// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCategoryBySlug, getListingsByCategory, getMetafieldValue } from '@/lib/cosmic'
import ListingGrid from '@/components/ListingGrid'

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category not found' };
  }

  return {
    title: `${category.title} stays - Nestly`,
    description: getMetafieldValue(category.metadata?.description).slice(0, 160),
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const listings = await getListingsByCategory(category.id);
  const icon = getMetafieldValue(category.metadata?.icon_emoji) || '🏠';
  const description = getMetafieldValue(category.metadata?.description);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center">
        <span className="text-4xl">{icon}</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">{category.title} stays</h1>
        {description && <p className="text-gray-500 mt-2 max-w-xl mx-auto">{description}</p>}
      </div>
      <ListingGrid listings={listings} emptyMessage="No listings in this category yet." />
    </div>
  );
}