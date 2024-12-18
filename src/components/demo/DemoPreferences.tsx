import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

interface DemoPreferencesProps {
  onPreferencesSaved: (name: string, url: string, email: string) => void;
}

export const DemoPreferences = ({ onPreferencesSaved }: DemoPreferencesProps) => {
  const [restaurantName, setRestaurantName] = useState("The Local Kitchen & Bar");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("https://maps.app.goo.gl/Nx23mQHet4TBfctJ6");
  const [contactEmail, setContactEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load preferences from local storage on component mount
    const savedPreferences = localStorage.getItem('demoPreferences');
    if (savedPreferences) {
      const { restaurantName: savedName, googleMapsUrl: savedUrl, contactEmail: savedEmail } = JSON.parse(savedPreferences);
      setRestaurantName(savedName);
      setGoogleMapsUrl(savedUrl);
      setContactEmail(savedEmail || '');
      onPreferencesSaved(savedName, savedUrl, savedEmail || '');
    }
  }, [onPreferencesSaved]);

  const handleSavePreferences = () => {
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
      // Save to local storage
      localStorage.setItem('demoPreferences', JSON.stringify({
        restaurantName,
        googleMapsUrl,
        contactEmail,
      }));

      onPreferencesSaved(restaurantName, googleMapsUrl, contactEmail);
      setShowSuccess(true);
      toast({
        title: "Preferences saved!",
        description: "Your demo has been customized successfully.",
      });

      // Reset success state after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
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
      <div className="space-y-2">
        <Label htmlFor="contactEmail">Contact Email</Label>
        <Input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="Enter restaurant contact email"
        />
      </div>
      <Button 
        onClick={handleSavePreferences}
        disabled={isSaving}
        className={`w-full transition-all duration-300 ${
          showSuccess 
            ? "bg-green-500 hover:bg-green-600" 
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {showSuccess ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Saved Successfully!
          </>
        ) : isSaving ? (
          "Saving..."
        ) : (
          "Save Demo Preferences"
        )}
      </Button>
    </div>
  );
};