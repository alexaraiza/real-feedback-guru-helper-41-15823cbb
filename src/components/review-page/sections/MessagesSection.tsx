import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ReviewPageFormData } from "../types";

interface MessagesSectionProps {
  form: UseFormReturn<ReviewPageFormData>;
}

export const MessagesSection = ({ form }: MessagesSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Customize Messages</h2>
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
    </div>
  );
};