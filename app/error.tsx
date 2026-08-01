'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <span className="text-4xl mb-4">😕</span>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-6">We couldn&apos;t load this page. Please try again.</p>
      <button
        onClick={() => reset()}
        className="bg-coral hover:bg-coral-dark text-white font-medium px-6 py-2.5 rounded-full transition-colors"
      >
        Try again
      </button>
    </div>
  );
}