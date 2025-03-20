
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export interface ClothingItem {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price?: number;
  colors: string[];
  sizes: string[];
}

interface ClothingCardProps {
  item: ClothingItem;
  onTryOn: (item: ClothingItem) => void;
  className?: string;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item, onTryOn, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleTryOn = () => {
    onTryOn(item);
    toast.success(`Now trying on ${item.name}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`${item.name} added to favorites`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`${item.name} added to cart`);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md group cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTryOn}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-secondary">
        {isImageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        <img
          src={item.imageUrl}
          alt={item.name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-105" : "scale-100"
          )}
          onLoad={handleImageLoad}
        />
        <div className={cn(
          "absolute top-3 left-3 transition-opacity duration-300",
          isHovered ? "opacity-0" : "opacity-100"
        )}>
          <Badge variant="secondary">{item.category}</Badge>
        </div>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 flex items-end justify-center p-4",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <Button
            variant="secondary"
            onClick={handleTryOn}
            className="w-full gap-2"
          >
            <Eye size={16} /> Try It On
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-medium truncate">{item.name}</h3>
          {item.price && (
            <span className="font-semibold ml-2">${item.price.toFixed(2)}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        
        <div className="mt-3 flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Colors:</span>
          <div className="flex space-x-1">
            {item.colors.map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Sizes:</span>
          <div className="flex space-x-1">
            {item.sizes.map((size) => (
              <Badge key={size} variant="outline" className="text-xs h-5 min-w-5 px-1">
                {size}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={handleFavorite}
        >
          <Heart size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClothingCard;
