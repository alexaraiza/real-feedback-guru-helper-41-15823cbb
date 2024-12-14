import { Share2, Gift, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Share2 className="h-8 w-8 text-[#E94E87]" />,
    title: "Restaurant Signs Up & Shares",
    description: "Restaurants join EatUP! and share their unique page with customers to collect valuable feedback",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-[#E94E87]" />,
    title: "Customers Share Feedback",
    description: "Customers can share refined reviews or use our AI voice feedback system to earn exclusive offers",
  },
  {
    icon: <Gift className="h-8 w-8 text-[#E94E87]" />,
    title: "Redeem Rewards",
    description: "Show your EatUP! email confirmation at the restaurant to claim your exclusive offers and rewards",
  }
];

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

        <div className="relative mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-[16/9]"
          >
            <img
              src="/lovable-uploads/77749432-116c-4ca7-8fd9-8c60cbb23112.png"
              alt="Dining experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-block p-3 bg-[#E94E87]/10 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};