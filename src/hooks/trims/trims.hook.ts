import { useQuery } from "@tanstack/react-query";
import { searchTrims, getTrimById, getVehicleImagesByModel, getVehicleImagesByTrim } from "./trims.api";
import { TrimSearchRequest } from "./trims.api-types";

const DEFAULT_LIMIT = 20;

export const TRIMS_QUERY_KEYS = {
  search: ["trims", "search"] as const,
  details: ["trims", "details"] as const,
  imagesByModel: ["trims", "images", "by-model"] as const,
  imagesByTrim: ["trims", "images", "by-trim"] as const,
};

export function useTrimsSearch(params: TrimSearchRequest) {
  const { limit = DEFAULT_LIMIT, page = 1, ...rest } = params;

  return useQuery({
    queryKey: [...TRIMS_QUERY_KEYS.search, rest, page, limit],
    queryFn: () =>
      searchTrims({
        ...rest,
        page,
        limit,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTrimById(id: string, userId?: string) {
  return useQuery({
    queryKey: [...TRIMS_QUERY_KEYS.details, id, userId],
    queryFn: () => getTrimById(id, userId),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useVehicleImagesByModel(modelId?: string, isPrimary?: boolean) {
  return useQuery({
    queryKey: [...TRIMS_QUERY_KEYS.imagesByModel, modelId, isPrimary],
    queryFn: () => getVehicleImagesByModel(modelId!, isPrimary),
    enabled: !!modelId,
    staleTime: 30 * 60 * 1000, // Images change rarely
  });
}

export function useVehicleImagesByTrim(trimId?: string, isPrimary?: boolean) {
  return useQuery({
    queryKey: [...TRIMS_QUERY_KEYS.imagesByTrim, trimId, isPrimary],
    queryFn: () => getVehicleImagesByTrim(trimId!, isPrimary),
    enabled: !!trimId,
    staleTime: 30 * 60 * 1000,
  });
}
