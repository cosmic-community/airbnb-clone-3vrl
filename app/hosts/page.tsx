import type { Metadata } from 'next'
import { getHosts } from '@/lib/cosmic'
import HostCard from '@/components/HostCard'
import EmptyState from '@/components/EmptyState'

export const metadata: Metadata = {
  title: 'Our Hosts - Nestly',
  description: 'Meet the hosts behind our vacation rental listings.',
}

export default async function HostsPage() {
  const hosts = await getHosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Meet our hosts</h1>
        <p className="text-gray-500 mt-2">The people who make your stay unforgettable.</p>
      </div>
      {hosts.length === 0 ? (
        <EmptyState message="No hosts found." icon="👤" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hosts.map((host) => (
            <HostCard key={host.id} host={host} />
          ))}
        </div>
      )}
    </div>
  );
}