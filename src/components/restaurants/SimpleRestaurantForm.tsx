import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/utils/urlUtils";
import { OfferFormSection } from "./OfferFormSection";
import { LogoUpload } from "./LogoUpload";
import { RestaurantFormData } from "./types";

export function SimpleRestaurantForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RestaurantFormData>({
    defaultValues: {
      name: "",
      address: "",
      google_maps_url: "",
      logo_url: "",
      offer_title: "",
      offer_description: "",
      offer_discount: "",
    },
  });

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
        <p className="text-muted-foreground">Join our platform and reach more customers</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter restaurant name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter restaurant address" {...field} />
                </FormControl>
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

          <LogoUpload setValue={form.setValue} logoUrl={form.watch("logo_url")} />
          
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