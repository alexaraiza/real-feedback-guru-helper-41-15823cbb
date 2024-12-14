import { Share2, Gift, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Share2 className="h-8 w-8 text-[#E94E87]" />,
    title: "Restaurant Signs Up & Shares",
    description: "Restaurants join EatUP! and share their unique page with customers to collect valuable feedback",
    image: "/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-[#E94E87]" />,
    title: "Customers Share Feedback",
    description: "Customers can share refined reviews or use our AI voice feedback system to earn exclusive offers",
    image: "/lovable-uploads/f790e463-d057-4fec-b168-02e376930c1c.png"
  },
  {
    icon: <Gift className="h-8 w-8 text-[#E94E87]" />,
    title: "Redeem Rewards",
    description: "Show your EatUP! email confirmation at the restaurant to claim your exclusive offers and rewards",
    image: "/lovable-uploads/1d52bc29-0436-422b-9e81-c0a0a1881f10.png"
  }
];

const FeatureCard = ({ feature, index }) => {
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
            How EatUP! Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A simple three-step process to connect restaurants with their customers through meaningful feedback
          </motion.p>
        </div>
        <div className="space-y-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};