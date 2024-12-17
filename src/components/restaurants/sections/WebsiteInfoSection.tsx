import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RestaurantFormData } from "../types";

interface WebsiteInfoSectionProps {
  form: UseFormReturn<RestaurantFormData>;
  onCrawl: () => Promise<void>;
  isCrawling: boolean;
}

export const WebsiteInfoSection = ({ form, onCrawl, isCrawling }: WebsiteInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="website_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Restaurant Website URL</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input placeholder="https://your-restaurant.com" {...field} />
              </FormControl>
              <Button
                type="button"
                onClick={onCrawl}
                disabled={isCrawling}
                variant="outline"
              >
                {isCrawling ? "Loading..." : "Auto-fill"}
                <Globe className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="google_maps_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Google Maps URL</FormLabel>
            <FormControl>
              <Input placeholder="Paste your Google Maps link" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};