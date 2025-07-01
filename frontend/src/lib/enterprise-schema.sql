-- Enterprise Database Schema for Nexogen
-- Run this in your Supabase SQL editor

-- 1. Create ENUM for user roles
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'user');

-- 2. Create ENUM for service types
CREATE TYPE service_type AS ENUM ('transcription', 'notes', 'summarization');

-- 3. Create ENUM for billing status
CREATE TYPE billing_status AS ENUM ('pending', 'billed', 'paid');

-- 4. Create Enterprise table
CREATE TABLE enterprises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    admin_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Update users table (if it doesn't exist, create it)
-- Note: This assumes you have a users table. If not, create it first.
-- You may need to modify this based on your existing users table structure

-- Add enterprise columns to existing users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_enterprise BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS enterprise_id UUID REFERENCES enterprises(id) ON DELETE SET NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'user';

-- 6. Create Usage Tracking table
CREATE TABLE usage_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    enterprise_id UUID REFERENCES enterprises(id) ON DELETE CASCADE,
    service_type service_type NOT NULL,
    minutes_used DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,4) NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create Enterprise Billing table
CREATE TABLE enterprise_billing (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    enterprise_id UUID REFERENCES enterprises(id) ON DELETE CASCADE,
    month VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    total_minutes DECIMAL(10,2) DEFAULT 0,
    total_cost DECIMAL(10,4) DEFAULT 0,
    status billing_status DEFAULT 'pending',
    billing_date TIMESTAMP WITH TIME ZONE,
    paid_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(enterprise_id, month)
);

-- 8. Create indexes for better performance
CREATE INDEX idx_users_enterprise_id ON users(enterprise_id);
CREATE INDEX idx_users_is_enterprise ON users(is_enterprise);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_usage_tracking_user_id ON usage_tracking(user_id);
CREATE INDEX idx_usage_tracking_enterprise_id ON usage_tracking(enterprise_id);
CREATE INDEX idx_usage_tracking_created_at ON usage_tracking(created_at);
CREATE INDEX idx_enterprise_billing_enterprise_id ON enterprise_billing(enterprise_id);
CREATE INDEX idx_enterprise_billing_month ON enterprise_billing(month);

-- 9. Create RLS (Row Level Security) policies

-- Enable RLS on all tables
ALTER TABLE enterprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_billing ENABLE ROW LEVEL SECURITY;

-- Enterprise policies
CREATE POLICY "Enterprise admins can view their enterprise" ON enterprises
    FOR SELECT USING (
        auth.uid() = admin_user_id OR 
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.enterprise_id = enterprises.id 
            AND users.role IN ('admin', 'manager')
        )
    );

CREATE POLICY "Enterprise admins can update their enterprise" ON enterprises
    FOR UPDATE USING (
        auth.uid() = admin_user_id OR 
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.enterprise_id = enterprises.id 
            AND users.role = 'admin'
        )
    );

-- Usage tracking policies
CREATE POLICY "Users can view their own usage" ON usage_tracking
    FOR SELECT USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.enterprise_id = usage_tracking.enterprise_id 
            AND users.role IN ('admin', 'manager')
        )
    );

CREATE POLICY "System can insert usage tracking" ON usage_tracking
    FOR INSERT WITH CHECK (true);

-- Enterprise billing policies
CREATE POLICY "Enterprise admins can view billing" ON enterprise_billing
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.enterprise_id = enterprise_billing.enterprise_id 
            AND users.role IN ('admin', 'manager')
        )
    );

-- 10. Create functions for common operations

-- Function to get enterprise usage for a date range
CREATE OR REPLACE FUNCTION get_enterprise_usage(
    p_enterprise_id UUID,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS TABLE (
    date DATE,
    total_minutes DECIMAL(10,2),
    total_cost DECIMAL(10,4),
    transcription_minutes DECIMAL(10,2),
    notes_minutes DECIMAL(10,2),
    summarization_minutes DECIMAL(10,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        DATE(ut.created_at) as date,
        SUM(ut.minutes_used) as total_minutes,
        SUM(ut.cost) as total_cost,
        SUM(CASE WHEN ut.service_type = 'transcription' THEN ut.minutes_used ELSE 0 END) as transcription_minutes,
        SUM(CASE WHEN ut.service_type = 'notes' THEN ut.minutes_used ELSE 0 END) as notes_minutes,
        SUM(CASE WHEN ut.service_type = 'summarization' THEN ut.minutes_used ELSE 0 END) as summarization_minutes
    FROM usage_tracking ut
    WHERE ut.enterprise_id = p_enterprise_id
    AND DATE(ut.created_at) BETWEEN p_start_date AND p_end_date
    GROUP BY DATE(ut.created_at)
    ORDER BY date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user usage for a date range
CREATE OR REPLACE FUNCTION get_user_usage(
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS TABLE (
    date DATE,
    total_minutes DECIMAL(10,2),
    total_cost DECIMAL(10,4),
    service_type service_type
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        DATE(ut.created_at) as date,
        ut.minutes_used as total_minutes,
        ut.cost as total_cost,
        ut.service_type
    FROM usage_tracking ut
    WHERE ut.user_id = p_user_id
    AND DATE(ut.created_at) BETWEEN p_start_date AND p_end_date
    ORDER BY date, service_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_enterprises_updated_at BEFORE UPDATE ON enterprises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enterprise_billing_updated_at BEFORE UPDATE ON enterprise_billing
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 