
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
import { generate3DAccessory, AccessoryType } from '@/utils/accessoryUtils';
import { toast } from 'sonner';
import { Glasses, Cap, Shirt } from 'lucide-react';

interface AccessoryCreatorProps {
  onComplete: () => void;
}

const AccessoryCreator: React.FC<AccessoryCreatorProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<AccessoryType>('cap');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelected = (file: File) => {
    setImageFile(file);
  };

  const handleTypeChange = (value: string) => {
    setType(value as AccessoryType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      toast.error('Please upload an image first');
      return;
    }
    
    if (!name.trim()) {
      toast.error('Please enter a name for the accessory');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      await generate3DAccessory(imageFile, name, type);
      onComplete();
    } catch (error) {
      console.error('Error creating accessory:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create 3D Accessory</CardTitle>
        <CardDescription>
          Upload a photo of an accessory to create a 3D model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="accessory-name">Accessory Name</Label>
            <Input
              id="accessory-name"
              placeholder="Enter name (e.g. Red Cap)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accessory-type">Accessory Type</Label>
            <Select value={type} onValueChange={handleTypeChange}>
              <SelectTrigger id="accessory-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cap" className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Cap className="h-4 w-4" />
                    <span>Cap / Hat</span>
                  </div>
                </SelectItem>
                <SelectItem value="glasses" className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Glasses className="h-4 w-4" />
                    <span>Glasses / Sunglasses</span>
                  </div>
                </SelectItem>
                <SelectItem value="other">Other Accessory</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <FileUpload
              onFileSelected={handleFileSelected}
              acceptedFileTypes="image/*"
              maxSizeMB={5}
              label="Upload accessory photo"
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
                <p>Use a well-lit photo with a plain background</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium">✓</span>
                </div>
                <p>Capture the accessory from multiple angles if possible</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium">✓</span>
                </div>
                <p>Make sure the accessory is the main focus of the image</p>
              </li>
            </ul>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isProcessing || !imageFile || !name.trim()}
          >
            {isProcessing ? 'Generating 3D Model...' : 'Create 3D Accessory'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AccessoryCreator;
