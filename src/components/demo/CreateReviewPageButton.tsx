import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CreateReviewPageButtonProps {
  setGeneratedUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateReviewPageButton = ({ setGeneratedUrl }: CreateReviewPageButtonProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateReviewPage = async () => {
    setIsCreating(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoRestaurantName = "demo-restaurant";
      setGeneratedUrl(demoRestaurantName);
      
      toast({
        title: "Success!",
        description: "Your review page has been created.",
      });
    } catch (error) {
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
    </Button>
  );
};