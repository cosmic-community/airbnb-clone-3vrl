// app/hosts/[slug]/loading.tsx
export default function HostLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white border border-gray-200 rounded-2xl p-8 mb-10">
        <div className="w-28 h-28 bg-gray-200 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-3 w-full">
          <div className="h-6 bg-gray-200 rounded w-40 mx-auto sm:mx-0" />
          <div className="h-4 bg-gray-200 rounded w-full max-w-md" />
          <div className="h-4 bg-gray-200 rounded w-2/3 max-w-md" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-[4/3] bg-gray-200 rounded-2xl" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}