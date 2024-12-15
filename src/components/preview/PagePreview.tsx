import { ReviewPageFormData } from "@/components/review-page/types";

interface PagePreviewProps {
  formData: ReviewPageFormData;
}

export function PagePreview({ formData }: PagePreviewProps) {
  return (
    <div className="w-full h-[600px] border rounded-lg overflow-hidden bg-white shadow-lg">
      <div 
        className="h-16" 
        style={{ backgroundColor: formData.theme_color || '#E94E87' }}
      />
      <div className="p-6">
        {formData.logo_url && (
          <img 
            src={formData.logo_url} 
            alt="Restaurant logo" 
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg -mt-12 mb-4"
          />
        )}
        <h1 className="text-2xl font-bold mb-4">
          {formData.page_title || "Your Restaurant Name"}
        </h1>
        <div className="prose max-w-none">
          <p className="text-gray-600">
            {formData.welcome_message || "Welcome to our restaurant!"}
          </p>
        </div>
      </div>
    </div>
  );
}