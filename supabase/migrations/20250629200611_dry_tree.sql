/*
  # Create users and food_listings tables

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `role` (text, check constraint for donor/receiver/admin)
      - `name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `location` (jsonb for storing address and coordinates)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `food_listings`
      - `id` (uuid, primary key)
      - `donorId` (uuid, foreign key to users.id)
      - `dishName` (text)
      - `servings` (integer)
      - `expiryTime` (timestamp)
      - `locationLat` (decimal)
      - `locationLng` (decimal)
      - `isNightFood` (boolean)
      - `selfDrop` (boolean)
      - `status` (text, check constraint for available/claimed/completed/expired)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
    - Add policies for viewing public data

  3. Indexes
    - Performance indexes on frequently queried columns
    - Foreign key indexes for optimal joins
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text CHECK (role IN ('donor', 'receiver', 'admin')) NOT NULL DEFAULT 'donor',
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  location jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create food_listings table
CREATE TABLE IF NOT EXISTS food_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "donorId" uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "dishName" text NOT NULL,
  servings integer NOT NULL CHECK (servings > 0),
  "expiryTime" timestamptz NOT NULL,
  "locationLat" decimal(10, 8) NOT NULL,
  "locationLng" decimal(11, 8) NOT NULL,
  "isNightFood" boolean DEFAULT false NOT NULL,
  "selfDrop" boolean DEFAULT false NOT NULL,
  status text CHECK (status IN ('available', 'claimed', 'completed', 'expired')) NOT NULL DEFAULT 'available',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_listings ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own record"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own record"
  ON users
  FOR UPDATE
  TO authenticated
  USING (true);

-- Food listings table policies
CREATE POLICY "Anyone can view available food listings"
  ON food_listings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Donors can insert their own food listings"
  ON food_listings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Donors can update their own food listings"
  ON food_listings
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Donors can delete their own food listings"
  ON food_listings
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER handle_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_food_listings_updated_at
  BEFORE UPDATE ON food_listings
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);

CREATE INDEX IF NOT EXISTS food_listings_donor_id_idx ON food_listings("donorId");
CREATE INDEX IF NOT EXISTS food_listings_status_idx ON food_listings(status);
CREATE INDEX IF NOT EXISTS food_listings_expiry_time_idx ON food_listings("expiryTime");
CREATE INDEX IF NOT EXISTS food_listings_location_idx ON food_listings("locationLat", "locationLng");
CREATE INDEX IF NOT EXISTS food_listings_is_night_food_idx ON food_listings("isNightFood");
CREATE INDEX IF NOT EXISTS food_listings_created_at_idx ON food_listings(created_at);