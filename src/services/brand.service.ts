const BASE_URL = "https://app-api.dev.rimello.ai";

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  status: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
};

export type GetBrandsParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  search?: string;
};

export const getBrands = async ({
  page = 1,
  limit = 10,
  sortBy = "_id",
  sortDir = "desc",
  search = "",
}: GetBrandsParams) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortDir,
    _q: search,
  });

  const res = await fetch(`${BASE_URL}/brands?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch brands");
  return res.json();
};