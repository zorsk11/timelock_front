import {
  ImageReorderRequest,
  ImageURLRequest,
} from "@/shared/types/commonTypes";

/** PRODUCT TYPES */

export interface ProductCharacteristic {
  group_name?: string;
  name?: string;
  value: string;
}

export interface ProductCharacteristicGroup {
  group_name: string;
  characteristic?: ProductCharacteristic[];
}

export interface ProductResponse {
  id: number;
  product_name: string;
  description?: string;
  category_name: string;
  category_id: string;
  sale_price: number;
  organization_id?: number;
  is_external: boolean;
  design_url?: string;
  sale_status?: string;
  image_url?: string;
  images?: ImagesResponse[];
  charateristics: ProductCharacteristic[];
  created_at: string;
  updated_at: string;
}

export interface GetProductsResponse {
  products: ProductResponse[];
}

export interface CreateProductRequest {
  product_name: string;
  description?: string;
  category_id: string;
  charateristics: ProductCharacteristic[];
  sale_price: number;
  design_url?: string;
  images?: ImageURLRequest[];
  image_url?: string;
}

export interface UpdateProductRequest {
  product_name: string;
  description?: string;
  sale_price: number;
  sale_status?: string;
  image_url: string;
  images: ProductImagesUpdate;
  design_url?: string;
  category_id: string;
  charateristics?: ProductCharacteristic[];
}

export interface ProductImagesUpdate {
  add?: ImageURLRequest[];
  delete?: number[];
  reorder?: ImageReorderRequest[];
}

export interface ImagesResponse {
  image_id?: number;
  url: string;
  image_index: number;
}
