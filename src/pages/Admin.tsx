
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from 'sonner';
import { ClothingItem } from '@/components/catalog/ClothingCard';
import FileUpload from '@/components/ui/FileUpload';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Grid,
  ListFilter,
  Users,
  Box,
  Settings,
} from 'lucide-react';

// Mock catalog items
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
];

// Mock users
const mockUsers = [
  { id: 1, name: 'Emma Thompson', email: 'emma@example.com', created: '2023-06-12', lastLogin: '2023-11-05' },
  { id: 2, name: 'Michael Chen', email: 'michael@example.com', created: '2023-07-24', lastLogin: '2023-11-04' },
  { id: 3, name: 'Sophia Rodriguez', email: 'sophia@example.com', created: '2023-08-15', lastLogin: '2023-11-01' },
  { id: 4, name: 'James Wilson', email: 'james@example.com', created: '2023-09-03', lastLogin: '2023-10-28' },
];

// Categories
const categories = [
  'Tops',
  'Bottoms',
  'Dresses',
  'Outerwear',
  'Shoes',
  'Accessories'
];

const Admin = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(mockClothingItems);
  const [activeItem, setActiveItem] = useState<ClothingItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>(clothingItems);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [itemImageFile, setItemImageFile] = useState<File | null>(null);
  
  // New item form state
  const [newItem, setNewItem] = useState<Partial<ClothingItem>>({
    name: '',
    description: '',
    category: 'Tops',
    price: 0,
    colors: [],
    sizes: [],
  });
  
  // Color input state
  const [colorInput, setColorInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');

  // Filter items based on search query
  React.useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const results = clothingItems.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
      setFilteredItems(results);
    } else {
      setFilteredItems(clothingItems);
    }
  }, [searchQuery, clothingItems]);

  const handleAddItem = () => {
    setActiveItem(null);
    setIsAddingItem(true);
    setNewItem({
      name: '',
      description: '',
      category: 'Tops',
      price: 0,
      colors: [],
      sizes: [],
    });
    setItemImageFile(null);
  };

  const handleEditItem = (item: ClothingItem) => {
    setActiveItem(item);
    setIsAddingItem(false);
    setNewItem(item);
    setItemImageFile(null);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = clothingItems.filter(item => item.id !== id);
    setClothingItems(updatedItems);
    toast.success('Item deleted successfully!');
  };

  const handleFileSelected = (file: File) => {
    setItemImageFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === 'price' ? parseFloat(value) : value
    });
  };

  const handleColorAdd = () => {
    if (colorInput && !newItem.colors?.includes(colorInput)) {
      setNewItem({
        ...newItem,
        colors: [...(newItem.colors || []), colorInput]
      });
      setColorInput('');
    }
  };

  const handleColorRemove = (color: string) => {
    setNewItem({
      ...newItem,
      colors: newItem.colors?.filter(c => c !== color) || []
    });
  };

  const handleSizeAdd = () => {
    if (sizeInput && !newItem.sizes?.includes(sizeInput)) {
      setNewItem({
        ...newItem,
        sizes: [...(newItem.sizes || []), sizeInput]
      });
      setSizeInput('');
    }
  };

  const handleSizeRemove = (size: string) => {
    setNewItem({
      ...newItem,
      sizes: newItem.sizes?.filter(s => s !== size) || []
    });
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.description || !newItem.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (isAddingItem) {
      // Generate a placeholder image URL if no file was uploaded
      let imageUrl = 'https://via.placeholder.com/500';
      
      // Use the uploaded file if available
      if (itemImageFile) {
        imageUrl = URL.createObjectURL(itemImageFile);
      }
      
      const newItemWithId: ClothingItem = {
        ...(newItem as Omit<ClothingItem, 'id' | 'imageUrl'>),
        id: Date.now().toString(),
        imageUrl
      };
      
      setClothingItems([...clothingItems, newItemWithId]);
      toast.success('New item added successfully!');
    } else if (activeItem) {
      // Update existing item
      const updatedItems = clothingItems.map(item => 
        item.id === activeItem.id
          ? { 
              ...item, 
              ...newItem, 
              imageUrl: itemImageFile ? URL.createObjectURL(itemImageFile) : item.imageUrl 
            }
          : item
      );
      
      setClothingItems(updatedItems);
      toast.success('Item updated successfully!');
    }
    
    setIsAddingItem(false);
    setActiveItem(null);
  };

  const handleCancel = () => {
    setIsAddingItem(false);
    setActiveItem(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage your clothing catalog, users, and application settings
          </p>
        </div>

        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-8">
            <TabsTrigger value="catalog" className="flex items-center justify-center gap-2">
              <Box size={16} /> Catalog Management
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center justify-center gap-2">
              <Users size={16} /> User Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center gap-2">
              <Settings size={16} /> System Settings
            </TabsTrigger>
          </TabsList>

          {/* Catalog Management Tab */}
          <TabsContent value="catalog" className="animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left side - items list */}
              <div className="md:w-1/2 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>Clothing Items</CardTitle>
                      <Button size="sm" onClick={handleAddItem} className="gap-1">
                        <Plus size={16} /> Add New
                      </Button>
                    </div>
                    <div className="mt-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search items..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="w-[120px] text-center">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div className="h-12 w-12 rounded-md overflow-hidden">
                                    <img
                                      src={item.imageUrl}
                                      alt={item.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell className="text-right">${item.price?.toFixed(2)}</TableCell>
                                <TableCell>
                                  <div className="flex justify-center space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleEditItem(item)}
                                    >
                                      <Edit size={16} />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleDeleteItem(item.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                No items found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right side - edit form */}
              <div className="md:w-1/2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isAddingItem ? 'Add New Item' : activeItem ? 'Edit Item' : 'Item Details'}
                    </CardTitle>
                    <CardDescription>
                      {isAddingItem || activeItem
                        ? 'Fill in the details for this clothing item'
                        : 'Select an item to edit or add a new one'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(isAddingItem || activeItem) ? (
                      <form onSubmit={handleSaveItem} className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Item Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={newItem.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                              id="description"
                              name="description"
                              value={newItem.description}
                              onChange={handleInputChange}
                              rows={3}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="category">Category *</Label>
                              <select
                                id="category"
                                name="category"
                                value={newItem.category}
                                onChange={(e) => handleInputChange(e as any)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                              >
                                {categories.map((cat) => (
                                  <option key={cat} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="price">Price ($) *</Label>
                              <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                value={newItem.price}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Available Colors</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {newItem.colors?.map((color) => (
                                <div
                                  key={color}
                                  className="flex items-center gap-1 bg-secondary rounded-full pl-2 pr-1 py-1"
                                >
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                  <span className="text-xs">{color}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5"
                                    onClick={() => handleColorRemove(color)}
                                  >
                                    <X size={12} />
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Add color (e.g., #FF0000)"
                                value={colorInput}
                                onChange={(e) => setColorInput(e.target.value)}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleColorAdd}
                              >
                                Add
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Available Sizes</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {newItem.sizes?.map((size) => (
                                <div
                                  key={size}
                                  className="flex items-center gap-1 bg-secondary rounded-full pl-2 pr-1 py-1"
                                >
                                  <span className="text-xs">{size}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5"
                                    onClick={() => handleSizeRemove(size)}
                                  >
                                    <X size={12} />
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Add size (e.g., S, M, XL, 32, 34)"
                                value={sizeInput}
                                onChange={(e) => setSizeInput(e.target.value)}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleSizeAdd}
                              >
                                Add
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Item Image</Label>
                            <FileUpload
                              onFileSelected={handleFileSelected}
                              acceptedFileTypes="image/*"
                              maxSizeMB={5}
                              buttonText="Select Image"
                            />
                          </div>
                        </div>

                        <CardFooter className="px-0 pt-4 flex justify-between">
                          <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                          </Button>
                          <Button type="submit">
                            {isAddingItem ? 'Add Item' : 'Update Item'}
                          </Button>
                        </CardFooter>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Box size={48} className="text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Item Selected</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Select an item to edit from the list or add a new one
                        </p>
                        <Button onClick={handleAddItem} className="gap-2">
                          <Plus size={16} /> Add New Item
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage user accounts in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.created}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Eye size={14} /> View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="settings" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure application-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">General Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-registrations">Enable User Registrations</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to register for accounts
                      </p>
                    </div>
                    <Switch id="enable-registrations" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="display-prices">Display Product Prices</Label>
                      <p className="text-sm text-muted-foreground">
                        Show prices in the catalog for all users
                      </p>
                    </div>
                    <Switch id="display-prices" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Put the application in maintenance mode
                      </p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Avatar Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="high-quality-rendering">High-Quality Rendering</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable high-quality rendering for 3D avatars
                      </p>
                    </div>
                    <Switch id="high-quality-rendering" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-downloads">Allow Avatar Downloads</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable users to download their 3D avatars
                      </p>
                    </div>
                    <Switch id="allow-downloads" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Privacy Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">Enable Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Collect anonymous usage data to improve the application
                      </p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-retention">Data Retention (days)</Label>
                      <p className="text-sm text-muted-foreground">
                        Number of days to retain user data
                      </p>
                    </div>
                    <Input
                      id="data-retention"
                      type="number"
                      defaultValue={90}
                      className="w-20"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={() => toast.success('Settings saved successfully!')}>
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
