
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClothingCard, { ClothingItem } from '@/components/catalog/ClothingCard';
import AvatarViewer from '@/components/avatar/AvatarViewer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, Filter, User } from 'lucide-react';

// Mock data for clothing items
const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Essential cotton t-shirt with a classic fit and round neckline.',
    category: 'Tops',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 29.99,
    colors: ['#FFFFFF', '#000000', '#C0C0C0'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Dark Wash Slim Jeans',
    description: 'Slim-fit jeans in stretch denim with a classic five-pocket design.',
    category: 'Bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 59.99,
    colors: ['#191970', '#000000'],
    sizes: ['30', '32', '34', '36']
  },
  {
    id: '3',
    name: 'Tailored Blazer',
    description: 'Structured blazer with notched lapels and front button fastening.',
    category: 'Outerwear',
    imageUrl: 'https://images.unsplash.com/photo-1598808503746-f34cfb6f2592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 129.99,
    colors: ['#000000', '#1F1F1F', '#808080'],
    sizes: ['S', 'M', 'L']
  },
  {
    id: '4',
    name: 'Floral Summer Dress',
    description: 'Lightweight midi dress with floral print and elasticated waist.',
    category: 'Dresses',
    imageUrl: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 79.99,
    colors: ['#FFCCCB', '#E0FFFF'],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: '5',
    name: 'Leather Chelsea Boots',
    description: 'Classic Chelsea boots in genuine leather with elastic side panels.',
    category: 'Shoes',
    imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 149.99,
    colors: ['#8B4513', '#000000'],
    sizes: ['38', '39', '40', '41', '42', '43', '44']
  },
  {
    id: '6',
    name: 'Cashmere Sweater',
    description: 'Soft cashmere sweater with ribbed cuffs and hem.',
    category: 'Tops',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 189.99,
    colors: ['#F5F5DC', '#808080', '#000000'],
    sizes: ['S', 'M', 'L']
  }
];

// Categories for filtering
const categories = [
  'All',
  'Tops',
  'Bottoms',
  'Dresses',
  'Outerwear',
  'Shoes',
  'Accessories'
];

const Catalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('all');
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(mockClothingItems);
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>(mockClothingItems);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  // Mock avatar image URL - in a real app, this would come from the user's profile
  const avatarImageUrl = 'https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  useEffect(() => {
    // Apply filters
    let results = clothingItems;
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    // Apply price filter
    if (priceFilter === 'low') {
      results = results.filter(item => item.price && item.price < 50);
    } else if (priceFilter === 'medium') {
      results = results.filter(item => item.price && item.price >= 50 && item.price < 100);
    } else if (priceFilter === 'high') {
      results = results.filter(item => item.price && item.price >= 100);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(results);
  }, [searchQuery, selectedCategory, priceFilter, clothingItems]);

  const handleTryOn = (item: ClothingItem) => {
    setSelectedItem(item);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceFilterChange = (value: string) => {
    setPriceFilter(value);
  };

  const handleCreateAvatar = () => {
    navigate('/avatar');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Clothing Catalog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our collection and try items on your 3D avatar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-xl font-medium mb-4">Filters</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="search" className="text-sm font-medium">Search</label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search clothing..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Categories</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="price-filter" className="text-sm font-medium">Price Range</label>
                <Select
                  value={priceFilter}
                  onValueChange={handlePriceFilterChange}
                >
                  <SelectTrigger id="price-filter" className="mt-1">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="low">Under $50</SelectItem>
                    <SelectItem value="medium">$50 - $100</SelectItem>
                    <SelectItem value="high">Over $100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="text-lg font-medium mb-3">Your Avatar</h3>
              {avatarImageUrl ? (
                <div className="aspect-[3/4] max-h-64 overflow-hidden rounded-md border border-border mb-4">
                  <AvatarViewer imageUrl={avatarImageUrl} />
                </div>
              ) : (
                <div className="aspect-[3/4] max-h-64 bg-secondary rounded-md flex items-center justify-center mb-4">
                  <div className="text-center p-4">
                    <User size={48} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No avatar created yet</p>
                  </div>
                </div>
              )}
              
              <Button 
                variant={avatarImageUrl ? "outline" : "default"} 
                className="w-full"
                onClick={handleCreateAvatar}
              >
                {avatarImageUrl ? "Edit Avatar" : "Create Avatar"}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column - Items grid and try-on view */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {filteredItems.length} items found
                </span>
              </div>
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="try-on">Try On View</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="animate-fade-in">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <ClothingCard
                      key={item.id}
                      item={item}
                      onTryOn={handleTryOn}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg shadow-sm p-8 text-center">
                  <p className="text-muted-foreground">No items found. Try adjusting your filters.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="try-on" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-4">Your Avatar</h3>
                    <div className="aspect-[3/4] max-h-96">
                      <AvatarViewer 
                        imageUrl={avatarImageUrl} 
                        isLoading={!avatarImageUrl} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-4">Selected Item</h3>
                    {selectedItem ? (
                      <div className="space-y-4">
                        <div className="aspect-[3/4] max-h-64 overflow-hidden rounded-md border border-border">
                          <img 
                            src={selectedItem.imageUrl} 
                            alt={selectedItem.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{selectedItem.name}</h4>
                          <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                          {selectedItem.price && (
                            <p className="font-semibold mt-1">${selectedItem.price.toFixed(2)}</p>
                          )}
                        </div>
                        <div className="pt-4">
                          <Button className="w-full">Add to Cart</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                        <p className="text-muted-foreground mb-4">No item selected</p>
                        <p className="text-xs text-muted-foreground">
                          Select an item from the catalog to see it here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
