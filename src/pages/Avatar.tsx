
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarCreator from '@/components/avatar/AvatarCreator';
import AvatarViewer from '@/components/avatar/AvatarViewer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ShoppingBag, Edit } from 'lucide-react';
import { Measurements } from '@/components/ui/MeasurementForm';

const Avatar = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [avatarImageUrl, setAvatarImageUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [measurements, setMeasurements] = useState<Measurements | null>(null);

  const handleCreate = (imageFile: File, measurements: Measurements) => {
    setUploadedFile(imageFile);
    setMeasurements(measurements);
    setIsProcessing(true);
    
    // Simulate processing time for avatar creation
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(imageFile);
      setAvatarImageUrl(imageUrl);
      setIsCreating(false);
      setIsProcessing(false);
      toast.success("Your 3D avatar has been created!");
    }, 3000);
  };

  const handleEdit = () => {
    setIsCreating(true);
  };

  const goToCatalog = () => {
    if (avatarImageUrl) {
      // In a real application, we would save the avatar to the user's profile
      // and then navigate to the catalog
      navigate('/catalog');
    } else {
      toast.error("Please create your avatar first");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Your 3D Avatar</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create your personalized 3D avatar for virtual try-on experiences
          </p>
        </div>

        {isCreating ? (
          <AvatarCreator onComplete={handleCreate} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
              <div className="p-6">
                <h2 className="text-xl font-medium mb-4">Your 3D Avatar</h2>
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center pt-10 pb-16">
                    <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p className="text-muted-foreground">Generating your 3D avatar...</p>
                    <p className="text-xs text-muted-foreground mt-2">This may take a few moments</p>
                  </div>
                ) : (
                  <AvatarViewer 
                    imageUrl={avatarImageUrl || undefined} 
                    name="My Avatar" 
                  />
                )}
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
              <div className="p-6">
                <h2 className="text-xl font-medium mb-4">Measurements & Details</h2>
                {measurements ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Height</p>
                        <p className="text-muted-foreground">{measurements.height} cm</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Weight</p>
                        <p className="text-muted-foreground">{measurements.weight} kg</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Chest</p>
                        <p className="text-muted-foreground">{measurements.chest} cm</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Waist</p>
                        <p className="text-muted-foreground">{measurements.waist} cm</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Hips</p>
                        <p className="text-muted-foreground">{measurements.hips} cm</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Inseam</p>
                        <p className="text-muted-foreground">{measurements.inseam} cm</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Body Type</p>
                        <p className="text-muted-foreground capitalize">{measurements.bodyType}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Gender</p>
                        <p className="text-muted-foreground capitalize">{measurements.gender}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border mt-4">
                      <p className="text-sm font-medium mb-2">Reference Photo</p>
                      {uploadedFile && (
                        <div className="relative aspect-[3/4] max-w-[120px] rounded-md overflow-hidden border border-border">
                          <img 
                            src={URL.createObjectURL(uploadedFile)} 
                            alt="Reference" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <Button onClick={handleEdit} variant="outline" className="gap-2">
                <Edit size={16} /> Edit Avatar
              </Button>
              <Button onClick={goToCatalog} className="gap-2">
                <ShoppingBag size={16} /> Try On Clothes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;
