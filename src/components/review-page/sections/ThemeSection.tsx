import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Palette } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ReviewPageFormData } from "../types";
import { LogoUpload } from "@/components/restaurants/LogoUpload";

interface ThemeSectionProps {
  form: UseFormReturn<ReviewPageFormData>;
}

export const ThemeSection = ({ form }: ThemeSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Customize Theme</h2>
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
                setValue={form.setValue}
                logoUrl={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};