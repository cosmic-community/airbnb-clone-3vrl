import { getMetafieldValue } from '@/lib/cosmic'

interface AmenitiesListProps {
  amenities?: string[];
}

const AMENITY_ICONS: Record<string, string> = {
  wifi: '📶',
  kitchen: '🍳',
  parking: '🚗',
  pool: '🏊',
  'air conditioning': '❄️',
  heating: '🔥',
  tv: '📺',
  washer: '🧺',
  dryer: '🌀',
  'hot tub': '🛁',
  gym: '🏋️',
  workspace: '💻',
  fireplace: '🪵',
  breakfast: '🥐',
};

function getAmenityIcon(amenity: string): string {
  const key = amenity.toLowerCase();
  return AMENITY_ICONS[key] || '✓';
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) {
    return <p className="text-gray-500">No amenities listed.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {amenities.map((amenity, index) => {
        const value = getMetafieldValue(amenity);
        if (!value) return null;
        return (
          <div key={index} className="flex items-center gap-3 text-gray-700">
            <span className="text-xl">{getAmenityIcon(value)}</span>
            <span className="text-sm">{value}</span>
          </div>
        );
      })}
    </div>
  );
}