export interface VehicleImage {
  id: string;
  modelId: string;
  trimId?: string;
  url: string;
  label?: string;
  order?: number;
  altText?: string;
  isPrimary?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrimImage {
  _id: string;
  trimId: string;
  url: string;
  label?: string;
  order?: number;
  altText?: string;
  isPrimary?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrimPrice {
  exShowroom: number;
}

export interface TrimSearchRequest {
  search?: string;
  brandIds?: string[];
  modelIds?: string[];
  bodyTypes?: string[];
  fuelTypes?: string[];
  minPrice?: number;
  maxPrice?: number;
  isElectric?: boolean;
  isJustLaunched?: boolean;
  transmission?: string[];
  sort?: string;
  page: number;
  limit: number;
}

export interface TrimSearchResult {
  _id?: string;
  trimId: string;
  name: string;
  price: number | { exShowroom: number };
  brandId?: string;
  modelId?: string;
  availability?: string;
  brandName: string;
  modelName: string;
  brand?: { name: string };
  model?: { name: string };
  rating: number;
  horsepower: number;
  isAutomatic: boolean;
  transmission?: string;
  fuelType?: string;
  image: string | null;
  vehicleImage?: { url: string };
  colors?: Array<{
    colorName: string;
    imageUrl: string;
    colorCode: string;
  }>;
}

export interface TrimSearchResponse {
  results: TrimSearchResult[];
  total: number;
}

export interface TrimDetailsBrand {
  _id: string;
  name: string;
  slug?: string;
}

export interface TrimDetailsModel {
  _id: string;
  name: string;
  slug?: string;
}

export interface TrimColor {
  _id: string;
  colorName: string;
  colorCode: string;
  looksLike: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TrimDetailsResponse {
  _id: string;
  name: string;
  cwId: number;
  modelId: string;
  brandId: string;
  status: string;
  availability: string;
  price: TrimPrice;
  colors: TrimColor[];
  specifications: any;
  brand: TrimDetailsBrand;
  model: TrimDetailsModel;
  rating: number;
  isFavorite: boolean;
  isFavorate: boolean; 
  isJustLaunched: boolean;
  vehicleImages: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
