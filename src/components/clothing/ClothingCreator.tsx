
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FileUpload from '@/components/ui/FileUpload';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generate3DClothing, ClothingType } from '@/utils/accessoryUtils';
import { toast } from 'sonner';
import { Shirt } from 'lucide-react';

interface ClothingCreatorProps {
  onComplete: () => void;
}

const ClothingCreator: React.FC<ClothingCreatorProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<ClothingType>('shirt');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelected = (file: File) => {
    setImageFile(file);
  };

  const handleTypeChange = (value: string) => {
    setType(value as ClothingType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error('Please upload an image first');
      return;
    }
    
    if (!name.trim()) {
      toast.error('Please enter a name for the clothing item');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await generate3DClothing(imageFile, name, type);
      onComplete();
    } catch (error) {
      console.error('Error creating clothing:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create 3D Clothing</CardTitle>
        <CardDescription>
          Upload a photo of clothing to create a 3D model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clothing-name">Clothing Name</Label>
            <Input
              id="clothing-name"
              placeholder="Enter name (e.g. Blue Shirt)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clothing-type">Clothing Type</Label>
            <Select value={type} onValueChange={handleTypeChange}>
              <SelectTrigger id="clothing-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shirt" className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Shirt className="h-4 w-4" />
                    <span>Shirt / T-shirt</span>
                  </div>
                </SelectItem>
                <SelectItem value="pants">Pants / Jeans</SelectItem>
                <SelectItem value="dress">Dress / Skirt</SelectItem>
                <SelectItem value="jacket">Jacket / Coat</SelectItem>
                <SelectItem value="other">Other Clothing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <FileUpload
              onFileSelected={handleFileSelected}
              acceptedFileTypes="image/*"
              maxSizeMB={5}
              label="Upload clothing photo"
              buttonText="Select Photo"
            />
          </div>
          
          <div className="p-4 bg-secondary rounded-md">
            <h4 className="font-medium mb-2">Photo Guidelines:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium">✓</span>
                </div>
                <p>Lay the clothing flat on a plain background</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium">✓</span>
                </div>
                <p>Take photos from front and back if possible</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium">✓</span>
                </div>
                <p>Make sure the lighting is even without strong shadows</p>
              </li>
            </ul>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isProcessing || !imageFile || !name.trim()}
          >
            {isProcessing ? 'Generating 3D Model...' : 'Create 3D Clothing'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClothingCreator;
