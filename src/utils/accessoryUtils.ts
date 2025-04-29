
import { toast } from "sonner";

// Types for accessories and clothing
export type AccessoryType = "cap" | "glasses" | "other";
export type ClothingType = "shirt" | "pants" | "dress" | "jacket" | "other";

export interface Accessory {
  id: string;
  name: string;
  type: AccessoryType;
  imageUrl: string;
  model3dUrl: string | null;
}

export interface Clothing {
  id: string;
  name: string;
  type: ClothingType;
  imageUrl: string;
  model3dUrl: string | null;
}

// Storage keys for user-generated accessories and clothing
const ACCESSORIES_KEY = 'avatarApp_accessories';
const CLOTHING_KEY = 'avatarApp_clothing';

/**
 * Generate a 3D accessory from a real image using Kiri Engine
 * 
 * @param imageFile - The uploaded accessory image
 * @param name - Name of the accessory
 * @param type - Type of accessory
 * @returns Promise with the created accessory object
 */
export const generate3DAccessory = async (
  imageFile: File,
  name: string,
  type: AccessoryType
): Promise<Accessory> => {
  try {
    toast.info("Generating 3D accessory...");
    
    // Simulate processing time for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const accessory: Accessory = {
      id: crypto.randomUUID(),
      name,
      type,
      imageUrl: URL.createObjectURL(imageFile),
      model3dUrl: URL.createObjectURL(imageFile) // In a real app, this would be the URL to the 3D model
    };
    
    // Save to localStorage
    saveAccessory(accessory);
    
    toast.success("3D accessory created successfully!");
    return accessory;
  } catch (error) {
    console.error('Error generating 3D accessory:', error);
    toast.error('Failed to generate 3D accessory. Please try again.');
    throw error;
  }
};

/**
 * Generate a 3D clothing item from a real image using Kiri Engine
 * 
 * @param imageFile - The uploaded clothing image
 * @param name - Name of the clothing item
 * @param type - Type of clothing
 * @returns Promise with the created clothing object
 */
export const generate3DClothing = async (
  imageFile: File,
  name: string,
  type: ClothingType
): Promise<Clothing> => {
  try {
    toast.info("Generating 3D clothing...");
    
    // Simulate processing time for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const clothing: Clothing = {
      id: crypto.randomUUID(),
      name,
      type,
      imageUrl: URL.createObjectURL(imageFile),
      model3dUrl: URL.createObjectURL(imageFile) // In a real app, this would be the URL to the 3D model
    };
    
    // Save to localStorage
    saveClothing(clothing);
    
    toast.success("3D clothing created successfully!");
    return clothing;
  } catch (error) {
    console.error('Error generating 3D clothing:', error);
    toast.error('Failed to generate 3D clothing. Please try again.');
    throw error;
  }
};

/**
 * Get all saved accessories
 * @returns Array of accessories
 */
export const getSavedAccessories = (): Accessory[] => {
  const data = localStorage.getItem(ACCESSORIES_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Get all saved clothing items
 * @returns Array of clothing items
 */
export const getSavedClothing = (): Clothing[] => {
  const data = localStorage.getItem(CLOTHING_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Save an accessory to localStorage
 * @param accessory - Accessory to save
 */
export const saveAccessory = (accessory: Accessory): void => {
  const accessories = getSavedAccessories();
  accessories.push(accessory);
  localStorage.setItem(ACCESSORIES_KEY, JSON.stringify(accessories));
};

/**
 * Save a clothing item to localStorage
 * @param clothing - Clothing to save
 */
export const saveClothing = (clothing: Clothing): void => {
  const clothingItems = getSavedClothing();
  clothingItems.push(clothing);
  localStorage.setItem(CLOTHING_KEY, JSON.stringify(clothingItems));
};

/**
 * Apply accessory to avatar
 * @param avatarUrl - URL of the avatar
 * @param accessory - Accessory to apply
 * @returns URL of the avatar with accessory
 */
export const applyAccessory = async (
  avatarUrl: string,
  accessory: Accessory
): Promise<string> => {
  // This is a mock implementation
  // In a real app, this would send the avatar and accessory to a 3D rendering service
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  toast.success(`${accessory.name} applied to avatar`);
  
  // For demo, just return the original avatar URL
  return avatarUrl;
};

/**
 * Apply clothing to avatar
 * @param avatarUrl - URL of the avatar
 * @param clothing - Clothing to apply
 * @returns URL of the avatar with clothing
 */
export const applyClothing = async (
  avatarUrl: string,
  clothing: Clothing
): Promise<string> => {
  // This is a mock implementation
  // In a real app, this would send the avatar and clothing to a 3D rendering service
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  toast.success(`${clothing.name} applied to avatar`);
  
  // For demo, just return the original avatar URL
  return avatarUrl;
};
