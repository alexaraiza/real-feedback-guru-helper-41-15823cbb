import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ReviewInputProps {
  review: string;
  onChange: (value: string) => void;
  businessName: string;
  businessImage?: string;
  onPhotoUpload?: (url: string) => void;
}

export const ReviewInput = ({ 
  review, 
  onChange, 
  businessName, 
  businessImage,
  onPhotoUpload 
}: ReviewInputProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Create a File object from the uploaded file
      const fileData = new File([file], fileName, { type: file.type });

      // Upload to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('review_photos')
        .upload(filePath, fileData);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('review_photos')
        .getPublicUrl(filePath);

      setPreviewUrl(publicUrl);
      if (onPhotoUpload) onPhotoUpload(publicUrl);

      toast({
        title: "Photo uploaded!",
        description: "Your photo has been successfully uploaded.",
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = () => {
    setPreviewUrl(null);
    if (onPhotoUpload) onPhotoUpload('');
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // Limit to 500 characters
    if (value.length <= 500) {
      onChange(value);
    } else {
      toast({
        title: "Character limit reached",
        description: "Reviews are limited to 500 characters.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        {businessImage && (
          <img
            src={businessImage}
            alt={businessName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/10 shadow-lg"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold text-secondary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {businessName}
          </h2>
          <p className="text-muted-foreground">Share your positive dining experience!</p>
        </div>
      </div>

      <Textarea
        value={review}
        onChange={handleReviewChange}
        placeholder="What did you love about your visit? Tell us about the amazing food, exceptional service, or memorable moments that made your experience special!"
        className="min-h-[150px] resize-none rounded-xl border-primary/20 focus:border-primary/40 transition-colors"
      />
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {review.length}/500 characters
        </div>
        
        <div className="flex items-center gap-4">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Review photo"
                className="w-20 h-20 rounded-xl object-cover shadow-lg"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1.5 shadow-lg hover:bg-destructive/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
                disabled={uploading}
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={uploading}
                  className="bg-primary hover:bg-primary/90 text-white border-primary shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {uploading ? "Uploading..." : "Add Photo"}
                </Button>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};