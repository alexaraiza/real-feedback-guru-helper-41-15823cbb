import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Type } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ReviewPageFormData } from "../types";

interface BasicInfoSectionProps {
  form: UseFormReturn<ReviewPageFormData>;
}

export const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Basic Information</h2>
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
    </div>
  );
};