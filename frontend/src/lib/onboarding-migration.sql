-- Add onboarding and 2FA reminder columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS onboarding_data JSONB,
ADD COLUMN IF NOT EXISTS show_2fa_reminder BOOLEAN DEFAULT FALSE;

-- Add comment for documentation
COMMENT ON COLUMN users.onboarding_completed IS 'Whether the user has completed the onboarding questionnaire';
COMMENT ON COLUMN users.onboarding_data IS 'JSON data from the onboarding questionnaire for analytics and personalization';
COMMENT ON COLUMN users.show_2fa_reminder IS 'Whether to show 2FA setup reminder to the user';

-- Update RLS policies to allow users to update these new columns
-- (The existing "Users can update own profile" policy should already cover this) 