import { useState, useEffect, useCallback } from "react";
import { getModels, Model } from "@/services/model.service";

export const useModels = (brandId: string, initialLimit = 10) => {
  const [models, setModels] = useState<Model[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(total / limit);

  const fetchModels = useCallback(
    async (currentPage = 1) => {
      if (!brandId) return;
      setLoading(true);
      setError(null);

      try {
        const data = await getModels({ brandId, page: currentPage, limit });
        if (currentPage === 1) setModels(data.results);
        else setModels((prev) => [...prev, ...data.results]);

        setTotal(data.total);
      } catch (err: any) {
        setError(err.message || "Failed to fetch models");
      } finally {
        setLoading(false);
      }
    },
    [brandId, limit]
  );

  const loadMore = () => {
    if (page < totalPages) {
      const next = page + 1;
      setPage(next);
      fetchModels(next);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchModels(1);
  }, [brandId, fetchModels]);

  return { models, loading, page, totalPages, loadMore, error };
};