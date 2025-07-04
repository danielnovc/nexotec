"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { initializeS3Storage } from "@/lib/s3-storage"

interface SupabaseConnectModalProps {
  open: boolean
  onClose: () => void
  onS3ConfigSave?: (config: { accessKeyId: string; secretAccessKey: string; bucketName: string }) => void
}

export function SupabaseConnectModal({ open, onClose, onS3ConfigSave }: SupabaseConnectModalProps) {
  const [showS3Config, setShowS3Config] = useState(false)
  const [accessKeyId, setAccessKeyId] = useState("")
  const [secretAccessKey, setSecretAccessKey] = useState("")
  const [bucketName, setBucketName] = useState("audio-recordings")
  const [isLoading, setIsLoading] = useState(false)

  const handleS3ConfigSave = async () => {
    if (!accessKeyId || !secretAccessKey || !bucketName) {
      toast.error("Please fill in all S3 fields")
      return
    }

    setIsLoading(true)
    try {
      // Test the configuration by initializing S3 storage
      const storage = initializeS3Storage(accessKeyId, secretAccessKey, bucketName)
      
      // Save to localStorage
      localStorage.setItem("s3AccessKeyId", accessKeyId)
      localStorage.setItem("s3SecretAccessKey", secretAccessKey)
      localStorage.setItem("s3BucketName", bucketName)
      
      if (onS3ConfigSave) {
        onS3ConfigSave({ accessKeyId, secretAccessKey, bucketName })
      }
      
      toast.success("S3 configuration saved successfully")
      setShowS3Config(false)
    } catch (error) {
      toast.error("Failed to save S3 configuration")
      console.error("S3 config error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadSaved = () => {
    const savedAccessKeyId = localStorage.getItem("s3AccessKeyId")
    const savedSecretAccessKey = localStorage.getItem("s3SecretAccessKey")
    const savedBucketName = localStorage.getItem("s3BucketName")
    
    if (savedAccessKeyId) setAccessKeyId(savedAccessKeyId)
    if (savedSecretAccessKey) setSecretAccessKey(savedSecretAccessKey)
    if (savedBucketName) setBucketName(savedBucketName)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-2xl shadow-2xl max-w-lg w-full p-8 relative bg-background dark:bg-gray-900 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
            
            {!showS3Config ? (
              <>
                <h2 className="text-2xl font-bold mb-2">Supabase</h2>
                <p className="mb-6 text-muted-foreground">
                  Store your transcription data securely using your own Supabase account via API connection. <br />
                  <span className="block mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <strong>Data Safety:</strong> We do <u>not</u> have access to your private Supabase account. All data is managed and stored directly in your own Supabase instance for maximum privacy.
                  </span>
                </p>
                <div className="mb-6 p-4 rounded-xl bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">What is Supabase?</span>
                  </div>
                  <p className="text-sm mb-4">
                    Supabase is a secure platform for building apps with user authentication, data storage, and backend capabilities. By connecting your Supabase account, you control where your transcription data is stored and managed—our app only interacts with your Supabase via API and never accesses your credentials or private data.
                  </p>
                  <div className="flex gap-2">
                    <a href="https://supabase.com/docs" target="_blank" rel="noopener" className="px-3 py-1 rounded bg-muted-foreground/10 hover:bg-muted-foreground/20 text-sm font-medium">See docs</a>
                    <a href="https://supabase.com/docs/guides/getting-started" target="_blank" rel="noopener" className="px-3 py-1 rounded bg-muted-foreground/10 hover:bg-muted-foreground/20 text-sm font-medium">Watch tutorial</a>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-yellow-600 text-white px-2 py-0.5 rounded">Admin</span>
                    <span className="font-semibold">Organizations</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Connected Supabase organizations will be accessible only to you and members you authorize in your workspace.</p>
                </div>
                <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">New</span>
                    <span className="font-semibold">Audio Storage Setup</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Configure S3 credentials to automatically save audio recordings to your Supabase Storage bucket.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowS3Config(true)}
                    className="w-full"
                  >
                    Configure S3 Storage
                  </Button>
                </div>
                <div className="flex justify-end">
                  <button className="px-4 py-2 rounded bg-[#3ECF8E] text-black font-semibold hover:bg-[#36b87a] transition" onClick={onClose}>Connect Supabase</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">S3 Configuration</h2>
                <p className="mb-6 text-muted-foreground">
                  Configure your Supabase Storage S3 credentials for audio file storage. Your credentials are stored locally and never sent to our servers.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="access-key-id" className="text-sm font-medium">Access Key ID</Label>
                    <Input
                      id="access-key-id"
                      value={accessKeyId}
                      onChange={(e) => setAccessKeyId(e.target.value)}
                      placeholder="Enter your S3 access key ID"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="secret-access-key" className="text-sm font-medium">Secret Access Key</Label>
                    <Input
                      id="secret-access-key"
                      type="password"
                      value={secretAccessKey}
                      onChange={(e) => setSecretAccessKey(e.target.value)}
                      placeholder="Enter your S3 secret access key"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bucket-name" className="text-sm font-medium">Bucket Name</Label>
                    <Input
                      id="bucket-name"
                      value={bucketName}
                      onChange={(e) => setBucketName(e.target.value)}
                      placeholder="audio-recordings"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-muted text-sm">
                  <p><strong>Endpoint:</strong> [Your Supabase Storage Endpoint]</p>
                  <p><strong>Region:</strong> [Your Supabase Region]</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleLoadSaved} className="flex-1">
                    Load Saved
                  </Button>
                  <Button variant="outline" onClick={() => setShowS3Config(false)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleS3ConfigSave} disabled={isLoading} className="flex-1">
                    {isLoading ? "Saving..." : "Save Configuration"}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 