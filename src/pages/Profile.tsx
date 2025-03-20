
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import AvatarViewer from '@/components/avatar/AvatarViewer';
import { User, Settings, History, Heart, LogOut } from 'lucide-react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, CA 12345',
    bio: 'Fashion enthusiast and digital avatar explorer',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    saveHistory: true,
    darkMode: false,
    shareData: false,
  });

  // Mock avatar image URL
  const avatarImageUrl = 'https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  // Mock order history
  const orderHistory = [
    { id: 'ORD-1234', date: '2023-09-15', items: 3, total: 129.97, status: 'Delivered' },
    { id: 'ORD-1235', date: '2023-08-28', items: 1, total: 59.99, status: 'Delivered' },
    { id: 'ORD-1236', date: '2023-07-14', items: 2, total: 89.98, status: 'Delivered' },
  ];

  // Mock saved items
  const savedItems = [
    { id: '1', name: 'Classic White T-Shirt', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: '3', name: 'Tailored Blazer', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1598808503746-f34cfb6f2592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: '5', name: 'Leather Chelsea Boots', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleToggleChange = (name: string, value: boolean) => {
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile information updated successfully!');
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Preferences updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Your Profile</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage your account, preferences, and avatar settings
          </p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="personal" className="flex items-center justify-center gap-2">
              <User size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger value="avatar" className="flex items-center justify-center gap-2">
              <User size={16} /> Avatar
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center justify-center gap-2">
              <History size={16} /> History
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center justify-center gap-2">
              <Heart size={16} /> Saved
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <form onSubmit={handleSaveProfile}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Changes</Button>
                  </CardFooter>
                </form>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                </CardHeader>
                <form onSubmit={handleSavePreferences}>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new styles and promotions
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => handleToggleChange('emailNotifications', checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="save-history">Save Try-On History</Label>
                        <p className="text-sm text-muted-foreground">
                          Keep a record of items you've tried on
                        </p>
                      </div>
                      <Switch
                        id="save-history"
                        checked={preferences.saveHistory}
                        onCheckedChange={(checked) => handleToggleChange('saveHistory', checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Switch between light and dark themes
                        </p>
                      </div>
                      <Switch
                        id="dark-mode"
                        checked={preferences.darkMode}
                        onCheckedChange={(checked) => handleToggleChange('darkMode', checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="share-data">Share Usage Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Help us improve by sharing anonymous usage data
                        </p>
                      </div>
                      <Switch
                        id="share-data"
                        checked={preferences.shareData}
                        onCheckedChange={(checked) => handleToggleChange('shareData', checked)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save Preferences</Button>
                  </CardFooter>
                </form>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" className="gap-2 text-destructive">
                <LogOut size={16} /> Sign Out
              </Button>
            </div>
          </TabsContent>

          {/* Avatar Tab */}
          <TabsContent value="avatar" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Your 3D Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-[3/4] max-h-96 bg-secondary/30 rounded-lg overflow-hidden">
                    <AvatarViewer imageUrl={avatarImageUrl} />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Avatar Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Created:</span>
                          <span>September 15, 2023</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Updated:</span>
                          <span>November 3, 2023</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Try-Ons:</span>
                          <span>24 items</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Avatar Actions</h3>
                      <div className="space-y-3">
                        <Button className="w-full justify-start" asChild>
                          <Link to="/avatar">Edit Avatar</Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link to="/catalog">Try On Clothes</Link>
                        </Button>
                        <Button className="w-full justify-start text-destructive" variant="outline">
                          Delete Avatar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {orderHistory.length > 0 ? (
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="flex flex-col md:flex-row justify-between items-start p-4 border border-border rounded-lg">
                        <div className="mb-2 md:mb-0">
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                          <p className="text-sm mt-1">{order.items} {order.items > 1 ? 'items' : 'item'}</p>
                        </div>
                        <div className="md:text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{order.status}</p>
                          <Button variant="link" className="h-auto p-0 mt-1">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link to="/catalog">Browse Catalog</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Items Tab */}
          <TabsContent value="saved" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Saved Items</CardTitle>
              </CardHeader>
              <CardContent>
                {savedItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedItems.map((item) => (
                      <div key={item.id} className="border border-border rounded-lg overflow-hidden group">
                        <div className="aspect-square relative">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <Button size="sm" variant="secondary" className="w-full">
                                Try On
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium truncate">{item.name}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Heart size={16} className="text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You don't have any saved items yet.</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link to="/catalog">Browse Catalog</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
