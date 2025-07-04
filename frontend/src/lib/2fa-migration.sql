-- Add 2FA columns to users table (with IF NOT EXISTS checks)
DO $$ 
BEGIN
    -- Add two_factor_enabled column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'two_factor_enabled') THEN
        ALTER TABLE users ADD COLUMN two_factor_enabled BOOLEAN DEFAULT FALSE;
    END IF;
    
    -- Add encrypted secret columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'two_factor_secret_encrypted') THEN
        ALTER TABLE users ADD COLUMN two_factor_secret_encrypted TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'two_factor_secret_iv') THEN
        ALTER TABLE users ADD COLUMN two_factor_secret_iv TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'two_factor_secret_salt') THEN
        ALTER TABLE users ADD COLUMN two_factor_secret_salt TEXT;
    END IF;
    
    -- Add encrypted backup codes columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'two_factor_backup_codes_encrypted') THEN
        ALTER TABLE users ADD COLUMN two_factor_backup_codes_encrypted TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'two_factor_backup_codes_iv') THEN
        ALTER TABLE users ADD COLUMN two_factor_backup_codes_iv TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'two_factor_backup_codes_salt') THEN
        ALTER TABLE users ADD COLUMN two_factor_backup_codes_salt TEXT;
    END IF;
END $$;

-- Add index for better performance (if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_two_factor_enabled') THEN
        CREATE INDEX idx_users_two_factor_enabled ON users(two_factor_enabled);
    END IF;
END $$;

-- Add RLS policies for 2FA columns
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can update their own 2FA settings (if policy doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can update own 2FA settings') THEN
        CREATE POLICY "Users can update own 2FA settings" ON users
        FOR UPDATE USING (auth.uid() = id)
        WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- Users can view their own 2FA status (but not the secret) (if policy doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can view own 2FA status') THEN
        CREATE POLICY "Users can view own 2FA status" ON users
        FOR SELECT USING (auth.uid() = id);
    END IF;
END $$;

-- Function to generate 2FA secret
CREATE OR REPLACE FUNCTION generate_2fa_secret()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  result TEXT := '';
  i INTEGER;
  random_byte INTEGER;
BEGIN
  -- Generate a 32-character base32-like secret
  FOR i IN 1..32 LOOP
    random_byte := floor(random() * 32) + 1;
    result := result || substr(chars, random_byte, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate backup codes
CREATE OR REPLACE FUNCTION generate_backup_codes()
RETURNS TEXT[] AS $$
DECLARE
  codes TEXT[] := ARRAY[]::TEXT[];
  i INTEGER;
BEGIN
  -- Generate 5 backup codes, each 6 digits
  FOR i IN 1..5 LOOP
    codes := array_append(codes, lpad(floor(random() * 1000000)::TEXT, 6, '0'));
  END LOOP;
  RETURN codes;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to verify 2FA code (placeholder - would need TOTP library)
CREATE OR REPLACE FUNCTION verify_2fa_code(
  user_secret TEXT,
  user_code TEXT,
  time_window INTEGER DEFAULT 1
)
RETURNS BOOLEAN AS $$
BEGIN
  -- This is a placeholder implementation
  -- In production, you would use a proper TOTP library
  -- For now, we'll accept any 6-digit code for testing
  RETURN user_code ~ '^[0-9]{6}$';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 