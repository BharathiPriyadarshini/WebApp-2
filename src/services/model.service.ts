const BASE_URL = "https://app-api.dev.rimello.ai";

export type Model = {
  _id: string;
  name: string;
  brandId: string;
  minPrice?: number;
  maxPrice?: number;
  createdAt: string;
  updatedAt: string;
};

export type GetModelsParams = {
  brandId: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
};

export const getModels = async ({
  brandId,
  page = 1,
  limit = 10,
  sortBy = "_id",
  sortDir = "desc",
}: GetModelsParams) => {
  if (!brandId) throw new Error("brandId is required");
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortDir,
  });

  const res = await fetch(`${BASE_URL}/models/${brandId}?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch models");
  return res.json();
};