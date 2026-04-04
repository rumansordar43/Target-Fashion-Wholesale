export interface Product {
  id: number;
  title: string;
  sku?: string;
  slug: string;
  category: string;
  retail_price: number;
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
  tags?: string[];
  status?: 'Active' | 'Inactive';
  is_popular?: boolean;
  created_at?: string;
}

export interface OrderItem {
  product_id: number;
  title: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  total_price: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  created_at: string;
}
