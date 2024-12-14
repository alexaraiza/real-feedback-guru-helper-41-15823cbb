import React from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const PhoneFrame = ({ children, className }: PhoneFrameProps) => {
  return (
    <div className={cn("relative mx-auto", className)}>
      <div className="relative mx-auto border-[14px] border-secondary rounded-[2.5rem] h-[600px] max-w-[300px] md:h-[700px] md:max-w-[350px] shadow-xl">
        <div className="absolute top-0 inset-x-0 h-[25px] bg-secondary rounded-t-[1.1rem]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-black rounded-full" />
        </div>
        <div className="relative h-full w-full bg-gradient-to-b from-primary/5 via-primary/10 to-accent/20 overflow-y-auto rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
};