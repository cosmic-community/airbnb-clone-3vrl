import { createBucketClient } from '@cosmicjs/sdk'
import type { Category, Host, Listing, Review } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getListings(): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    const listings = response.objects as Listing[];

    return listings.sort((a, b) => {
      const featuredDiff = (b.metadata?.is_featured ? 1 : 0) - (a.metadata?.is_featured ? 1 : 0);
      if (featuredDiff !== 0) return featuredDiff;
      return (b.metadata?.average_rating || 0) - (a.metadata?.average_rating || 0);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch listings');
  }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'listings', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    return response.object as Listing;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch listing');
  }
}

export async function getListingsByCategory(categoryId: string): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings', 'metadata.category': categoryId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    return response.objects as Listing[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch listings by category');
  }
}

export async function getListingsByHost(hostId: string): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings', 'metadata.host': hostId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    return response.objects as Listing[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch listings by host');
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch category');
  }
}

export async function getHosts(): Promise<Host[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    return response.objects as Host[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch hosts');
  }
}

export async function getHostBySlug(slug: string): Promise<Host | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'hosts', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    return response.object as Host;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch host');
  }
}

export async function getReviewsForListing(listingId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews', 'metadata.listing': listingId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(0);

    const reviews = response.objects as Review[];

    return reviews.sort((a, b) => {
      const dateA = new Date(a.metadata?.review_date || '').getTime();
      const dateB = new Date(b.metadata?.review_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch reviews');
  }
}