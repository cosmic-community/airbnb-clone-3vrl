export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    icon_emoji?: string;
    description?: string;
  };
}

export interface Host extends CosmicObject {
  type: 'hosts';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: CosmicImage;
    member_since?: string;
    is_superhost?: boolean;
    response_rate?: string | number;
  };
}

export interface Listing extends CosmicObject {
  type: 'listings';
  metadata: {
    description?: string;
    price_per_night?: number;
    location?: string;
    property_type?: string;
    max_guests?: number;
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
    amenities?: string[];
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    category?: Category;
    host?: Host;
    is_featured?: boolean;
    average_rating?: number;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    guest_name?: string;
    rating?: number;
    comment?: string;
    review_date?: string;
    listing?: Listing;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}