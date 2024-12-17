import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RestaurantHeader } from "./RestaurantHeader";
import { ReviewSection } from "./ReviewSection";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface CustomDemoViewProps {
  slug: string;
}

export const CustomDemoView = ({ slug }: CustomDemoViewProps) => {
  const [preferences, setPreferences] = useState<{
    restaurant_name: string;
    google_maps_url: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDemoPage = async () => {
      try {
        const { data, error } = await supabase
          .from('demo_pages')
          .select('restaurant_name, google_maps_url')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        if (data) {
          setPreferences(data);
          // Save to localStorage for components that rely on it
          localStorage.setItem('demoPreferences', JSON.stringify({
            restaurantName: data.restaurant_name,
            googleMapsUrl: data.google_maps_url,
          }));
        } else {
          // If no data found, redirect to home
          navigate('/');
        }
      } catch (err) {
        console.error('Error loading demo page:', err);
        // On error, redirect to home
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadDemoPage();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!preferences) {
    return null; // This will never render as we redirect on error/no data
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <RestaurantHeader
          name={preferences.restaurant_name}
          isCustomDemo={true}
        />
        
        <Card className="mt-8">
          <CardContent className="p-6">
            <ReviewSection 
              customRestaurantName={preferences.restaurant_name}
              customGoogleMapsUrl={preferences.google_maps_url}
              hidePreferences={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};