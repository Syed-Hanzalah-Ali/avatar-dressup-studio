
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload, X, Image, Check } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  className?: string;
  label?: string;
  buttonText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  acceptedFileTypes = "image/*",
  maxSizeMB = 5,
  className,
  label = "Upload an image",
  buttonText = "Select File"
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSizeBytes) {
      toast.error(`File size should be less than ${maxSizeMB}MB`);
      return false;
    }

    // Check file type
    const fileType = file.type;
    const validTypes = acceptedFileTypes.split(",").map(type => type.trim());
    
    if (validTypes[0] !== "*" && !validTypes.includes(fileType) && !validTypes.includes("image/*")) {
      toast.error(`Only ${acceptedFileTypes} files are accepted`);
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelected(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      toast.success("File uploaded successfully!");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {label && <p className="text-sm font-medium mb-2">{label}</p>}
      
      <div 
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-all",
          dragActive ? "border-primary bg-primary/5" : "border-border",
          preview ? "bg-background" : "hover:bg-secondary/50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleChange}
          className="hidden"
          data-testid="file-input"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          {preview ? (
            <div className="relative w-full max-w-md">
              <img 
                src={preview} 
                alt="Preview" 
                className="rounded-md max-h-48 mx-auto object-contain"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                onClick={clearSelection}
              >
                <X size={16} />
              </Button>
              <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground gap-2">
                <Check size={16} className="text-green-500" />
                <span className="font-medium">{selectedFile?.name}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                {acceptedFileTypes.includes("image") ? (
                  <Image size={24} className="text-muted-foreground" />
                ) : (
                  <Upload size={24} className="text-muted-foreground" />
                )}
              </div>
              <div className="space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Drag and drop your file here, or
                </p>
                <Button 
                  onClick={handleButtonClick}
                  type="button"
                  variant="secondary"
                >
                  {buttonText}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: {maxSizeMB}MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
