export default function HostsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="flex flex-col items-center mb-8">
        <div className="h-6 bg-gray-200 rounded w-56 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-72" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3 text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}