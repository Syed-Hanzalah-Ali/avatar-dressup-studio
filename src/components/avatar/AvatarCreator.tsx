
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/FileUpload';
import MeasurementForm, { Measurements } from '@/components/ui/MeasurementForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowRight, ArrowLeft, Camera, Ruler } from 'lucide-react';

interface AvatarCreatorProps {
  onComplete: (imageFile: File, measurements: Measurements) => void;
}

const AvatarCreator: React.FC<AvatarCreatorProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'measurements'>('upload');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [measurements, setMeasurements] = useState<Measurements | null>(null);

  const handleFileSelected = (file: File) => {
    setPhotoFile(file);
  };

  const handleMeasurementsSubmitted = (data: Measurements) => {
    setMeasurements(data);
    toast.success("Measurements saved!");
  };

  const goToMeasurements = () => {
    if (!photoFile) {
      toast.error("Please upload a photo first");
      return;
    }
    setCurrentStep('measurements');
  };

  const goToUpload = () => {
    setCurrentStep('upload');
  };

  const handleComplete = () => {
    if (!photoFile || !measurements) {
      toast.error("Please complete all steps");
      return;
    }
    onComplete(photoFile, measurements);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={currentStep} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger
            value="upload"
            onClick={goToUpload}
            className="flex items-center justify-center gap-2"
          >
            <Camera size={16} />
            <span>Upload Photo</span>
          </TabsTrigger>
          <TabsTrigger
            value="measurements"
            onClick={goToMeasurements}
            className="flex items-center justify-center gap-2"
          >
            <Ruler size={16} />
            <span>Body Measurements</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Photo</CardTitle>
              <CardDescription>
                Please upload a full-body photo for the most accurate avatar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                onFileSelected={handleFileSelected}
                acceptedFileTypes="image/*"
                maxSizeMB={10}
                label="Upload a full-body photo"
                buttonText="Select Photo"
              />
              <div className="p-4 bg-secondary rounded-md">
                <h4 className="font-medium mb-2">Photo Guidelines:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium">✓</span>
                    </div>
                    <p>Use a well-lit, full-body photo with a neutral background</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium">✓</span>
                    </div>
                    <p>Stand in a neutral pose with arms slightly away from body</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium">✓</span>
                    </div>
                    <p>Wear form-fitting clothing for better body analysis</p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={goToMeasurements} className="gap-2">
              Continue to Measurements <ArrowRight size={16} />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="measurements" className="space-y-6 animate-fade-in">
          <MeasurementForm onSubmit={handleMeasurementsSubmitted} />

          <div className="flex justify-between">
            <Button variant="outline" onClick={goToUpload} className="gap-2">
              <ArrowLeft size={16} /> Back to Photo
            </Button>
            <Button onClick={handleComplete}>
              Create My Avatar
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AvatarCreator;
