import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RestaurantHeader } from "./RestaurantHeader";
import { ReviewSection } from "./ReviewSection";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface CustomDemoViewProps {
  slug: string;
}

export const CustomDemoView = ({ slug }: CustomDemoViewProps) => {
  const [preferences, setPreferences] = useState<{
    restaurant_name: string;
    google_maps_url: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAiSurvey, setShowAiSurvey] = useState(false);
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
          localStorage.setItem('demoPreferences', JSON.stringify({
            restaurantName: data.restaurant_name,
            googleMapsUrl: data.google_maps_url,
          }));
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error('Error loading demo page:', err);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadDemoPage();
  }, [slug, navigate]);

  const handleTakeAiSurvey = () => {
    setShowAiSurvey(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!preferences) {
    return null;
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
              onTakeAiSurvey={handleTakeAiSurvey}
            />
          </CardContent>
        </Card>

        <div className="mt-12 text-center space-y-4 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-pink-100">
          <h3 className="text-xl font-semibold text-gray-800">
            Have more feedback?
          </h3>
          <p className="text-gray-600">
            Chat with our AI assistant to share additional thoughts about your experience.
          </p>
          <Button
            onClick={handleTakeAiSurvey}
            className="w-full bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#1EAEDB] hover:opacity-90 text-white"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat with EatUP! AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
};