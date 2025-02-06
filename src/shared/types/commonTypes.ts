/** IMAGE TYPES **/

export interface ImageURLRequest {
  url: string;
  image_index: number;
}

export interface ImageResponse {
  image_id?: number;
  url: string;
  image_index: number;
}

export interface ImageReorderRequest {
  image_id: number;
  image_index: number;
}

export interface OrganizationImagesUpdate {
  add?: ImageURLRequest[];
  delete?: number[];
  reorder?: ImageReorderRequest[];
}

/** CATEGORY TYPES **/

export interface ProductCategoryBase {
  id: string;
  name: string;
  description?: string;
  parent_id?: string | null;
  level: number;
  is_parent: boolean;
}

export interface CategoryWithChildren extends ProductCategoryBase {
  children: ProductCategoryBase[];
}

export interface CategoryWithCharacteristics extends ProductCategoryBase {
  characteristic_groups: CharacteristicGroup[];
}
export interface ProductCategoryBase {
  id: string;
  name: string;
  description?: string;
  parent_id?: string | null;
  level: number;
  is_parent: boolean;
}

export interface CategoryWithChildrenResponse {
  category: ProductCategoryBase;
  children: ProductCategoryBase[];
}

export interface CategoryWithCharacteristicsResponse {
  category: ProductCategoryBase & {
    characteristic_groups: CharacteristicGroup[];
  };
}

export interface CharacteristicGroup {
  group_name: string;
  characteristics?: Characteristic[];
}

export interface Characteristic {
  name: string;
  type: "dropdown" | "multi-dropdown" | "radio" | "string" | "number";
  options?: string[];
  is_required: boolean;
  default_value?: string;
}

export type ProductCategoryWithChildrenResponse =
  | CategoryWithChildrenResponse
  | CategoryWithCharacteristicsResponse;

export function isCategoryWithChildrenResponse(
  response: ProductCategoryWithChildrenResponse
): response is CategoryWithChildrenResponse {
  return "children" in response;
}

export function isCategoryWithCharacteristicsResponse(
  response: ProductCategoryWithChildrenResponse
): response is CategoryWithCharacteristicsResponse {
  return "characteristic_groups" in response.category;
}

/** PRESIGNED URL TYPES **/

export interface GeneratePresignedURLsRequest {
  type: string;
  images: PresignedImageRequest[];
}

export interface PresignedImageRequest {
  filename: string;
}

export interface GeneratePresignedURLsResponse {
  urls: {
    [filename: string]: string;
  };
}
