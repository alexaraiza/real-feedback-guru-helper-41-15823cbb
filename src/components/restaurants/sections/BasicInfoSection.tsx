import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { RestaurantFormData } from "../types";
import { LogoUpload } from "../LogoUpload";

interface BasicInfoSectionProps {
  form: UseFormReturn<RestaurantFormData>;
}

export const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
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

      <LogoUpload setValue={form.setValue} logoUrl={form.watch("logo_url")} />
    </div>
  );
};