export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address: string;
  google_maps_url?: string;
  logo_url?: string;
  cover_photo_url?: string;
  cuisine_type?: string[];
  price_range?: string;
  average_rating?: number;
  restaurant_offers?: RestaurantOffer[];
}

export interface RestaurantOffer {
  id: string;
  title: string;
  description: string;
  discount_value: string;
  valid_until?: string;
}