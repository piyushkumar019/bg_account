export interface BGMIAccount {
  id: string;
  title: string;
  description: string;
  level: number;
  tier: string;
  uc_amount: number;
  skins_count: number;
  gun_skins_count: number;
  emotes_count: number;
  price: number;
  image_url: string | null;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface PurchaseInquiry {
  account_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  message: string;
}
