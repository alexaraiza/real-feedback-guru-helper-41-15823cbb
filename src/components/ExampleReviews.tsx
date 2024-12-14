import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const exampleReviews = [
  {
    text: "Amazing service! The staff was incredibly friendly and professional. Would definitely recommend to anyone looking for top-notch quality.",
    author: "Sarah M.",
    rating: 5,
  },
  {
    text: "Outstanding experience from start to finish. The attention to detail and customer service exceeded my expectations.",
    author: "John D.",
    rating: 5,
  },
  {
    text: "Very impressed with the quality of service. The team went above and beyond to ensure everything was perfect.",
    author: "Michael R.",
    rating: 5,
  },
  {
    text: "Fantastic experience! The level of professionalism and expertise was exceptional. Will definitely be coming back.",
    author: "Emily W.",
    rating: 5,
  },
];

export const ExampleReviews = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-secondary">
        What Our Customers Say
      </h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {exampleReviews.map((review, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="glass-card h-full p-6 rounded-2xl space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-secondary/80 leading-relaxed">{review.text}</p>
                <p className="font-semibold text-primary">{review.author}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white" />
        <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white" />
      </Carousel>
    </div>
  );
};