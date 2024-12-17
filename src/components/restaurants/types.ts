export interface RestaurantFormData {
  website_url: string;
  name: string;
  address: string;
  google_maps_url: string;
  logo_url?: string;
  contact_email: string;
  contact_phone: string;
}

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
  contact_email?: string;
  contact_phone?: string;
  website_url?: string;
}