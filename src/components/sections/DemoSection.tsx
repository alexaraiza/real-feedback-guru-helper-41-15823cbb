import { useState, useEffect } from "react";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DemoSectionProps {
  onSurveyCall: () => void;
}

export const DemoSection = ({ onSurveyCall }: DemoSectionProps) => {
  const [restaurantName, setRestaurantName] = useState("The Local Kitchen & Bar");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("https://maps.app.goo.gl/Nx23mQHet4TBfctJ6");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDemoPreferences = async () => {
      const { data, error } = await supabase
        .from('demo_preferences')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setRestaurantName(data.restaurant_name);
        setGoogleMapsUrl(data.google_maps_url);
      }
    };

    fetchDemoPreferences();
  }, []);

  const handleSavePreferences = async () => {
    if (!restaurantName.trim() || !googleMapsUrl.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both restaurant name and Google Maps URL.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('demo_preferences')
        .insert({
          restaurant_name: restaurantName,
          google_maps_url: googleMapsUrl,
        });

      if (error) throw error;

      toast({
        title: "Preferences saved!",
        description: "Your demo has been customized successfully.",
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#FFE5ED]/20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text">
          Experience EatUP!
        </h2>

        <div className="mb-8 max-w-xl mx-auto">
          <div className="space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Restaurant Name</Label>
              <Input
                id="restaurantName"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Enter your restaurant name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
              <Input
                id="googleMapsUrl"
                value={googleMapsUrl}
                onChange={(e) => setGoogleMapsUrl(e.target.value)}
                placeholder="Paste your Google Maps link"
              />
            </div>
            <Button 
              onClick={handleSavePreferences}
              disabled={isSaving}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isSaving ? "Saving..." : "Save Demo Preferences"}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="relative">
              <img
                src="/lovable-uploads/f790e463-d057-4fec-b168-02e376930c1c.png"
                alt="Dining experience"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#E94E87]/20 to-transparent rounded-lg" />
            </div>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#E94E87] to-[#F17BA3] text-transparent bg-clip-text">
              Share Your Experience
            </h3>
            <p className="text-muted-foreground">
              Try our innovative review system that makes sharing your dining experience easy and rewarding. 
              Use text or voice to share your feedback and earn rewards from your favorite restaurants.
            </p>
            <Button
              onClick={onSurveyCall}
              className="w-full bg-gradient-to-r from-[#E94E87] to-[#F17BA3] hover:from-[#D13D73] hover:to-[#E94E87] text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Bot className="mr-2 h-5 w-5" />
              Try AI Voice Feedback Demo
            </Button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <ReviewCard
              businessName={restaurantName}
              businessImage="/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
              onTakeAiSurvey={onSurveyCall}
              googleMapsUrl={googleMapsUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};