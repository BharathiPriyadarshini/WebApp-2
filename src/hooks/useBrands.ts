import { useEffect, useState, useCallback } from "react";
import { getBrands, Brand } from "@/services/brand.service";

export const useBrands = () => {
  const [topBrands, setTopBrands] = useState<Brand[]>([]);
  const [allBrands, setAllBrands] = useState<Brand[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [total, setTotal] = useState(0);
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [sortAZ, setSortAZ] = useState(false);

  const totalPages = Math.ceil(total / limit);

  const fetchTopBrands = useCallback(async () => {
    setLoadingTop(true);
    try {
      const data = await getBrands({ page: 1, limit: 6 });
      setTopBrands(data.results);
    } finally {
      setLoadingTop(false);
    }
  }, []);

  const fetchAllBrands = useCallback(
    async (currentPage = 1, alphabetical = sortAZ) => {
      setLoadingAll(true);
      try {
        const data = await getBrands({
          page: currentPage,
          limit,
          sortBy: alphabetical ? "name" : "_id",
          sortDir: alphabetical ? "asc" : "desc",
        });

        if (currentPage === 1) setAllBrands(data.results);
        else setAllBrands((prev) => [...prev, ...data.results]);

        setTotal(data.total);
      } finally {
        setLoadingAll(false);
      }
    },
    [limit, sortAZ]
  );

  const loadMore = () => {
    if (page < totalPages) {
      const next = page + 1;
      setPage(next);
      fetchAllBrands(next);
    }
  };

  const toggleSortAZ = () => {
    setSortAZ((prev) => !prev);
    setPage(1);
    fetchAllBrands(1, !sortAZ);
  };

  useEffect(() => {
    fetchTopBrands();
    fetchAllBrands(1);
  }, [fetchTopBrands, fetchAllBrands]);

  return {
    topBrands,
    allBrands,
    loadMore,
    loadingTop,
    loadingAll,
    page,
    totalPages,
    sortAZ,
    toggleSortAZ,
  };
};