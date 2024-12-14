import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MapPin, Image as ImageIcon, Store, UtensilsCrossed } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

type OnboardingStep = "details" | "location" | "cuisine" | "photos";

interface RestaurantFormData {
  name: string;
  description: string;
  address: string;
  google_maps_url?: string;
  cuisine_type: string[];
  price_range: string;
  logo_url?: string;
  cover_photo_url?: string;
}

export default function RestaurantOnboard() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<RestaurantFormData>({
    defaultValues: {
      name: "",
      description: "",
      address: "",
      google_maps_url: "",
      cuisine_type: [],
      price_range: "$$",
      logo_url: "",
      cover_photo_url: "",
    },
  });

  const handleFileUpload = async (file: File, type: "logo" | "cover") => {
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

      if (type === "logo") {
        form.setValue("logo_url", publicUrl);
      } else {
        form.setValue("cover_photo_url", publicUrl);
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
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

      const { error } = await supabase.from("restaurants").insert({
        ...data,
        owner_id: user.id,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description:
          "Restaurant submitted successfully! We'll review your submission shortly.",
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

  const renderStep = () => {
    switch (currentStep) {
      case "details":
        return (
          <div className="space-y-4">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your restaurant..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={() => setCurrentStep("location")}
              className="w-full"
            >
              Next
              <MapPin className="ml-2" />
            </Button>
          </div>
        );

      case "location":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full address" {...field} />
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
                  <FormLabel>Google Maps URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Paste Google Maps link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep("details")}
                className="w-full"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setCurrentStep("cuisine")}
                className="w-full"
              >
                Next
                <UtensilsCrossed className="ml-2" />
              </Button>
            </div>
          </div>
        );

      case "cuisine":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cuisine_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Types (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Italian, Pizza, Pasta"
                      value={field.value?.join(", ") || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Range</FormLabel>
                  <FormControl>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      {...field}
                    >
                      <option value="$">$ (Budget-friendly)</option>
                      <option value="$$">$$ (Moderate)</option>
                      <option value="$$$">$$$ (Upscale)</option>
                      <option value="$$$$">$$$$ (Fine Dining)</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep("location")}
                className="w-full"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setCurrentStep("photos")}
                className="w-full"
              >
                Next
                <ImageIcon className="ml-2" />
              </Button>
            </div>
          </div>
        );

      case "photos":
        return (
          <div className="space-y-4">
            <div>
              <FormLabel>Logo</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, "logo");
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
            <div>
              <FormLabel>Cover Photo</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, "cover");
                }}
              />
              {form.watch("cover_photo_url") && (
                <img
                  src={form.watch("cover_photo_url")}
                  alt="Cover preview"
                  className="mt-2 h-40 w-full rounded-md object-cover"
                />
              )}
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep("cuisine")}
                className="w-full"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                onClick={form.handleSubmit(onSubmit)}
              >
                Submit
                <Store className="ml-2" />
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Register Your Restaurant</h1>
        <p className="text-muted-foreground">
          Join our platform and reach more customers
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="flex items-center gap-2">
          {["details", "location", "cuisine", "photos"].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep === step
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              {index < 3 && (
                <div
                  className={`h-0.5 w-8 ${
                    index < ["details", "location", "cuisine", "photos"].indexOf(currentStep)
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-8">{renderStep()}</form>
      </Form>
    </div>
  );
}