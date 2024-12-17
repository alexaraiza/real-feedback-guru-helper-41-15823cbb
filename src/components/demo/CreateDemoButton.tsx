import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const generateUniqueSlug = (baseName: string) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${timestamp}-${randomString}`;
};

export const CreateDemoButton = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateCustomDemo = async () => {
    try {
      setIsCreating(true);
      const savedPreferences = localStorage.getItem('demoPreferences');
      
      if (!savedPreferences) {
        toast({
          title: "Missing preferences",
          description: "Please set your restaurant preferences first.",
          variant: "destructive",
        });
        return;
      }

      const { restaurantName, googleMapsUrl } = JSON.parse(savedPreferences);
      if (!restaurantName || !googleMapsUrl) {
        toast({
          title: "Missing preferences",
          description: "Please set your restaurant preferences first.",
          variant: "destructive",
        });
        return;
      }

      const uniqueSlug = generateUniqueSlug(restaurantName);

      const { data, error } = await supabase
        .from('demo_pages')
        .insert([
          {
            restaurant_name: restaurantName,
            google_maps_url: googleMapsUrl,
            slug: uniqueSlug
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Copy the URL to clipboard
      const demoUrl = `${window.location.origin}/demo/${uniqueSlug}`;
      await navigator.clipboard.writeText(demoUrl);

      toast({
        title: "Demo page created!",
        description: "The URL has been copied to your clipboard.",
      });

    } catch (error) {
      console.error('Error creating demo:', error);
      toast({
        title: "Error",
        description: "Failed to create demo page. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="mt-8 text-center">
      <Button
        onClick={handleCreateCustomDemo}
        disabled={isCreating}
        className="bg-primary hover:bg-primary/90 text-white font-semibold"
      >
        {isCreating ? "Creating..." : "Create Custom Demo Page"}
        <Link2 className="ml-2 h-4 w-4" />
      </Button>
      <p className="text-sm text-muted-foreground mt-2">
        Create a unique demo page with your restaurant's details
      </p>
    </div>
  );
};