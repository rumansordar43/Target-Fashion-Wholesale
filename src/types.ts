export interface Product {
  id: number;
  title: string;
  sku?: string;
  slug: string;
  category: string;
  retail_price: number;
  wholesale_price_range?: string; // For internal use or display logic
  image_url: string;
  image_url_2?: string;
  gallery?: string[];
  description: string;
  badge?: 'NEW' | 'HOT' | 'BEST SELLER' | 'LIMITED STOCK';
  fabric?: string;
  gsm?: string;
  sizes?: string[];
  colors?: { name: string, hex: string }[];
  stock_count?: number;
  moq?: number;
  tags?: string[];
  status?: 'Active' | 'Inactive';
  is_popular?: boolean;
  created_at?: string;
}

export interface Inquiry {
  name: string;
  phone: string;
  business_name: string;
  message: string;
  product_id?: number;
}
