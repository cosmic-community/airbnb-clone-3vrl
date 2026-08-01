interface PropertySpecsProps {
  maxGuests?: number;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
}

export default function PropertySpecs({ maxGuests, bedrooms, beds, bathrooms }: PropertySpecsProps) {
  const specs: string[] = [];

  if (typeof maxGuests === 'number' && maxGuests > 0) {
    specs.push(`${maxGuests} guest${maxGuests !== 1 ? 's' : ''}`);
  }
  if (typeof bedrooms === 'number' && bedrooms > 0) {
    specs.push(`${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`);
  }
  if (typeof beds === 'number' && beds > 0) {
    specs.push(`${beds} bed${beds !== 1 ? 's' : ''}`);
  }
  if (typeof bathrooms === 'number' && bathrooms > 0) {
    specs.push(`${bathrooms} bathroom${bathrooms !== 1 ? 's' : ''}`);
  }

  if (specs.length === 0) {
    return null;
  }

  return <p className="text-gray-700 text-base">{specs.join(' · ')}</p>;
}