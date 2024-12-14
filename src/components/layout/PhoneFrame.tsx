import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="mx-auto max-w-[420px] h-[844px] bg-white rounded-[60px] shadow-2xl border-8 border-secondary/10 relative overflow-hidden">
      {/* iPhone Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[32px] bg-secondary rounded-b-3xl z-50" />
      
      {/* Status Bar */}
      <div className="h-12 flex justify-between items-center px-6 pt-2">
        <span className="text-sm font-medium">9:41</span>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 21.5c4.694 0 8.5-3.806 8.5-8.5S16.694 4.5 12 4.5 3.5 8.306 3.5 13s3.806 8.5 8.5 8.5zm0-16c4.136 0 7.5 3.364 7.5 7.5S16.136 20.5 12 20.5 4.5 17.136 4.5 13 7.864 5.5 12 5.5z"/>
          </svg>
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M2 22h20V2L2 22z"/>
          </svg>
          <svg className="w-6 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17 5.5v13H7v-13h10m1-2H6c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-15c0-.55-.45-1-1-1zM11 20h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V6h-2v2z"/>
          </svg>
        </div>
      </div>

      {/* Content Area with iOS-like scrolling */}
      <div className="h-[calc(100%-48px)] overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};