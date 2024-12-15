import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, MapPin, DollarSign, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ExampleReviews } from "@/components/ExampleReviews";

const RestaurantDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: restaurant, isLoading, error } = useQuery({
    queryKey: ["restaurant", slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug provided");
      
      console.log("Fetching restaurant with slug:", slug); // Debug log

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
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching restaurant:", error);
        throw error;
      }
      
      console.log("Restaurant data:", data); // Debug log
      
      if (!data) throw new Error("Restaurant not found");
      
      return data;
    },
    enabled: !!slug,
    retry: 1, // Only retry once to avoid too many failed requests
  });

  // Handle error state
  if (error) {
    console.error("Query error:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Error Loading Restaurant</h1>
          <p className="mt-2 text-gray-600">
            We couldn't find the restaurant you're looking for.
          </p>
          <Link to="/" className="mt-4 inline-block">
            <Button variant="default">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Restaurant not found</h1>
          <p className="mt-2 text-gray-600">
            The restaurant you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="mt-4 inline-block">
            <Button variant="default">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Link to="/">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4">
          <Home className="h-6 w-6" />
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
        <img
          src={restaurant.cover_photo_url || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-4">
            <img
              src={restaurant.logo_url || "/placeholder.svg"}
              alt={`${restaurant.name} logo`}
              className="w-20 h-20 rounded-xl border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span>{restaurant.average_rating?.toFixed(1) || "New"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-5 h-5" />
                  <span>{restaurant.price_range || "Not specified"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-gray-600">{restaurant.description}</p>
          </section>

          {/* Location Section */}
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

          {/* Reviews Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Recent Reviews</h2>
            <ExampleReviews />
          </section>
        </div>

        {/* Right Column - Special Offers */}
        <div className="space-y-8">
          {restaurant.restaurant_offers && restaurant.restaurant_offers.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Special Offers</h2>
              <div className="space-y-4">
                {restaurant.restaurant_offers.map((offer) => (
                  <Card key={offer.id}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-semibold">
                          {offer.discount_value}
                        </span>
                        {offer.valid_until && (
                          <span className="text-sm text-gray-500">
                            Valid until{" "}
                            {new Date(offer.valid_until).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;