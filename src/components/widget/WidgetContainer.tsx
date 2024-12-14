import React from 'react';

interface WidgetContainerProps {
  showWidget: boolean;
}

export const WidgetContainer = ({ showWidget }: WidgetContainerProps) => {
  if (!showWidget) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Black bar that appears under the widget */}
      <div className="bg-[#222222] h-16 w-full absolute bottom-0 left-0 right-0" />
      {/* The actual widget will be rendered here by the ElevenLabs script */}
    </div>
  );
};