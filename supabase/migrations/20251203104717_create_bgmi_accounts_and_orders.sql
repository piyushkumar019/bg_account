/*
  # BGMI Account Sales Platform Database Schema

  ## Overview
  This migration creates the core database structure for a BGMI account sales platform.

  ## New Tables

  ### 1. `bgmi_accounts`
  Stores BGMI game accounts available for purchase
  - `id` (uuid, primary key) - Unique identifier for each account
  - `title` (text) - Display name/title for the account listing
  - `description` (text) - Detailed description of the account features
  - `level` (integer) - Account level in the game
  - `tier` (text) - Current ranked tier (e.g., Bronze, Silver, Gold, Platinum, Diamond, Crown, Ace, Conqueror)
  - `uc_amount` (integer) - Amount of UC (Unknown Cash) in the account
  - `skins_count` (integer) - Number of skins owned
  - `gun_skins_count` (integer) - Number of gun skins owned
  - `emotes_count` (integer) - Number of emotes owned
  - `price` (numeric) - Selling price in INR
  - `image_url` (text) - URL to account screenshot/image
  - `status` (text) - Account status: 'available', 'sold', 'reserved'
  - `featured` (boolean) - Whether this account is featured on homepage
  - `created_at` (timestamptz) - When the listing was created
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `purchase_inquiries`
  Stores customer inquiries and purchase requests
  - `id` (uuid, primary key) - Unique identifier for each inquiry
  - `account_id` (uuid, foreign key) - Reference to the account being inquired about
  - `customer_name` (text) - Name of the potential buyer
  - `customer_email` (text) - Email address for contact
  - `customer_phone` (text) - Phone number for contact
  - `message` (text) - Additional message or questions from customer
  - `status` (text) - Inquiry status: 'pending', 'contacted', 'completed', 'cancelled'
  - `created_at` (timestamptz) - When the inquiry was submitted

  ## Security

  ### Row Level Security (RLS)
  - RLS is enabled on both tables
  - Public read access is allowed for available accounts
  - Anyone can submit inquiries
  - Administrative operations would require authentication (for future implementation)

  ## Important Notes
  1. All accounts are publicly viewable to facilitate browsing
  2. Inquiry system allows customers to express interest without authentication
  3. Prices are stored as numeric for precision
  4. Status fields use text for flexibility (can be enhanced with enums later)
*/

-- Create bgmi_accounts table
CREATE TABLE IF NOT EXISTS bgmi_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  level integer NOT NULL DEFAULT 1,
  tier text NOT NULL DEFAULT 'Bronze',
  uc_amount integer DEFAULT 0,
  skins_count integer DEFAULT 0,
  gun_skins_count integer DEFAULT 0,
  emotes_count integer DEFAULT 0,
  price numeric(10, 2) NOT NULL,
  image_url text,
  status text NOT NULL DEFAULT 'available',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create purchase_inquiries table
CREATE TABLE IF NOT EXISTS purchase_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid REFERENCES bgmi_accounts(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  message text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE bgmi_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bgmi_accounts
-- Allow public to view available accounts
CREATE POLICY "Anyone can view available accounts"
  ON bgmi_accounts
  FOR SELECT
  USING (status = 'available' OR status = 'reserved');

-- RLS Policies for purchase_inquiries
-- Allow anyone to submit inquiries
CREATE POLICY "Anyone can submit inquiries"
  ON purchase_inquiries
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bgmi_accounts_status ON bgmi_accounts(status);
CREATE INDEX IF NOT EXISTS idx_bgmi_accounts_featured ON bgmi_accounts(featured);
CREATE INDEX IF NOT EXISTS idx_bgmi_accounts_price ON bgmi_accounts(price);
CREATE INDEX IF NOT EXISTS idx_purchase_inquiries_account_id ON purchase_inquiries(account_id);
CREATE INDEX IF NOT EXISTS idx_purchase_inquiries_status ON purchase_inquiries(status);

-- Insert sample data
INSERT INTO bgmi_accounts (title, description, level, tier, uc_amount, skins_count, gun_skins_count, emotes_count, price, status, featured)
VALUES
  ('Pro Crown Account', 'High-level Crown tier account with rare skins including Pharaoh X-Suit, Glacier M416, and many legendary items. Perfect for competitive play.', 65, 'Crown', 3500, 45, 28, 15, 12999.00, 'available', true),
  ('Ace Master Account', 'Ace tier account with Season 20 Conqueror title. Includes multiple Mythic outfits and weapon skins. Great stats and KD ratio.', 72, 'Ace', 5200, 68, 42, 22, 18999.00, 'available', true),
  ('Diamond Starter Pack', 'Well-maintained Diamond account with Season upgrades. Good collection of skins and emotes. Ideal for mid-level players.', 48, 'Diamond', 1800, 32, 18, 12, 7999.00, 'available', false),
  ('Platinum Fresh Account', 'Platinum ranked account with clean history. Premium battle pass items and exclusive collaboration skins included.', 42, 'Platinum', 1200, 25, 15, 8, 5999.00, 'available', false),
  ('Conqueror Legend', 'Top-tier Conqueror account with Season 18, 19, 20 titles. Massive collection of rare items including Anniversary skins and limited edition weapons.', 80, 'Conqueror', 8500, 95, 62, 35, 29999.00, 'available', true),
  ('Gold Tier Bargain', 'Budget-friendly Gold tier account with decent progression. Good for players starting their competitive journey.', 35, 'Gold', 600, 18, 10, 5, 3999.00, 'available', false);
