import { Share2, Gift, Star, Users, Building2, Bot } from "lucide-react";
import { motion } from "framer-motion";

const customerFeatures = [
  {
    icon: <Share2 className="h-8 w-8 text-[#E94E87]" />,
    title: "Share Reviews",
    description: "Share your dining experiences through text or voice and help others discover great restaurants",
    image: "/lovable-uploads/6a8c9c78-c1cc-48a8-ab6f-089851ea1e78.png"
  },
  {
    icon: <Gift className="h-8 w-8 text-[#E94E87]" />,
    title: "Earn Rewards",
    description: "Get exclusive rewards and discounts for your honest feedback",
    image: "/lovable-uploads/1d52bc29-0436-422b-9e81-c0a0a1881f10.png"
  },
  {
    icon: <Star className="h-8 w-8 text-[#E94E87]" />,
    title: "Quality Assurance",
    description: "AI-powered review refinement ensures your feedback is constructive and helpful",
    image: "/lovable-uploads/159a55f7-95f4-4918-bcb6-0b5ee150a6ae.png"
  }
];

const restaurantFeatures = [
  {
    icon: <Users className="h-8 w-8 text-[#E94E87]" />,
    title: "Customer Insights",
    description: "Get valuable feedback and insights from your customers",
    image: "/lovable-uploads/9d633d08-e001-4a53-ad3f-9ac7f75ef09b.png"
  },
  {
    icon: <Building2 className="h-8 w-8 text-[#E94E87]" />,
    title: "Brand Building",
    description: "Build your restaurant's online presence and reputation",
    image: "/lovable-uploads/1d52bc29-0436-422b-9e81-c0a0a1881f10.png"
  },
  {
    icon: <Bot className="h-8 w-8 text-[#E94E87]" />,
    title: "AI-Powered Tools",
    description: "Leverage AI to better understand and respond to customer feedback",
    image: "/lovable-uploads/159a55f7-95f4-4918-bcb6-0b5ee150a6ae.png"
  }
];

const FeatureCard = ({ feature, index, isCustomer = true }) => {
  const isEven = index % 2 === 0;
  const containerClass = isEven
    ? "md:flex-row"
    : "md:flex-row-reverse";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`flex flex-col ${containerClass} items-center gap-8 mb-16 last:mb-0`}
    >
      <div className="flex-1 relative group">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="inline-block p-3 bg-[#E94E87] rounded-full mb-3">
            {feature.icon}
          </div>
          <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
          <p className="text-white/90">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text"
            >
              How It Works For Customers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Share your dining experiences and earn rewards while helping others discover great restaurants
            </motion.p>
          </div>
          <div className="space-y-12">
            {customerFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white via-[#FFE5ED]/30 to-[#FFD5E2]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#E94E87] via-[#F17BA3] to-[#FF9B9B] text-transparent bg-clip-text"
            >
              How It Works For Restaurants
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Transform customer feedback into growth opportunities for your restaurant
            </motion.p>
          </div>
          <div className="space-y-12">
            {restaurantFeatures.map((feature, index) => (
              <FeatureCard 
                key={index} 
                feature={feature} 
                index={index} 
                isCustomer={false}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};