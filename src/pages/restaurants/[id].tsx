import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RestaurantHero } from "@/components/restaurant/RestaurantHero";
import { RestaurantOffers } from "@/components/restaurant/RestaurantOffers";
import { Restaurant } from "@/components/restaurant/types";
import { toast } from "@/hooks/use-toast";

export default function RestaurantDetails() {
  const { id } = useParams();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      if (!id) throw new Error("Restaurant ID is required");
      
      const { data, error } = await supabase
        .from("restaurants")
        .select(`
          *,
          restaurant_offers (
            id,
            title,
            description,
            discount_value,
            valid_until
          )
        `)
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Error fetching restaurant details",
          variant: "destructive",
        });
        throw error;
      }

      return data as Restaurant;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Restaurant not found</h1>
          <p className="text-gray-600">The restaurant you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantHero restaurant={restaurant} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {restaurant.description && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-gray-600">{restaurant.description}</p>
            </section>
          )}
          {restaurant.restaurant_offers && (
            <RestaurantOffers offers={restaurant.restaurant_offers} />
          )}
        </div>
      </main>
    </div>
  );
}