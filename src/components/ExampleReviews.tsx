import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

const exampleReviews = [
  {
    text: "EatUP! has transformed how we handle customer feedback. The AI-powered review system helps us understand our customers better and improve our service.",
    author: "Sarah Martinez",
    role: "Owner, The Rustic Table",
    rating: 5,
    image: "/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
  },
  {
    text: "Since implementing EatUP!, we've seen a 40% increase in customer engagement and valuable feedback that has helped us enhance our menu offerings.",
    author: "John Davidson",
    role: "Manager, Urban Plates",
    rating: 5,
    image: "/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
  },
  {
    text: "The voice review feature is a game-changer. Our customers love how easy it is to share their experiences, and we love the detailed insights we receive.",
    author: "Michael Rodriguez",
    role: "Owner, Flavor House",
    rating: 5,
    image: "/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
  },
  {
    text: "EatUP! has helped us build stronger relationships with our customers. The reward system keeps them coming back, and the feedback helps us grow.",
    author: "Emily Wong",
    role: "Owner, Asian Fusion Kitchen",
    rating: 5,
    image: "/lovable-uploads/23bef056-e873-4e3d-b77b-8ac3c49fa8d8.png"
  },
];

export const ExampleReviews = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
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
                <div className="flex items-center space-x-4">
                  <img
                    src={review.image}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-secondary">{review.author}</p>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-primary/20" />
                <p className="text-secondary/80 leading-relaxed">{review.text}</p>
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>
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