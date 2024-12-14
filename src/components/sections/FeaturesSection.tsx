import { Share2, Gift, Star, Users, Building2, Bot } from "lucide-react";

const customerFeatures = [
  {
    icon: <Share2 className="h-8 w-8 text-[#E94E87]" />,
    title: "Share Reviews",
    description: "Share your dining experiences through text or voice and help others discover great restaurants"
  },
  {
    icon: <Gift className="h-8 w-8 text-[#E94E87]" />,
    title: "Earn Rewards",
    description: "Get exclusive rewards and discounts for your honest feedback"
  },
  {
    icon: <Star className="h-8 w-8 text-[#E94E87]" />,
    title: "Quality Assurance",
    description: "AI-powered review refinement ensures your feedback is constructive and helpful"
  }
];

const restaurantFeatures = [
  {
    icon: <Users className="h-8 w-8 text-[#E94E87]" />,
    title: "Customer Insights",
    description: "Get valuable feedback and insights from your customers"
  },
  {
    icon: <Building2 className="h-8 w-8 text-[#E94E87]" />,
    title: "Brand Building",
    description: "Build your restaurant's online presence and reputation"
  },
  {
    icon: <Bot className="h-8 w-8 text-[#E94E87]" />,
    title: "AI-Powered Tools",
    description: "Leverage AI to better understand and respond to customer feedback"
  }
];

export const FeaturesSection = () => {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works For Customers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your dining experiences and earn rewards while helping others discover great restaurants
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {customerFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 inline-block p-3 bg-[#E94E87]/5 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white via-[#FFE5ED]/30 to-[#FFD5E2]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works For Restaurants</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform customer feedback into growth opportunities for your restaurant
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {restaurantFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 inline-block p-3 bg-[#E94E87]/5 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};