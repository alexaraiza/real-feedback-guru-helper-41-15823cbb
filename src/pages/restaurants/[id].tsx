import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExampleReviews } from "@/components/ExampleReviews";
import { RestaurantHero } from "@/components/restaurant/RestaurantHero";
import { RestaurantOffers } from "@/components/restaurant/RestaurantOffers";
import { RestaurantNav } from "@/components/navigation/RestaurantNav";

const RestaurantDetail = () => {
  const params = useParams();
  const restaurantId = params.id;
  
  const { data: restaurant, isLoading, error } = useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: async () => {
      if (!restaurantId) {
        throw new Error("No restaurant ID provided");
      }

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
        .eq("id", restaurantId)
        .single();

      if (error) {
        console.error("Error fetching restaurant:", error);
        throw error;
      }

      if (!data) {
        throw new Error("Restaurant not found");
      }

      return data;
    },
    enabled: !!restaurantId,
  });

  if (error) {
    return (
      <>
        <RestaurantNav />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Error Loading Restaurant</h1>
            <p className="mt-2 text-gray-600">
              We couldn't find the restaurant you're looking for.
            </p>
            <Link to="/restaurants" className="mt-4 inline-block">
              <Button variant="default">Browse Restaurants</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <RestaurantNav />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="space-y-8">
            <Skeleton className="h-[400px] w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-2/3" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!restaurant) {
    return (
      <>
        <RestaurantNav />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Restaurant not found</h1>
            <p className="mt-2 text-gray-600">
              The restaurant you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/restaurants" className="mt-4 inline-block">
              <Button variant="default">Browse Restaurants</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <RestaurantNav />
      <div className="container mx-auto px-4 py-8 mt-16">
        <RestaurantHero restaurant={restaurant} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-gray-600">{restaurant.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-gray-600">{restaurant.address}</p>
                      {restaurant.google_maps_url && (
                        <a
                          href={restaurant.google_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline mt-2 inline-block"
                        >
                          View on Google Maps
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Recent Reviews</h2>
              <ExampleReviews />
            </section>
          </div>

          <div className="space-y-8">
            <RestaurantOffers offers={restaurant.restaurant_offers || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDetail;