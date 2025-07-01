import { createClient } from '@supabase/supabase-js';
import { 
  Enterprise, 
  User, 
  UsageTracking, 
  EnterpriseBilling,
  EnterpriseUsageResponse,
  UserUsageResponse,
  EnterpriseStats,
  CreateUserRequest,
  UpdateUserRequest,
  DashboardUser,
  DashboardUsageData,
  ServiceBreakdown,
  Database
} from './enterprise-types';

// Initialize Supabase client with enterprise types
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Enterprise API Functions

/**
 * Get enterprise information for the current user
 */
export async function getCurrentEnterprise(): Promise<Enterprise | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: userData } = await supabase
    .from('users')
    .select('enterprise_id')
    .eq('id', user.id)
    .single();

  if (!userData?.enterprise_id) return null;

  const { data: enterprise } = await supabase
    .from('enterprises')
    .select('*')
    .eq('id', userData.enterprise_id)
    .single();

  return enterprise;
}

/**
 * Get all users in the current enterprise
 */
export async function getEnterpriseUsers(): Promise<DashboardUser[]> {
  const enterprise = await getCurrentEnterprise();
  if (!enterprise) return [];

  const { data: users, error } = await supabase
    .from('users')
    .select(`
      id,
      email,
      full_name,
      avatar_url,
      role,
      created_at
    `)
    .eq('enterprise_id', enterprise.id);

  if (error) {
    console.error('Error fetching enterprise users:', error);
    return [];
  }

  // Get usage data for each user
  const usersWithUsage = await Promise.all(
    users.map(async (user) => {
      const usage = await getUserUsage(user.id);
      const totalMinutes = usage.reduce((sum, day) => sum + day.total_minutes, 0);
      
      return {
        id: user.id,
        name: user.full_name || user.email.split('@')[0],
        email: user.email,
        role: user.role,
        avatar: user.avatar_url,
        transcriptionMinutes: totalMinutes,
        lastActive: usage.length > 0 ? usage[0].date : user.created_at,
        status: usage.length > 0 ? 'active' : 'inactive'
      } as DashboardUser;
    })
  );

  return usersWithUsage;
}

/**
 * Get enterprise usage statistics
 */
export async function getEnterpriseStats(): Promise<EnterpriseStats> {
  const enterprise = await getCurrentEnterprise();
  if (!enterprise) {
    return {
      total_users: 0,
      active_users: 0,
      total_minutes: 0,
      total_cost: 0,
      usage_trend: 0
    };
  }

  // Get current month usage
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const { data: currentUsage } = await supabase
    .rpc('get_enterprise_usage', {
      p_enterprise_id: enterprise.id,
      p_start_date: startOfMonth.toISOString().split('T')[0],
      p_end_date: endOfMonth.toISOString().split('T')[0]
    });

  // Get last month usage for trend calculation
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const { data: lastMonthUsage } = await supabase
    .rpc('get_enterprise_usage', {
      p_enterprise_id: enterprise.id,
      p_start_date: startOfLastMonth.toISOString().split('T')[0],
      p_end_date: endOfLastMonth.toISOString().split('T')[0]
    });

  const currentTotalMinutes = currentUsage?.reduce((sum: number, day: EnterpriseUsageResponse) => sum + day.total_minutes, 0) || 0;
  const currentTotalCost = currentUsage?.reduce((sum: number, day: EnterpriseUsageResponse) => sum + day.total_cost, 0) || 0;
  const lastMonthTotalMinutes = lastMonthUsage?.reduce((sum: number, day: EnterpriseUsageResponse) => sum + day.total_minutes, 0) || 0;

  const usageTrend = lastMonthTotalMinutes > 0 
    ? ((currentTotalMinutes - lastMonthTotalMinutes) / lastMonthTotalMinutes) * 100 
    : 0;

  // Get user counts
  const { data: users } = await supabase
    .from('users')
    .select('id')
    .eq('enterprise_id', enterprise.id);

  const { data: activeUsers } = await supabase
    .from('usage_tracking')
    .select('user_id')
    .eq('enterprise_id', enterprise.id)
    .gte('created_at', startOfMonth.toISOString())
    .lte('created_at', endOfMonth.toISOString());

  const uniqueActiveUsers = new Set(activeUsers?.map(u => u.user_id) || []).size;

  return {
    total_users: users?.length || 0,
    active_users: uniqueActiveUsers,
    total_minutes: currentTotalMinutes,
    total_cost: currentTotalCost,
    usage_trend: usageTrend
  };
}

/**
 * Get enterprise usage data for charts
 */
export async function getEnterpriseUsageData(days: number = 7): Promise<DashboardUsageData[]> {
  const enterprise = await getCurrentEnterprise();
  if (!enterprise) return [];

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data: usage } = await supabase
    .rpc('get_enterprise_usage', {
      p_enterprise_id: enterprise.id,
      p_start_date: startDate.toISOString().split('T')[0],
      p_end_date: endDate.toISOString().split('T')[0]
    });

  return usage?.map((day: EnterpriseUsageResponse) => ({
    date: day.date,
    minutes: day.total_minutes,
    cost: day.total_cost
  })) || [];
}

/**
 * Get service breakdown for pie chart
 */
export async function getServiceBreakdown(): Promise<ServiceBreakdown[]> {
  const enterprise = await getCurrentEnterprise();
  if (!enterprise) return [];

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const { data: usage } = await supabase
    .rpc('get_enterprise_usage', {
      p_enterprise_id: enterprise.id,
      p_start_date: startOfMonth.toISOString().split('T')[0],
      p_end_date: endOfMonth.toISOString().split('T')[0]
    });

  if (!usage || usage.length === 0) return [];

  const totalMinutes = usage.reduce((sum: number, day: EnterpriseUsageResponse) => sum + day.total_minutes, 0);
  
  const transcriptionMinutes = usage.reduce((sum: number, day: EnterpriseUsageResponse) => sum + day.transcription_minutes, 0);
  const notesMinutes = usage.reduce((sum: number, day: EnterpriseUsageResponse) => sum + day.notes_minutes, 0);
  const summarizationMinutes = usage.reduce((sum: number, day: EnterpriseUsageResponse) => sum + day.summarization_minutes, 0);

  return [
    {
      name: 'Transcription',
      value: totalMinutes > 0 ? (transcriptionMinutes / totalMinutes) * 100 : 0,
      color: '#3B82F6'
    },
    {
      name: 'Notes',
      value: totalMinutes > 0 ? (notesMinutes / totalMinutes) * 100 : 0,
      color: '#8B5CF6'
    },
    {
      name: 'Summarization',
      value: totalMinutes > 0 ? (summarizationMinutes / totalMinutes) * 100 : 0,
      color: '#10B981'
    }
  ];
}

/**
 * Get user usage data
 */
export async function getUserUsage(userId: string, days: number = 30): Promise<UserUsageResponse[]> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data: usage } = await supabase
    .rpc('get_user_usage', {
      p_user_id: userId,
      p_start_date: startDate.toISOString().split('T')[0],
      p_end_date: endDate.toISOString().split('T')[0]
    });

  return usage || [];
}

/**
 * Create a new user in the enterprise
 */
export async function createEnterpriseUser(userData: CreateUserRequest): Promise<User | null> {
  const enterprise = await getCurrentEnterprise();
  if (!enterprise) return null;

  // First, create the user in Supabase Auth
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: 'temp-password-123', // User will need to reset this
    email_confirm: true,
    user_metadata: {
      full_name: userData.full_name
    }
  });

  if (authError) {
    console.error('Error creating auth user:', authError);
    return null;
  }

  // Then create the user record in our users table
  const { data: user, error: userError } = await supabase
    .from('users')
    .insert({
      id: authUser.user.id,
      email: userData.email,
      full_name: userData.full_name,
      is_enterprise: true,
      enterprise_id: enterprise.id,
      role: userData.role
    })
    .select()
    .single();

  if (userError) {
    console.error('Error creating user record:', userError);
    // Clean up the auth user if user record creation fails
    await supabase.auth.admin.deleteUser(authUser.user.id);
    return null;
  }

  return user;
}

/**
 * Update user information
 */
export async function updateEnterpriseUser(userId: string, updates: UpdateUserRequest): Promise<User | null> {
  const { data: user, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return null;
  }

  return user;
}

/**
 * Track usage for a service
 */
export async function trackUsage(
  userId: string,
  serviceType: 'transcription' | 'notes' | 'summarization',
  minutesUsed: number,
  cost: number,
  metadata: Record<string, any> = {}
): Promise<void> {
  const enterprise = await getCurrentEnterprise();
  if (!enterprise) return;

  const { error } = await supabase
    .from('usage_tracking')
    .insert({
      user_id: userId,
      enterprise_id: enterprise.id,
      service_type: serviceType,
      minutes_used: minutesUsed,
      cost: cost,
      metadata: metadata
    });

  if (error) {
    console.error('Error tracking usage:', error);
  }
}

/**
 * Check if current user is enterprise admin
 */
export async function isEnterpriseAdmin(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  return userData?.role === 'admin';
}

/**
 * Check if current user has enterprise access (either is_enterprise or role is admin)
 */
export async function hasEnterpriseAccess(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: userData } = await supabase
    .from('users')
    .select('is_enterprise, role')
    .eq('id', user.id)
    .single();

  return !!(userData?.is_enterprise || userData?.role === 'admin');
}



/**
 * Get enterprise billing information
 */
export async function getEnterpriseBilling(): Promise<EnterpriseBilling[]> {
  const enterprise = await getCurrentEnterprise();
  if (!enterprise) return [];

  const { data: billing } = await supabase
    .from('enterprise_billing')
    .select('*')
    .eq('enterprise_id', enterprise.id)
    .order('month', { ascending: false });

  return billing || [];
} 