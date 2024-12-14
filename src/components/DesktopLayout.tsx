import React from "react";
import { PhoneFrame } from "./PhoneFrame";

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-accent/20">
      <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="relative">
            <img
              src="/lovable-uploads/790c0b75-193e-4078-a73a-2329786c44f2.png"
              alt="Delicious burger"
              className="w-full h-64 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/lovable-uploads/57b564fa-fc5b-47b7-b9ea-74eeb914d730.png"
              alt="Restaurant atmosphere"
              className="w-full h-48 object-cover rounded-xl"
            />
            <img
              src="/lovable-uploads/6a5b1e3f-37bd-4c18-8e52-827fbb81dbcc.png"
              alt="Dining experience"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <PhoneFrame>{children}</PhoneFrame>
        </div>
      </div>
    </div>
  );
};