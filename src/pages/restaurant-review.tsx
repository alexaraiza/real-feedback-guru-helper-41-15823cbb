import { useParams } from "react-router-dom";
import { RestaurantReview } from "@/components/demo/RestaurantReview";

const RestaurantReviewPage = () => {
  const { slug } = useParams();

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Invalid page URL</div>
      </div>
    );
  }

  return <RestaurantReview slug={slug} />;
};

export default RestaurantReviewPage;
