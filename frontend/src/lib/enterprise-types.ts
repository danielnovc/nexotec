// Enterprise Types for Nexogen

export type UserRole = 'admin' | 'manager' | 'user';
export type ServiceType = 'transcription' | 'notes' | 'summarization';
export type BillingStatus = 'pending' | 'billed' | 'paid';

// Database Types
export interface Enterprise {
  id: string;
  name: string;
  admin_user_id: string;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  is_enterprise: boolean;
  enterprise_id?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UsageTracking {
  id: string;
  user_id: string;
  enterprise_id: string;
  service_type: ServiceType;
  minutes_used: number;
  cost: number;
  metadata: Record<string, any>;
  created_at: string;
}

export interface EnterpriseBilling {
  id: string;
  enterprise_id: string;
  month: string; // YYYY-MM format
  total_minutes: number;
  total_cost: number;
  status: BillingStatus;
  billing_date?: string;
  paid_date?: string;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface EnterpriseUsageResponse {
  date: string;
  total_minutes: number;
  total_cost: number;
  transcription_minutes: number;
  notes_minutes: number;
  summarization_minutes: number;
}

export interface UserUsageResponse {
  date: string;
  total_minutes: number;
  total_cost: number;
  service_type: ServiceType;
}

export interface EnterpriseStats {
  total_users: number;
  active_users: number;
  total_minutes: number;
  total_cost: number;
  usage_trend: number; // percentage change
}

export interface CreateUserRequest {
  email: string;
  full_name: string;
  role: UserRole;
  enterprise_id: string;
}

export interface UpdateUserRequest {
  id: string;
  full_name?: string;
  role?: UserRole;
  is_active?: boolean;
}

// Dashboard Data Types
export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  transcriptionMinutes: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface DashboardUsageData {
  date: string;
  minutes: number;
  cost: number;
}

export interface ServiceBreakdown {
  name: string;
  value: number;
  color: string;
}

// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      enterprises: {
        Row: Enterprise;
        Insert: Omit<Enterprise, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Enterprise, 'id' | 'created_at' | 'updated_at'>>;
      };
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      usage_tracking: {
        Row: UsageTracking;
        Insert: Omit<UsageTracking, 'id' | 'created_at'>;
        Update: Partial<Omit<UsageTracking, 'id' | 'created_at'>>;
      };
      enterprise_billing: {
        Row: EnterpriseBilling;
        Insert: Omit<EnterpriseBilling, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<EnterpriseBilling, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
    Functions: {
      get_enterprise_usage: {
        Args: {
          p_enterprise_id: string;
          p_start_date: string;
          p_end_date: string;
        };
        Returns: EnterpriseUsageResponse[];
      };
      get_user_usage: {
        Args: {
          p_user_id: string;
          p_start_date: string;
          p_end_date: string;
        };
        Returns: UserUsageResponse[];
      };
    };
  };
} 