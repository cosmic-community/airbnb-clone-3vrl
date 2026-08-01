import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          if (!category) return null;
          const icon = getMetafieldValue(category.metadata?.icon_emoji) || '🏠';
          const name = category.title || getMetafieldValue(category.metadata?.name);

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-2xl border border-gray-200 hover:border-gray-900 hover:shadow-sm transition-all min-w-[88px]"
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}