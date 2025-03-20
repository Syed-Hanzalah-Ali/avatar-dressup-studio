
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

export interface Measurements {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  inseam: number;
  gender: 'male' | 'female' | 'other';
  bodyType: string;
}

interface MeasurementFormProps {
  onSubmit: (measurements: Measurements) => void;
  initialValues?: Partial<Measurements>;
}

const defaultMeasurements: Measurements = {
  height: 170,
  weight: 70,
  chest: 90,
  waist: 80,
  hips: 95,
  inseam: 80,
  gender: 'male',
  bodyType: 'average',
};

const MeasurementForm: React.FC<MeasurementFormProps> = ({
  onSubmit,
  initialValues = {}
}) => {
  const [measurements, setMeasurements] = useState<Measurements>({
    ...defaultMeasurements,
    ...initialValues
  });

  const handleChange = (field: keyof Measurements, value: any) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(measurements);
  };

  const bodyTypes = [
    { value: 'slim', label: 'Slim' },
    { value: 'athletic', label: 'Athletic' },
    { value: 'average', label: 'Average' },
    { value: 'curvy', label: 'Curvy' },
    { value: 'plus', label: 'Plus Size' }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Body Measurements</CardTitle>
        <CardDescription>
          Enter your measurements to create an accurate 3D avatar
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Gender Selection */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <RadioGroup
              id="gender"
              value={measurements.gender}
              onValueChange={(value) => handleChange('gender', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Height and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="height"
                  min={140}
                  max={220}
                  step={1}
                  value={[measurements.height]}
                  onValueChange={(value) => handleChange('height', value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={measurements.height}
                  onChange={(e) => handleChange('height', parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="flex items-center space-x-4">
                <Slider
                  id="weight"
                  min={40}
                  max={150}
                  step={1}
                  value={[measurements.weight]}
                  onValueChange={(value) => handleChange('weight', value[0])}
                  className="flex-grow"
                />
                <Input
                  type="number"
                  value={measurements.weight}
                  onChange={(e) => handleChange('weight', parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
          </div>

          {/* Body Measurements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chest">Chest (cm)</Label>
              <Input
                id="chest"
                type="number"
                value={measurements.chest}
                onChange={(e) => handleChange('chest', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waist">Waist (cm)</Label>
              <Input
                id="waist"
                type="number"
                value={measurements.waist}
                onChange={(e) => handleChange('waist', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hips">Hips (cm)</Label>
              <Input
                id="hips"
                type="number"
                value={measurements.hips}
                onChange={(e) => handleChange('hips', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inseam">Inseam (cm)</Label>
              <Input
                id="inseam"
                type="number"
                value={measurements.inseam}
                onChange={(e) => handleChange('inseam', parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Body Type */}
          <div className="space-y-2">
            <Label htmlFor="bodyType">Body Type</Label>
            <RadioGroup
              id="bodyType"
              value={measurements.bodyType}
              onValueChange={(value) => handleChange('bodyType', value)}
              className="grid grid-cols-2 md:grid-cols-5 gap-2"
            >
              {bodyTypes.map(type => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value}>{type.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Reset
          </Button>
          <Button type="submit">
            Save Measurements
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default MeasurementForm;
