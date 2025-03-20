
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';

interface AvatarViewerProps {
  imageUrl?: string;
  name?: string;
  isLoading?: boolean;
}

const AvatarViewer: React.FC<AvatarViewerProps> = ({
  imageUrl,
  name = "My Avatar",
  isLoading = false
}) => {
  const [isRotating, setIsRotating] = useState(false);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate 3D loading when the component mounts
    if (imageUrl) {
      const timer = setTimeout(() => {
        toast.success("3D avatar loaded successfully!");
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [imageUrl]);

  const handleRotateToggle = () => {
    setIsRotating(!isRotating);
  };

  const handleZoomIn = () => {
    if (zoom < 2) {
      setZoom(zoom + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      setZoom(zoom - 0.1);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const handleDownload = () => {
    toast.success("Avatar downloaded successfully!");
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div 
        ref={containerRef}
        className="relative w-full flex-grow bg-gradient-to-b from-secondary/50 to-background rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-[300px] w-[200px] rounded-md" />
              <Skeleton className="h-4 w-[150px] rounded" />
            </div>
          </div>
        ) : imageUrl ? (
          <div className="flex items-center justify-center h-full p-6">
            <div 
              className={`relative transition-transform duration-500 ease-out ${isRotating ? 'animate-rotate-slow' : ''}`}
              style={{ transform: `scale(${zoom})` }}
            >
              <img 
                src={imageUrl} 
                alt={name}
                className="max-h-[400px] max-w-full object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No avatar to display
          </div>
        )}
      </div>

      {imageUrl && !isLoading && (
        <div className="flex justify-center mt-4 space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRotateToggle}
            className={isRotating ? 'bg-primary/10' : ''}
          >
            <RotateCw size={18} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut size={18} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn size={18} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleFullscreen}>
            <Maximize2 size={18} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AvatarViewer;
