/*
  # Set up Google OAuth and enhance profiles table

  1. Updates to profiles table
    - Add trigger to handle new user signups from OAuth
    - Ensure proper handling of Google OAuth user data

  2. Functions
    - Create function to handle new user creation from auth.users
    - Automatically create profile when user signs up via OAuth

  3. Triggers
    - Set up trigger to automatically create profile for new auth users
*/

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    profile_picture,
    role,
    verified,
    profile_complete
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'donor'),
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update existing profiles to handle OAuth users
DO $$
BEGIN
  -- Update verification status based on email confirmation
  UPDATE public.profiles 
  SET verified = true 
  WHERE id IN (
    SELECT id FROM auth.users 
    WHERE email_confirmed_at IS NOT NULL
  );
END $$;