export interface EncryptedData {
  encrypted: string;
  iv: string;
  salt: string;
  tag: string;
}

export interface EncryptionConfig {
  algorithm: 'AES-GCM';
  keyLength: 256; // 256 bits
  ivLength: 12; // 96 bits for AES-GCM
  saltLength: 32; // 256 bits
  iterations: 100000; // PBKDF2 iterations
}

const CONFIG: EncryptionConfig = {
  algorithm: 'AES-GCM',
  keyLength: 256,
  ivLength: 12,
  saltLength: 32,
  iterations: 100000,
};

/**
 * Convert string to Uint8Array
 */
function stringToUint8Array(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

/**
 * Convert Uint8Array to string
 */
function uint8ArrayToString(array: Uint8Array): string {
  const decoder = new TextDecoder();
  return decoder.decode(array);
}

/**
 * Convert Uint8Array to hex string
 */
function uint8ArrayToHex(array: Uint8Array): string {
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Convert hex string to Uint8Array
 */
function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

/**
 * Generate random bytes
 */
function generateRandomBytes(length: number): Uint8Array {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return array;
}

/**
 * Derive an encryption key from a password using PBKDF2
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  const baseKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: CONFIG.iterations,
      hash: 'SHA-256'
    },
    baseKey,
    {
      name: CONFIG.algorithm,
      length: CONFIG.keyLength
    },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt data using AES-GCM
 */
export async function encryptData(data: string, password: string): Promise<EncryptedData> {
  try {
    // Generate random salt and IV
    const salt = generateRandomBytes(CONFIG.saltLength);
    const iv = generateRandomBytes(CONFIG.ivLength);
    
    // Derive key from password
    const key = await deriveKey(password, salt);
    
    // Convert data to Uint8Array
    const dataBuffer = stringToUint8Array(data);
    
    // Encrypt the data
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: CONFIG.algorithm,
        iv: iv
      },
      key,
      dataBuffer
    );
    
    return {
      encrypted: uint8ArrayToHex(new Uint8Array(encryptedBuffer)),
      iv: uint8ArrayToHex(iv),
      salt: uint8ArrayToHex(salt),
      tag: '', // AES-GCM includes the tag in the encrypted data
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt data using AES-GCM
 */
export async function decryptData(encryptedData: EncryptedData, password: string): Promise<string> {
  try {
    // Convert hex strings back to Uint8Arrays
    const salt = hexToUint8Array(encryptedData.salt);
    const iv = hexToUint8Array(encryptedData.iv);
    const encrypted = hexToUint8Array(encryptedData.encrypted);
    
    // Derive key from password
    const key = await deriveKey(password, salt);
    
    // Decrypt the data
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: CONFIG.algorithm,
        iv: iv
      },
      key,
      encrypted
    );
    
    return uint8ArrayToString(new Uint8Array(decryptedBuffer));
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data. The password might be incorrect or the data is corrupted.');
  }
}

/**
 * Generate a secure encryption key for the user
 */
export function generateEncryptionKey(): string {
  const keyBytes = generateRandomBytes(32);
  return uint8ArrayToHex(keyBytes);
}

/**
 * Hash a password for storage (one-way hash)
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = generateRandomBytes(16);
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  const baseKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  const hash = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    512 // 64 bytes
  );
  
  return `${uint8ArrayToHex(salt)}:${uint8ArrayToHex(new Uint8Array(hash))}`;
}

/**
 * Verify a password against a stored hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [saltHex, hashHex] = storedHash.split(':');
  const salt = hexToUint8Array(saltHex);
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  const baseKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  const testHash = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    512 // 64 bytes
  );
  
  return hashHex === uint8ArrayToHex(new Uint8Array(testHash));
}

/**
 * Encrypt transcription data
 */
export async function encryptTranscription(transcription: any, encryptionKey: string): Promise<EncryptedData> {
  const dataString = JSON.stringify(transcription);
  return await encryptData(dataString, encryptionKey);
}

/**
 * Decrypt transcription data
 */
export async function decryptTranscription(encryptedData: EncryptedData, encryptionKey: string): Promise<any> {
  const decryptedString = await decryptData(encryptedData, encryptionKey);
  return JSON.parse(decryptedString);
}

/**
 * Check if data is encrypted
 */
export function isEncrypted(data: any): boolean {
  return data && 
         typeof data === 'object' && 
         'encrypted' in data && 
         'iv' in data && 
         'salt' in data;
} 