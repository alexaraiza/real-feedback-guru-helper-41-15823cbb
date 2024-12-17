import { useParams } from "react-router-dom";
import { CustomDemoView } from "@/components/demo/CustomDemoView";

const CustomDemoPage = () => {
  const { slug } = useParams();

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Invalid demo page URL</div>
      </div>
    );
  }

  return <CustomDemoView slug={slug} />;
};

export default CustomDemoPage;