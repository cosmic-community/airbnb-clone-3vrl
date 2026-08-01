'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = location.trim();
    if (trimmed) {
      router.push(`/?location=${encodeURIComponent(trimmed)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-coral/10 via-white to-orange-50 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          Find your next getaway
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Unique homes, unforgettable stays — book the perfect place for your trip.
        </p>
        <form
          onSubmit={handleSearch}
          className="mt-8 max-w-xl mx-auto flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2"
        >
          <svg className="w-5 h-5 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search destinations..."
            className="flex-1 px-4 py-2 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
          />
          <button
            type="submit"
            className="bg-coral hover:bg-coral-dark text-white font-medium px-6 py-2.5 rounded-full transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}