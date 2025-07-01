-- Analytics Database Setup for Nexogen
-- Run this in your Supabase SQL editor

-- 1. Create ENUM for service types (if not exists)
DO $$ BEGIN
    CREATE TYPE service_type AS ENUM ('transcription', 'notes', 'summarization');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create users table (if not exists)
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    credits DECIMAL(10,2) DEFAULT 0.00,
    encryption_key_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create usage_tracking table (if not exists)
CREATE TABLE IF NOT EXISTS usage_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    service_type service_type NOT NULL,
    minutes_used DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,4) NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create credit_transactions table (if not exists)
CREATE TABLE IF NOT EXISTS credit_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'refund')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_created_at ON usage_tracking(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_service_type ON usage_tracking(service_type);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at);

-- 6. Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies

-- Users can view and update their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Users can view their own usage tracking
CREATE POLICY "Users can view own usage" ON usage_tracking
    FOR SELECT USING (user_id = auth.uid());

-- System can insert usage tracking
CREATE POLICY "System can insert usage tracking" ON usage_tracking
    FOR INSERT WITH CHECK (true);

-- Users can view their own credit transactions
CREATE POLICY "Users can view own transactions" ON credit_transactions
    FOR SELECT USING (user_id = auth.uid());

-- System can insert credit transactions
CREATE POLICY "System can insert credit transactions" ON credit_transactions
    FOR INSERT WITH CHECK (true);

-- 8. Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users (id, email, credits)
    VALUES (NEW.id, NEW.email, 10.00); -- Give new users $10 in credits
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 10. Create function to get user analytics stats
CREATE OR REPLACE FUNCTION get_user_analytics_stats(p_user_id UUID)
RETURNS TABLE (
    current_balance DECIMAL(10,2),
    total_minutes DECIMAL(10,2),
    total_cost DECIMAL(10,4),
    usage_trend DECIMAL(5,2),
    average_daily_usage DECIMAL(5,2),
    peak_usage_day TEXT,
    most_used_service TEXT
) AS $$
DECLARE
    week_start DATE;
    prev_week_start DATE;
    current_week_minutes DECIMAL(10,2);
    current_week_cost DECIMAL(10,4);
    prev_week_minutes DECIMAL(10,2);
    usage_trend DECIMAL(5,2);
    avg_daily DECIMAL(5,2);
    peak_day TEXT;
    most_service TEXT;
BEGIN
    -- Get current week start (Monday)
    week_start := DATE_TRUNC('week', CURRENT_DATE)::DATE;
    prev_week_start := week_start - INTERVAL '7 days';
    
    -- Get current week usage
    SELECT COALESCE(SUM(minutes_used), 0), COALESCE(SUM(cost), 0)
    INTO current_week_minutes, current_week_cost
    FROM usage_tracking
    WHERE user_id = p_user_id AND created_at >= week_start;
    
    -- Get previous week usage
    SELECT COALESCE(SUM(minutes_used), 0)
    INTO prev_week_minutes
    FROM usage_tracking
    WHERE user_id = p_user_id AND created_at >= prev_week_start AND created_at < week_start;
    
    -- Calculate usage trend
    IF prev_week_minutes > 0 THEN
        usage_trend := ((current_week_minutes - prev_week_minutes) / prev_week_minutes) * 100;
    ELSE
        usage_trend := 0;
    END IF;
    
    -- Calculate average daily usage
    SELECT COALESCE(AVG(minutes_used), 0)
    INTO avg_daily
    FROM usage_tracking
    WHERE user_id = p_user_id AND created_at >= week_start;
    
    -- Get peak usage day
    SELECT day_name
    INTO peak_day
    FROM (
        SELECT 
            TO_CHAR(created_at, 'Day') as day_name,
            SUM(minutes_used) as total_minutes
        FROM usage_tracking
        WHERE user_id = p_user_id AND created_at >= week_start
        GROUP BY day_name
        ORDER BY total_minutes DESC
        LIMIT 1
    ) peak_days;
    
    -- Get most used service
    SELECT service_name
    INTO most_service
    FROM (
        SELECT 
            service_type::TEXT as service_name,
            SUM(minutes_used) as total_minutes
        FROM usage_tracking
        WHERE user_id = p_user_id AND created_at >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY service_type
        ORDER BY total_minutes DESC
        LIMIT 1
    ) service_usage;
    
    RETURN QUERY
    SELECT 
        u.credits as current_balance,
        current_week_minutes as total_minutes,
        current_week_cost as total_cost,
        usage_trend,
        avg_daily,
        COALESCE(peak_day, 'Monday') as peak_usage_day,
        COALESCE(most_service, 'transcription') as most_used_service
    FROM users u
    WHERE u.id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Create function to get daily usage
CREATE OR REPLACE FUNCTION get_user_daily_usage(p_user_id UUID, p_days INTEGER DEFAULT 7)
RETURNS TABLE (
    date DATE,
    minutes DECIMAL(10,2),
    cost DECIMAL(10,4)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        DATE(ut.created_at) as date,
        COALESCE(SUM(ut.minutes_used), 0) as minutes,
        COALESCE(SUM(ut.cost), 0) as cost
    FROM generate_series(
        CURRENT_DATE - (p_days - 1) * INTERVAL '1 day',
        CURRENT_DATE,
        INTERVAL '1 day'
    ) AS dates(date)
    LEFT JOIN usage_tracking ut ON DATE(ut.created_at) = dates.date AND ut.user_id = p_user_id
    GROUP BY dates.date
    ORDER BY dates.date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Create function to get service breakdown
CREATE OR REPLACE FUNCTION get_user_service_breakdown(p_user_id UUID, p_days INTEGER DEFAULT 30)
RETURNS TABLE (
    service_type TEXT,
    total_minutes DECIMAL(10,2),
    percentage DECIMAL(5,2)
) AS $$
DECLARE
    total_minutes DECIMAL(10,2);
BEGIN
    -- Get total minutes
    SELECT COALESCE(SUM(minutes_used), 0)
    INTO total_minutes
    FROM usage_tracking
    WHERE user_id = p_user_id AND created_at >= CURRENT_DATE - (p_days * INTERVAL '1 day');
    
    RETURN QUERY
    SELECT 
        ut.service_type::TEXT,
        COALESCE(SUM(ut.minutes_used), 0) as total_minutes,
        CASE 
            WHEN total_minutes > 0 THEN (SUM(ut.minutes_used) / total_minutes) * 100
            ELSE 0
        END as percentage
    FROM usage_tracking ut
    WHERE ut.user_id = p_user_id AND ut.created_at >= CURRENT_DATE - (p_days * INTERVAL '1 day')
    GROUP BY ut.service_type
    ORDER BY total_minutes DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 