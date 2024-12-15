export interface ReviewPageFormData {
  page_title: string;
  welcome_message?: string;
  thank_you_message?: string;
  theme_color: string; // Changed to required to match schema default
  logo_url?: string;
  background_image_url?: string;
}