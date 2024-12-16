import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ReceiptUploaderProps {
  onReceiptAnalyzed: (data: any) => void;
  isAnalyzing: boolean;
}

export const ReceiptUploader = ({ onReceiptAnalyzed, isAnalyzing }: ReceiptUploaderProps) => {
  const { toast } = useToast();

  const handleReceiptUpload = async (file: File) => {
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('review_photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('review_photos')
        .getPublicUrl(filePath);

      // Analyze receipt
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-receipt', {
        body: { imageUrl: publicUrl },
      });

      if (analysisError) throw analysisError;

      onReceiptAnalyzed(analysisData);
      toast({
        title: "Receipt analyzed!",
        description: "Your receipt has been analyzed and added to your review.",
      });
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Upload failed",
        description: "Failed to analyze receipt. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptUpload(file);
        }}
        className="hidden"
        id="receipt-upload"
      />
      <label htmlFor="receipt-upload" className="cursor-pointer">
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={isAnalyzing}
          className="bg-primary hover:bg-primary/90 text-white border-primary shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isAnalyzing ? (
            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Camera className="w-5 h-5 mr-2" />
          )}
          {isAnalyzing ? "Analyzing Receipt..." : "Add Receipt Photo"}
        </Button>
      </label>
    </div>
  );
};