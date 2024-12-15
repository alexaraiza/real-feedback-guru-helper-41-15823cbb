import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Building2, MapPin } from "lucide-react";
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
import { generateSlug } from "@/utils/urlUtils";

interface VdaFormData {
  name: string;
  address: string;
  contact_email: string;
  phone: string;
  additional_notes: string;
}

export function VdaRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<VdaFormData>({
    defaultValues: {
      name: "",
      address: "",
      contact_email: "",
      phone: "",
      additional_notes: "",
    },
  });

  const onSubmit = async (data: VdaFormData) => {
    try {
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to register for VDA",
          variant: "destructive",
        });
        return;
      }

      const slug = generateSlug(data.name);

      const { error: restaurantError } = await supabase
        .from("restaurants")
        .insert({
          name: data.name,
          address: data.address,
          owner_id: user.id,
          status: "vda_pending",
          slug: slug,
        });

      if (restaurantError) throw restaurantError;

      toast({
        title: "Success",
        description: "Your VDA registration has been submitted. We'll contact you shortly.",
      });

      navigate("/restaurants/dashboard");
    } catch (error) {
      console.error("Error registering for VDA:", error);
      toast({
        title: "Error",
        description: "Failed to submit VDA registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Register for VDA</h1>
        <p className="text-muted-foreground">
          Join our Verified Dining Audit program and showcase your commitment to excellence
        </p>
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
            name="contact_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter contact email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additional_notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any additional information you'd like to share"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            Submit VDA Registration
            <Building2 className="ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
}