import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useUser } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/utils/urlUtils";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { MessagesSection } from "./sections/MessagesSection";
import { ThemeSection } from "./sections/ThemeSection";
import { ReviewPageFormData } from "./types";
import { PagePreview } from "../preview/PagePreview";

const formSchema = z.object({
  page_title: z.string().min(2, {
    message: "Page title must be at least 2 characters.",
  }),
  welcome_message: z.string().optional(),
  thank_you_message: z.string().optional(),
  theme_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code (e.g., #FF0000)",
  }).default("#E94E87"),
  logo_url: z.string().optional(),
  background_image_url: z.string().optional(),
}) as z.ZodType<ReviewPageFormData>;

export function CreateReviewPageForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = useUser();

  const form = useForm<ReviewPageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme_color: "#E94E87",
    },
  });

  const formValues = form.watch();

  async function onSubmit(values: ReviewPageFormData) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to create a review page.",
      });
      return;
    }

    try {
      const slug = generateSlug(values.page_title);

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

      // Create the restaurant
      const { data: restaurantData, error: restaurantError } = await supabase
        .from("restaurants")
        .insert({
          name: values.page_title,
          status: "pending",
          address: "TBD",
          owner_id: user.id,
          slug: slug,
        })
        .select()
        .single();

      if (restaurantError) throw restaurantError;

      if (!restaurantData?.id) {
        throw new Error("No restaurant ID returned");
      }

      // Create the review page
      const { error: reviewPageError } = await supabase
        .from("review_pages")
        .insert({
          restaurant_id: restaurantData.id,
          page_title: values.page_title,
          welcome_message: values.welcome_message,
          thank_you_message: values.thank_you_message,
          theme_color: values.theme_color,
          logo_url: values.logo_url,
          background_image_url: values.background_image_url,
        });

      if (reviewPageError) throw reviewPageError;

      toast({
        title: "Success!",
        description: "Your review page has been created.",
      });

      navigate(`/restaurants/dashboard`);
    } catch (error) {
      console.error("Error creating review page:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem creating your review page.",
      });
    }
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-center">Please log in to create a review page</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Review Page</h1>
        <p className="text-muted-foreground">
          Customize how your customers will see and interact with your review collection page.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <BasicInfoSection form={form} />
            <MessagesSection form={form} />
            <ThemeSection form={form} />

            <Button type="submit" className="w-full">
              Create Review Page
            </Button>
          </form>
        </Form>

        <div className="sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <PagePreview formData={formValues} />
        </div>
      </div>
    </div>
  );
}