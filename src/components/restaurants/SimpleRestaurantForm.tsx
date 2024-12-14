import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MapPin, Image as ImageIcon } from "lucide-react";
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

interface RestaurantFormData {
  name: string;
  google_maps_url: string;
  logo_url?: string;
  offer_title: string;
  offer_description: string;
  offer_discount: string;
}

export function SimpleRestaurantForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RestaurantFormData>({
    defaultValues: {
      name: "",
      google_maps_url: "",
      logo_url: "",
      offer_title: "",
      offer_description: "",
      offer_discount: "",
    },
  });

  const handleLogoUpload = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("restaurant_photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("restaurant_photos").getPublicUrl(filePath);

      form.setValue("logo_url", publicUrl);

      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload logo. Please try again.",
        variant: "destructive",
      });
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

      // Insert restaurant
      const { data: restaurant, error: restaurantError } = await supabase
        .from("restaurants")
        .insert({
          name: data.name,
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

      navigate("/restaurants");
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

          <div>
            <FormLabel>Restaurant Logo</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleLogoUpload(file);
              }}
            />
            {form.watch("logo_url") && (
              <img
                src={form.watch("logo_url")}
                alt="Logo preview"
                className="mt-2 h-24 w-24 rounded-full object-cover"
              />
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Review Offer</h2>
            <FormField
              control={form.control}
              name="offer_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Free Dessert" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offer_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offer Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., One free dessert per table" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offer_discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Value</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 20% OFF or Free Dessert" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Submit Restaurant
            <MapPin className="ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
}