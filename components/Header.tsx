import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏡</span>
          <span className="text-xl font-bold text-coral tracking-tight">Nestly</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-coral transition-colors">
            Explore
          </Link>
          <Link href="/hosts" className="text-sm font-medium text-gray-700 hover:text-coral transition-colors">
            Hosts
          </Link>
        </nav>
      </div>
    </header>
  );
}