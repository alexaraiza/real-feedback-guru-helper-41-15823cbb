import { useState } from "react";
import { useForm } from "react-hook-form";
import { Share2, Save, Globe } from "lucide-react";
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

interface PageCustomizationFormData {
  page_title: string;
  description: string;
  theme_color: string;
  meta_description: string;
}

interface PageCustomizationFormProps {
  restaurantId: string;
  initialData?: PageCustomizationFormData;
}

export function PageCustomizationForm({ restaurantId, initialData }: PageCustomizationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const { toast } = useToast();

  const form = useForm<PageCustomizationFormData>({
    defaultValues: initialData || {
      page_title: "",
      description: "",
      theme_color: "#E94E87",
      meta_description: "",
    },
  });

  const onSubmit = async (data: PageCustomizationFormData) => {
    try {
      setIsSubmitting(true);

      const { error } = await supabase
        .from("restaurant_pages")
        .upsert({
          restaurant_id: restaurantId,
          ...data,
          is_published: isPublished,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page customization saved successfully",
      });
    } catch (error) {
      console.error("Error saving page customization:", error);
      toast({
        title: "Error",
        description: "Failed to save page customization",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async () => {
    setIsPublished(true);
    await form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="page_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter page title" {...field} />
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
                  placeholder="Enter page description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="theme_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme Color</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meta_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter meta description for SEO"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2" />
            Save Draft
          </Button>
          <Button 
            type="button" 
            onClick={handlePublish}
            disabled={isSubmitting}
            variant="secondary"
          >
            <Globe className="mr-2" />
            Publish Page
          </Button>
        </div>
      </form>
    </Form>
  );
}