import Link from 'next/link'
import type { Host } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import SuperhostBadge from '@/components/SuperhostBadge'

interface HostCardProps {
  host: Host;
}

export default function HostCard({ host }: HostCardProps) {
  if (!host) return null;

  const photo = host.metadata?.profile_photo;
  const bio = getMetafieldValue(host.metadata?.bio);
  const memberSince = getMetafieldValue(host.metadata?.member_since);
  const isSuperhost = Boolean(host.metadata?.is_superhost);

  return (
    <Link
      href={`/hosts/${host.slug}`}
      className="block bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mx-auto mb-4">
        {photo ? (
          <img
            src={`${photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={host.title}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
        )}
      </div>
      <h3 className="font-semibold text-gray-900">{host.title}</h3>
      {isSuperhost && (
        <div className="mt-2 flex justify-center">
          <SuperhostBadge />
        </div>
      )}
      {memberSince && <p className="text-xs text-gray-400 mt-2">Member since {memberSince}</p>}
      {bio && <p className="text-sm text-gray-500 mt-3 line-clamp-2">{bio}</p>}
    </Link>
  );
}