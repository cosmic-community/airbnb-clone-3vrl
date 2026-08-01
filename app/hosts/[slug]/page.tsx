// app/hosts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getHostBySlug, getListingsByHost, getMetafieldValue } from '@/lib/cosmic'
import ListingGrid from '@/components/ListingGrid'
import SuperhostBadge from '@/components/SuperhostBadge'

interface HostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: HostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const host = await getHostBySlug(slug);

  if (!host) {
    return { title: 'Host not found' };
  }

  return {
    title: `${host.title} - Host on Nestly`,
    description: getMetafieldValue(host.metadata?.bio).slice(0, 160),
  };
}

export default async function HostPage({ params }: HostPageProps) {
  const { slug } = await params;
  const host = await getHostBySlug(slug);

  if (!host) {
    notFound();
  }

  const listings = await getListingsByHost(host.id);
  const photo = host.metadata?.profile_photo;
  const bio = getMetafieldValue(host.metadata?.bio);
  const memberSince = getMetafieldValue(host.metadata?.member_since);
  const responseRateRaw = getMetafieldValue(host.metadata?.response_rate);
  const responseRate = responseRateRaw
    ? (responseRateRaw.includes('%') ? responseRateRaw : `${responseRateRaw}%`)
    : '';
  const isSuperhost = Boolean(host.metadata?.is_superhost);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white border border-gray-200 rounded-2xl p-8 mb-10">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {photo ? (
            <img
              src={`${photo.imgix_url}?w=280&h=280&fit=crop&auto=format,compress`}
              alt={host.title}
              width={140}
              height={140}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>
          )}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900">{host.title}</h1>
          {isSuperhost && (
            <div className="mt-2 flex justify-center sm:justify-start">
              <SuperhostBadge />
            </div>
          )}
          <div className="flex flex-wrap gap-6 mt-4 justify-center sm:justify-start">
            {memberSince && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Member since</p>
                <p className="font-medium text-gray-900">{memberSince}</p>
              </div>
            )}
            {responseRate && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Response rate</p>
                <p className="font-medium text-gray-900">{responseRate}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Listings</p>
              <p className="font-medium text-gray-900">{listings.length}</p>
            </div>
          </div>
          {bio && <p className="text-gray-600 mt-4 leading-relaxed max-w-xl">{bio}</p>}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-4">{host.title}&apos;s listings</h2>
      <ListingGrid listings={listings} emptyMessage="This host has no active listings." />
    </div>
  );
}