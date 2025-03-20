
import React from 'react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-[70vh]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
