import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RestaurantFormData } from "./types";

interface OfferFormSectionProps {
  form: UseFormReturn<RestaurantFormData>;
}

export const OfferFormSection = ({ form }: OfferFormSectionProps) => {
  return (
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
  );
};