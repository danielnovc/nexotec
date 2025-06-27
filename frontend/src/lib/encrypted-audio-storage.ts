import { encryptData, generateEncryptionKey } from './encryption';

interface EncryptedAudioMetadata {
  originalName: string;
  encryptedAt: string;
  encryptionVersion: string;
  fileSize: number;
  duration?: number;
  mimeType: string;
}

interface EncryptedAudioUploadResult {
  success: boolean;
  fileUrl?: string;
  metadata?: EncryptedAudioMetadata;
  error?: string;
}

/**
 * Encrypt audio file before uploading to storage
 */
export async function encryptAudioFile(
  audioBlob: Blob, 
  fileName: string,
  encryptionKey: string
): Promise<{ encryptedBlob: Blob; metadata: EncryptedAudioMetadata }> {
  try {
    // Convert audio blob to base64
    const base64Audio = await blobToBase64(audioBlob);
    
    // Create metadata
    const metadata: EncryptedAudioMetadata = {
      originalName: fileName,
      encryptedAt: new Date().toISOString(),
      encryptionVersion: '1.0',
      fileSize: audioBlob.size,
      mimeType: audioBlob.type,
    };

    // Encrypt the audio data
    const encryptedData = await encryptData(base64Audio, encryptionKey);
    
    // Create a new blob with encrypted data and metadata
    const encryptedContent = {
      encrypted: encryptedData,
      metadata: metadata
    };
    
    const encryptedBlob = new Blob([JSON.stringify(encryptedContent)], {
      type: 'application/json'
    });

    return { encryptedBlob, metadata };
  } catch (error) {
    throw new Error(`Failed to encrypt audio file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypt audio file from storage
 */
export async function decryptAudioFile(
  encryptedBlob: Blob,
  encryptionKey: string
): Promise<{ audioBlob: Blob; metadata: EncryptedAudioMetadata }> {
  try {
    // Read the encrypted content
    const encryptedText = await encryptedBlob.text();
    const encryptedContent = JSON.parse(encryptedText);
    
    // Decrypt the audio data
    const { decryptData } = await import('./encryption');
    const decryptedBase64 = await decryptData(encryptedContent.encrypted, encryptionKey);
    
    // Convert base64 back to blob
    const audioBlob = await base64ToBlob(decryptedBase64, encryptedContent.metadata.mimeType);
    
    return { 
      audioBlob, 
      metadata: encryptedContent.metadata 
    };
  } catch (error) {
    throw new Error(`Failed to decrypt audio file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload encrypted audio to Supabase Storage
 */
export async function uploadEncryptedAudioToStorage(
  audioBlob: Blob,
  fileName: string,
  encryptionKey: string,
  storage: any // S3Storage instance
): Promise<EncryptedAudioUploadResult> {
  try {
    // Encrypt the audio file
    const { encryptedBlob, metadata } = await encryptAudioFile(audioBlob, fileName, encryptionKey);
    
    // Generate encrypted filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const encryptedFileName = `encrypted-${timestamp}-${fileName}.enc`;
    
    // Upload encrypted file
    const uploadResult = await storage.uploadAudioFile(
      encryptedBlob,
      encryptedFileName,
      'application/json'
    );
    
    if (uploadResult.success) {
      return {
        success: true,
        fileUrl: uploadResult.fileUrl,
        metadata
      };
    } else {
      return {
        success: false,
        error: uploadResult.error
      };
    }
  } catch (error) {
    return {
      success: false,
      error: `Encrypted upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Download and decrypt audio from storage
 */
export async function downloadEncryptedAudioFromStorage(
  fileUrl: string,
  encryptionKey: string
): Promise<{ audioBlob: Blob; metadata: EncryptedAudioMetadata }> {
  try {
    // Download the encrypted file
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
    }
    
    const encryptedBlob = await response.blob();
    
    // Decrypt the audio file
    return await decryptAudioFile(encryptedBlob, encryptionKey);
  } catch (error) {
    throw new Error(`Failed to download encrypted audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Convert blob to base64
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Convert base64 to blob
 */
function base64ToBlob(base64: string, mimeType: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      // Convert base64 to binary
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const blob = new Blob([bytes], { type: mimeType });
      resolve(blob);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Check if a file is encrypted
 */
export function isEncryptedAudioFile(blob: Blob): boolean {
  return blob.type === 'application/json';
} 