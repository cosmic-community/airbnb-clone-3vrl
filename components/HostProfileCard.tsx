import Link from 'next/link'
import type { Host } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import SuperhostBadge from '@/components/SuperhostBadge'

interface HostProfileCardProps {
  host?: Host;
}

export default function HostProfileCard({ host }: HostProfileCardProps) {
  if (!host) {
    return null;
  }

  const photo = host.metadata?.profile_photo;
  const bio = getMetafieldValue(host.metadata?.bio);
  const memberSince = getMetafieldValue(host.metadata?.member_since);
  const responseRateRaw = getMetafieldValue(host.metadata?.response_rate);
  const responseRate = responseRateRaw
    ? (responseRateRaw.includes('%') ? responseRateRaw : `${responseRateRaw}%`)
    : '';
  const isSuperhost = Boolean(host.metadata?.is_superhost);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <Link href={`/hosts/${host.slug}`} className="flex items-center gap-4 group">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {photo ? (
            <img
              src={`${photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={host.title}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900 group-hover:text-coral transition-colors">
            Hosted by {host.title}
          </p>
          {isSuperhost && (
            <div className="mt-1">
              <SuperhostBadge />
            </div>
          )}
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
        {memberSince && (
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Member since</p>
            <p className="font-medium text-gray-900">{memberSince}</p>
          </div>
        )}
        {responseRate && (
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Response rate</p>
            <p className="font-medium text-gray-900">{responseRate}</p>
          </div>
        )}
      </div>

      {bio && <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>}

      <Link
        href={`/hosts/${host.slug}`}
        className="inline-block text-sm font-medium text-coral hover:text-coral-dark"
      >
        View profile →
      </Link>
    </div>
  );
}