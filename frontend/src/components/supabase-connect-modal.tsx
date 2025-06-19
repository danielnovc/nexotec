"use client"

import { motion, AnimatePresence } from "framer-motion"

export function SupabaseConnectModal({ open, onClose }: { open: boolean, onClose: () => void }) {
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
            className="rounded-2xl shadow-2xl max-w-lg w-full p-8 relative bg-background dark:bg-gray-900"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
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
            <div className="flex justify-end">
              <button className="px-4 py-2 rounded bg-[#3ECF8E] text-black font-semibold hover:bg-[#36b87a] transition" onClick={onClose}>Connect Supabase</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 