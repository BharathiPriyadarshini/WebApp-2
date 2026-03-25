import { TrimSearchRequest, TrimSearchResponse } from "./trims.api-types";

// Reusing BASE_URL similar to model.service.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://app-api.dev.rimello.ai";

export async function searchTrims(request: TrimSearchRequest): Promise<TrimSearchResponse> {
  const {
    page,
    limit,
    isElectric,
    isJustLaunched,
    transmission,
    sort,
    fuelTypes,
    brandIds,
    modelIds,
    search,
  } = request;
  
  const params = new URLSearchParams();
  
  if (page) params.append("page", String(page));
  if (limit) params.append("limit", String(limit));
  if (search) params.append("_q", search);

  const fuelList = [...(fuelTypes || [])];
  if (isElectric) fuelList.push("electric");

  if (fuelList.length) {
    fuelList.forEach((fuel) => params.append("fuelType", fuel));
  }

  if (transmission?.length) {
    transmission.forEach((t) => params.append("transmission", t.toLowerCase()));
  }
  
  if (brandIds?.length) {
    brandIds.forEach((id) => params.append("brandIds", id));
  }
  
  if (modelIds?.length) {
    modelIds.forEach((id) => params.append("modelIds", id));
  }

  if (isJustLaunched) {
    params.append("sortBy", "createdAt");
    params.append("sortDir", "desc");
  } else if (sort) {
    params.append("sortBy", sort === "popularity" ? "cwId" : sort);
    params.append("sortDir", "desc");
  }

  const response = await fetch(`${BASE_URL}/trims?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Trims API 400 Error details:", errorData);
    throw new Error(errorData.message || "Failed to fetch trims");
  }

  const data = await response.json();
  return data;
}

export async function getTrimById(id: string, userId?: string) {
  
  const url = new URL(`${BASE_URL}/trims/${id}`);
  if (userId) {
    url.searchParams.append("userId", userId);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch trim details");
  }

  return response.json();
}

export async function getVehicleImagesByModel(modelId: string, isPrimary?: boolean) {
  const params = new URLSearchParams();
  if (isPrimary !== undefined) {
    params.append("isPrimary", String(isPrimary));
  }
  
  const response = await fetch(`${BASE_URL}/vehicle-images/by-model/${modelId}?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch vehicle images");
  }

  return response.json();
}

export async function getVehicleImagesByTrim(trimId: string, isPrimary?: boolean) {
  const params = new URLSearchParams();
  if (isPrimary !== undefined) {
    params.append("isPrimary", String(isPrimary));
  }

  const response = await fetch(`${BASE_URL}/vehicle-images/by-trim/${trimId}?${params.toString()}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch trim images");
  }

  return response.json();
}
