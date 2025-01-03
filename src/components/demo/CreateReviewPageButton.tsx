import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const generateSlug = (baseName: string) => {
  return baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

interface CreateReviewPageButtonProps {
  setGeneratedUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateReviewPageButton = ({ setGeneratedUrl }: CreateReviewPageButtonProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateReviewPage = async () => {
    setIsCreating(true);

    try {
      const savedRestaurantInfo = localStorage.getItem('restaurantInfo');

      if (!savedRestaurantInfo) {
        toast({
          title: "Missing preferences",
          description: "Please set your restaurant preferences first.",
          variant: "destructive",
        });

        return;
      }

      const { restaurantName, googleMapsUrl, contactEmail } = JSON.parse(savedRestaurantInfo);

      if (!restaurantName || !googleMapsUrl) {
        toast({
          title: "Missing preferences",
          description: "Please set your restaurant preferences first.",
          variant: "destructive",
        });

        return;
      }

      const uniqueSlug = generateSlug(restaurantName);

      const { data, error } = await supabase
        .from('demo_pages')
        .insert([
          {
            restaurant_name: restaurantName,
            google_maps_url: googleMapsUrl,
            contact_email: contactEmail,
            slug: uniqueSlug,
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      const fullUrl = `${window.location.origin}/${uniqueSlug}`;
      await navigator.clipboard.writeText(fullUrl);

      toast({
        title: "Review page created!",
        description: "The URL has been copied to your clipboard.",
      });

      if (setGeneratedUrl) {
        setGeneratedUrl(`/${uniqueSlug}`);
      }
    } catch (error) {
      console.error('Error creating review page:', error);

      toast({
        title: "Error",
        description: "Failed to create review page. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button
      onClick={handleCreateReviewPage}
      disabled={isCreating}
      className="w-full"
    >
      {isCreating ? "Creating..." : "Create Review Page"}
      <Link2 className="ml-2 h-4 w-4 md:h-5 md:w-5" />
    </Button>
  );
};