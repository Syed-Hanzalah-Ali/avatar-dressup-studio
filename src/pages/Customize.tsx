
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarViewer from '@/components/avatar/AvatarViewer';
import AccessoryCreator from '@/components/accessories/AccessoryCreator';
import ClothingCreator from '@/components/clothing/ClothingCreator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Shirt, Cap, Glasses, Gallery } from 'lucide-react';
import { 
  getSavedAvatarUrl,
  getSavedAccessories, 
  getSavedClothing,
  Accessory,
  Clothing,
  applyAccessory,
  applyClothing
} from '@/utils/accessoryUtils';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const Customize = () => {
  const navigate = useNavigate();
  const [avatarImageUrl, setAvatarImageUrl] = useState<string | null>(null);
  const [customizedAvatarUrl, setCustomizedAvatarUrl] = useState<string | null>(null);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [clothing, setClothing] = useState<Clothing[]>([]);
  const [activeTab, setActiveTab] = useState('accessories');
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Check for saved avatar when component mounts
    const savedAvatar = getSavedAvatarUrl();
    if (savedAvatar) {
      setAvatarImageUrl(savedAvatar);
      setCustomizedAvatarUrl(savedAvatar);
    }
    
    // Load saved accessories and clothing
    setAccessories(getSavedAccessories());
    setClothing(getSavedClothing());
  }, []);
  
  const handleCreateAccessoryComplete = () => {
    toast.success('Accessory created successfully!');
    setAccessories(getSavedAccessories());
    setActiveTab('accessories-list');
  };
  
  const handleCreateClothingComplete = () => {
    toast.success('Clothing item created successfully!');
    setClothing(getSavedClothing());
    setActiveTab('clothing-list');
  };
  
  const handleApplyAccessory = async (accessory: Accessory) => {
    if (!avatarImageUrl) {
      toast.error('Please create an avatar first');
      return;
    }
    
    setIsProcessing(true);
    try {
      const result = await applyAccessory(avatarImageUrl, accessory);
      setCustomizedAvatarUrl(result);
    } catch (error) {
      toast.error('Failed to apply accessory');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleApplyClothing = async (clothingItem: Clothing) => {
    if (!avatarImageUrl) {
      toast.error('Please create an avatar first');
      return;
    }
    
    setIsProcessing(true);
    try {
      const result = await applyClothing(avatarImageUrl, clothingItem);
      setCustomizedAvatarUrl(result);
    } catch (error) {
      toast.error('Failed to apply clothing');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCreateAvatar = () => {
    navigate('/avatar');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Customize Your Avatar</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Add accessories and clothing to your 3D avatar
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Avatar Preview */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-4">Your Avatar</h2>
                {avatarImageUrl ? (
                  <AvatarViewer 
                    imageUrl={customizedAvatarUrl || avatarImageUrl} 
                    isLoading={isProcessing}
                  />
                ) : (
                  <div className="bg-secondary rounded-md p-8 text-center">
                    <p className="text-muted-foreground mb-4">No avatar created yet</p>
                    <Button onClick={handleCreateAvatar}>Create Avatar</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Customization Options */}
          <div className="space-y-6">
            <Tabs 
              defaultValue="accessories" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="accessories" className="flex flex-col items-center py-2 px-1">
                  <Cap className="h-4 w-4 mb-1" />
                  <span className="text-xs">Add Accessory</span>
                </TabsTrigger>
                <TabsTrigger value="accessories-list" className="flex flex-col items-center py-2 px-1">
                  <Gallery className="h-4 w-4 mb-1" />
                  <span className="text-xs">My Accessories</span>
                </TabsTrigger>
                <TabsTrigger value="clothing" className="flex flex-col items-center py-2 px-1">
                  <Shirt className="h-4 w-4 mb-1" />
                  <span className="text-xs">Add Clothing</span>
                </TabsTrigger>
                <TabsTrigger value="clothing-list" className="flex flex-col items-center py-2 px-1">
                  <Gallery className="h-4 w-4 mb-1" />
                  <span className="text-xs">My Clothing</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Accessory Creator Tab */}
              <TabsContent value="accessories" className="space-y-4 animate-fade-in">
                <AccessoryCreator onComplete={handleCreateAccessoryComplete} />
              </TabsContent>
              
              {/* Accessories List Tab */}
              <TabsContent value="accessories-list" className="space-y-4 animate-fade-in">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Your 3D Accessories</h3>
                    
                    {accessories.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No accessories created yet</p>
                        <Button onClick={() => setActiveTab('accessories')}>
                          Create Your First Accessory
                        </Button>
                      </div>
                    ) : (
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="grid grid-cols-2 gap-4">
                          {accessories.map((accessory) => (
                            <div 
                              key={accessory.id} 
                              className="border rounded-md p-3 hover:border-primary transition-colors"
                            >
                              <div className="aspect-square bg-secondary rounded-md overflow-hidden mb-2">
                                <img 
                                  src={accessory.imageUrl} 
                                  alt={accessory.name}
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <h4 className="font-medium text-sm truncate">{accessory.name}</h4>
                              <p className="text-xs text-muted-foreground capitalize mb-2">
                                {accessory.type}
                              </p>
                              <Button 
                                size="sm" 
                                className="w-full"
                                onClick={() => handleApplyAccessory(accessory)}
                                disabled={isProcessing || !avatarImageUrl}
                              >
                                Apply
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Clothing Creator Tab */}
              <TabsContent value="clothing" className="space-y-4 animate-fade-in">
                <ClothingCreator onComplete={handleCreateClothingComplete} />
              </TabsContent>
              
              {/* Clothing List Tab */}
              <TabsContent value="clothing-list" className="space-y-4 animate-fade-in">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Your 3D Clothing</h3>
                    
                    {clothing.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No clothing items created yet</p>
                        <Button onClick={() => setActiveTab('clothing')}>
                          Create Your First Clothing Item
                        </Button>
                      </div>
                    ) : (
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="grid grid-cols-2 gap-4">
                          {clothing.map((item) => (
                            <div 
                              key={item.id} 
                              className="border rounded-md p-3 hover:border-primary transition-colors"
                            >
                              <div className="aspect-square bg-secondary rounded-md overflow-hidden mb-2">
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.name}
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <h4 className="font-medium text-sm truncate">{item.name}</h4>
                              <p className="text-xs text-muted-foreground capitalize mb-2">
                                {item.type}
                              </p>
                              <Button 
                                size="sm" 
                                className="w-full"
                                onClick={() => handleApplyClothing(item)}
                                disabled={isProcessing || !avatarImageUrl}
                              >
                                Apply
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
