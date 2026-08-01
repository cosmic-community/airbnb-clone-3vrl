export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Nestly. Find your perfect stay.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-500">Explore</span>
          <span className="text-sm text-gray-500">Hosts</span>
          <span className="text-sm text-gray-500">Support</span>
        </div>
      </div>
    </footer>
  );
}