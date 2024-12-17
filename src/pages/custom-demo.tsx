import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DemoPage from "./demo";
import { useToast } from "@/hooks/use-toast";

const CustomDemoPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDemoPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from('demo_pages')
          .select('restaurant_name, google_maps_url')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          throw new Error('Demo page not found');
        }

        // Set preferences in localStorage
        localStorage.setItem('demoRestaurantName', data.restaurant_name);
        localStorage.setItem('demoGoogleMapsUrl', data.google_maps_url);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading demo:', error);
        toast({
          title: "Error",
          description: "Demo page not found.",
          variant: "destructive",
        });
        navigate('/demo');
      }
    };

    loadDemoPreferences();
  }, [slug, navigate, toast]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <DemoPage />;
};

export default CustomDemoPage;