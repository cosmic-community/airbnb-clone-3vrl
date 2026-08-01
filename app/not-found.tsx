import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <span className="text-5xl mb-4">🏝️</span>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page not found</h2>
      <p className="text-gray-500 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="bg-coral hover:bg-coral-dark text-white font-medium px-6 py-2.5 rounded-full transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}