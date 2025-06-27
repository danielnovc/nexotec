// S3 Storage utility for Supabase Storage
// Uses the S3 protocol to upload audio files to Supabase Storage

interface S3Config {
  endpoint: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}

interface UploadResult {
  success: boolean;
  fileUrl?: string;
  error?: string;
}

export class S3Storage {
  private config: S3Config;

  constructor(config: S3Config) {
    this.config = config;
  }

  /**
   * Upload an audio file to Supabase Storage via S3 protocol
   */
  async uploadAudioFile(
    file: Blob, 
    fileName: string, 
    contentType: string = 'audio/webm'
  ): Promise<UploadResult> {
    try {
      // Create the S3 request
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const key = `audio-recordings/${timestamp}-${fileName}`;
      
      // Prepare the request
      const url = `${this.config.endpoint}/${this.config.bucketName}/${key}`;
      
      // Create headers for S3
      const headers = {
        'Content-Type': contentType,
        'x-amz-content-sha256': await this.calculateSHA256(file),
        'x-amz-date': this.getFormattedDate(),
        'Authorization': this.generateAuthorizationHeader('PUT', key, contentType, file),
      };

      // Upload the file
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: file,
      });

      if (response.ok) {
        const fileUrl = `${this.config.endpoint}/${this.config.bucketName}/${key}`;
        return {
          success: true,
          fileUrl,
        };
      } else {
        const errorText = await response.text();
        return {
          success: false,
          error: `Upload failed: ${response.status} ${response.statusText} - ${errorText}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Calculate SHA256 hash of the file content
   */
  private async calculateSHA256(file: Blob): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Get formatted date for S3 request
   */
  private getFormattedDate(): string {
    const now = new Date();
    return now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  }

  /**
   * Generate AWS Signature V4 authorization header
   */
  private generateAuthorizationHeader(
    method: string, 
    key: string, 
    contentType: string, 
    file: Blob
  ): string {
    // This is a simplified version - in production, you'd want to use a proper AWS SDK
    // or implement the full AWS Signature V4 algorithm
    
    const date = this.getFormattedDate();
    const dateStamp = date.substring(0, 8);
    
    // For now, we'll use a basic approach - in production, implement proper AWS Signature V4
    const credential = `${this.config.accessKeyId}/${dateStamp}/${this.config.region}/s3/aws4_request`;
    
    return `AWS4-HMAC-SHA256 Credential=${credential}, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=placeholder`;
  }
}

// Default Supabase S3 configuration
export const defaultS3Config: S3Config = {
  endpoint: 'https://npdsnsgxyhurwoyfrege.supabase.co/storage/v1/s3',
  region: 'eu-north-1',
  accessKeyId: '', // Will be set from environment or user input
  secretAccessKey: '', // Will be set from environment or user input
  bucketName: 'audio-recordings', // Default bucket name
};

// Create a singleton instance
export const s3Storage = new S3Storage(defaultS3Config);

/**
 * Initialize S3 storage with user credentials
 */
export function initializeS3Storage(accessKeyId: string, secretAccessKey: string, bucketName?: string): S3Storage {
  const config: S3Config = {
    ...defaultS3Config,
    accessKeyId,
    secretAccessKey,
    bucketName: bucketName || defaultS3Config.bucketName,
  };
  
  return new S3Storage(config);
}

/**
 * Upload audio file with error handling
 */
export async function uploadAudioToStorage(
  file: Blob, 
  fileName: string, 
  storage: S3Storage
): Promise<UploadResult> {
  try {
    return await storage.uploadAudioFile(file, fileName);
  } catch (error) {
    return {
      success: false,
      error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
} 