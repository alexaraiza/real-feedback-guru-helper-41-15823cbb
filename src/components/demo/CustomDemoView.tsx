import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RewardsSection } from "./RewardsSection";
import { RestaurantHeader } from "./RestaurantHeader";
import { supabase } from "@/integrations/supabase/client";

interface CustomDemoViewProps {
  slug: string;
}

export const CustomDemoView = ({ slug }: CustomDemoViewProps) => {
  const [preferences, setPreferences] = useState<{
    restaurant_name: string;
    google_maps_url: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        }
      } catch (err) {
        console.error('Error loading demo page:', err);
        setError('Failed to load demo page');
      } finally {
        setIsLoading(false);
      }
    };

    loadDemoPage();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !preferences) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          {error || "Demo page not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <RestaurantHeader
          logoUrl="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
          name={preferences.restaurant_name}
          description="Share your positive dining experience!"
        />
        
        <Card className="mt-8">
          <CardContent className="p-6">
            <RewardsSection 
              rewardCode={null}
              customGoogleMapsUrl={preferences.google_maps_url}
              customRestaurantName={preferences.restaurant_name}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};