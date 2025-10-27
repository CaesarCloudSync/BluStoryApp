import * as FileSystem from 'expo-file-system';
import { Skia } from '@shopify/react-native-skia';
import type { SkImage } from '@shopify/react-native-skia';
export const loadLocalFrame = async (
  fileUri: string,
  setBgImage: (img: SkImage | null) => void
): Promise<void> => {
  try {
    if (!fileUri?.startsWith('file://')) {
      console.warn('⚠️ LoadLocalFrame: Invalid URI', fileUri);
      setBgImage(null);
      return;
    }
    console.log('📁 Loading local frame from URI:', fileUri);

    // Fetch the file as a blob
    const response = await fetch(fileUri);
    const blob = await response.blob();

    // Read the blob as a base64 string using FileReader
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1]; // Extract base64 part
          resolve(base64String);
        } else {
          reject(new Error('Failed to read file as base64'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsDataURL(blob);
    });

    // Convert to Skia image
    const imageData = Skia.Data.fromBase64(base64Data);
    const skiaImg = Skia.Image.MakeImageFromEncoded(imageData);

    if (!skiaImg) {
      throw new Error('Failed to decode image data into Skia image.');
    }
    console.log(skiaImg)
    setBgImage(skiaImg);
  } catch (err) {
    console.error('❌ Error loading local frame:', err);
    setBgImage(null);
  }
};