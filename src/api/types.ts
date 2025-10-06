export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  description?: string;
  inStock: boolean;
  deliveryTime?: string;
  rating?: number;
  likes?: number;
  brand?: string;
  model?: string;
  color?: string;
  material?: string;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  relatedProductIds?: string[];
  // only for already fetched products
  relatedProducts?: Product[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
