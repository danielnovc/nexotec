"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useCredits } from "@/hooks/useCredits"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Loader2, User, Mail, Calendar, Shield, CreditCard, Settings, LogOut, Receipt, Download, Plus, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { CreditTopUpModal } from "@/components/credit-topup-modal"

interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  credits: number
  is_enterprise_admin?: boolean
}

export default function AccountPage() {
  const { user, signOut } = useAuth()
  const { refreshCredits } = useCredits()

  const router = useRouter()
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  
  const [formData, setFormData] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      
      // Fetch user profile from the users table
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (error) {
        console.error('Error fetching profile:', error)
        // If user doesn't exist in users table, create a basic profile
        const basicProfile: UserProfile = {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || '',
          avatar_url: user.user_metadata?.avatar_url || '',
          created_at: user.created_at,
          credits: 0,
          is_enterprise_admin: false
        }
        setProfile(basicProfile)
        setFormData({
          full_name: basicProfile.full_name || '',
          email: basicProfile.email
        })
      } else {
        setProfile(data)
        setFormData({
          full_name: data.full_name || '',
          email: data.email
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error("Failed to load profile information.")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user || !profile) return
    
    try {
      setSaving(true)
      
      // Update user metadata in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: formData.full_name }
      })
      
      if (authError) throw authError
      
      // Update user profile in the users table
      const { error: profileError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: formData.email,
          full_name: formData.full_name,
          updated_at: new Date().toISOString()
        })
      
      if (profileError) throw profileError
      
      // Refresh profile data
      await fetchProfile()
      
      setEditing(false)
      toast.success("Profile updated successfully.")
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error("Failed to sign out. Please try again.")
    }
  }



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Profile not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings, profile information, and billing.
          </p>
        </div>
        <CreditTopUpModal>
          <Button className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Top Up Credits
          </Button>
        </CreditTopUpModal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and profile details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile.avatar_url} alt={profile.full_name || 'User'} />
                <AvatarFallback className="text-lg">
                  {(profile.full_name || profile.email).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{profile.full_name || 'No name set'}</p>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                {profile.is_enterprise_admin && (
                  <Badge variant="secondary" className="mt-1">
                    <Shield className="h-3 w-3 mr-1" />
                    Enterprise Admin
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {editing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Full Name</p>
                    <p className="text-muted-foreground">{profile.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{profile.email}</p>
                  </div>
                </div>
                <Button onClick={() => setEditing(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Billing & Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Billing & Payments
            </CardTitle>
            <CardDescription>
              Manage your payment methods and billing information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Available Credits</span>
                </div>
                <span className="text-sm font-medium">
                  ${profile.credits?.toFixed(2) || '0.00'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Current Plan</span>
                </div>
                <Badge variant="outline">Free</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Next Billing</span>
                </div>
                <span className="text-sm text-muted-foreground">No upcoming charges</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button 
                onClick={() => router.push('/dashboard/billing')}
                className="w-full"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Billing & Payments
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => router.push('/dashboard/billing')}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Invoices
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Details
          </CardTitle>
          <CardDescription>
            View your account information and status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Account Status</span>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Member Since</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(profile.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Available Credits</span>
              </div>
              <span className="text-sm font-medium">
                ${profile.credits?.toFixed(2) || '0.00'}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button 
              variant="destructive" 
              onClick={handleSignOut}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 