import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Palette, Type, MessageSquare } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogoUpload } from "../restaurants/LogoUpload";

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
});

export function CreateReviewPageForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme_color: "#E94E87",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data: restaurantData, error: restaurantError } = await supabase
        .from("restaurants")
        .insert([
          {
            name: values.page_title,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (restaurantError) throw restaurantError;

      const { error: reviewPageError } = await supabase
        .from("review_pages")
        .insert([
          {
            restaurant_id: restaurantData.id,
            ...values,
          },
        ]);

      if (reviewPageError) throw reviewPageError;

      toast({
        title: "Success!",
        description: "Your review page has been created.",
      });

      navigate(`/review/${restaurantData.id}`);
    } catch (error) {
      console.error("Error creating review page:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem creating your review page.",
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Review Page</h1>
        <p className="text-muted-foreground">
          Customize how your customers will see and interact with your review collection page.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="page_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Title</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Type className="w-4 h-4 mt-3" />
                    <Input placeholder="Enter your business name" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="welcome_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Welcome Message</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <MessageSquare className="w-4 h-4 mt-3" />
                    <Textarea
                      placeholder="Welcome message for your customers"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thank_you_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thank You Message</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <MessageSquare className="w-4 h-4 mt-3" />
                    <Textarea
                      placeholder="Thank you message after review submission"
                      {...field}
                    />
                  </div>
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
                  <div className="flex gap-2">
                    <Palette className="w-4 h-4 mt-3" />
                    <Input type="color" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <LogoUpload
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Review Page
          </Button>
        </form>
      </Form>
    </div>
  );
}