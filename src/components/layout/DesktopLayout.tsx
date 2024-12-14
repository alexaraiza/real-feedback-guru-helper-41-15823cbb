import { ReactNode } from 'react';

interface DesktopLayoutProps {
  children: ReactNode;
}

export const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <img 
              src="/lovable-uploads/50980a14-589f-4bd1-8267-536c582ff4e1.png" 
              alt="EatUP! Logo" 
              className="h-24 mb-6 hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-4xl font-bold tracking-tight text-secondary mb-4">
              The Future of Restaurant Reviews
            </h1>
            <p className="text-xl text-muted-foreground">
              Join the EatUP! community where authentic dining experiences create meaningful connections.
            </p>
          </div>
          {/* Features and content for desktop */}
          <div className="space-y-4">
            {/* ... Additional desktop-specific content can go here */}
          </div>
        </div>
        <div className="flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};