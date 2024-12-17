import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MapPin, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/utils/urlUtils";
import { OfferFormSection } from "./OfferFormSection";
import { RestaurantFormData } from "./types";
import { FirecrawlService } from "@/utils/FirecrawlService";
import { WebsiteInfoSection } from "./sections/WebsiteInfoSection";
import { BasicInfoSection } from "./sections/BasicInfoSection";

export function SimpleRestaurantForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RestaurantFormData>({
    defaultValues: {
      website_url: "",
      name: "",
      address: "",
      google_maps_url: "",
      logo_url: "",
      offer_title: "",
      offer_description: "",
      offer_discount: "",
    },
  });

  const handleWebsiteCrawl = async () => {
    const websiteUrl = form.getValues("website_url");
    if (!websiteUrl) {
      toast({
        title: "Error",
        description: "Please enter a website URL",
        variant: "destructive",
      });
      return;
    }

    setIsCrawling(true);
    try {
      const result = await FirecrawlService.crawlRestaurantWebsite(websiteUrl);
      
      if (result.success && result.data) {
        form.setValue("name", result.data.name);
        form.setValue("address", result.data.address);
        
        toast({
          title: "Success",
          description: "Restaurant information retrieved successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to retrieve restaurant information",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error crawling website:", error);
      toast({
        title: "Error",
        description: "Failed to retrieve restaurant information",
        variant: "destructive",
      });
    } finally {
      setIsCrawling(false);
    }
  };

  const onSubmit = async (data: RestaurantFormData) => {
    try {
      setIsSubmitting(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a restaurant",
          variant: "destructive",
        });
        return;
      }

      const slug = generateSlug(data.name);

      // Check if slug already exists
      const { data: existingRestaurant } = await supabase
        .from("restaurants")
        .select("id")
        .eq("slug", slug)
        .single();

      if (existingRestaurant) {
        toast({
          title: "Error",
          description: "A restaurant with this name already exists. Please choose a different name.",
          variant: "destructive",
        });
        return;
      }

      // Insert restaurant
      const { data: restaurant, error: restaurantError } = await supabase
        .from("restaurants")
        .insert({
          name: data.name,
          address: data.address,
          google_maps_url: data.google_maps_url,
          logo_url: data.logo_url,
          owner_id: user.id,
          status: "pending",
          slug: slug,
        })
        .select()
        .single();

      if (restaurantError) throw restaurantError;

      // Insert offer
      const { error: offerError } = await supabase.from("restaurant_offers").insert({
        restaurant_id: restaurant.id,
        title: data.offer_title,
        description: data.offer_description,
        discount_value: data.offer_discount,
        status: "active",
      });

      if (offerError) throw offerError;

      toast({
        title: "Success",
        description: "Restaurant submitted successfully! We'll review your submission shortly.",
      });

      navigate(`/restaurants/${slug}`);
    } catch (error) {
      console.error("Error creating restaurant:", error);
      toast({
        title: "Error",
        description: "Failed to create restaurant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Register Your Restaurant</h1>
        <p className="text-muted-foreground">Join EatUP! and reach more customers</p>
      </div>

      <div className="mb-8 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Globe className="h-5 w-5" />
          <p>Enter your restaurant's website URL and we'll automatically fetch your information!</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <WebsiteInfoSection 
            form={form} 
            onCrawl={handleWebsiteCrawl}
            isCrawling={isCrawling}
          />
          
          <BasicInfoSection form={form} />
          
          <OfferFormSection form={form} />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Submit Restaurant
            <MapPin className="ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
}