import { useState, useMemo } from "react";

interface UseSearchAndPaginationReturn<T> {
  search: string;

  currentPage: number;

  totalPages: number;

  filtered: T[];

  paged: T[];

  handleSearch: (val: string) => void;

  setPage: (page: number) => void;
}

export function useSearchAndPagination<T>(data: T[], filterFn: (item: T, query: string) => boolean, pageSize: number): UseSearchAndPaginationReturn<T> {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) => filterFn(item, q));
  }, [data, search, filterFn]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return {
    search,
    currentPage,
    totalPages,
    filtered,
    paged,
    handleSearch,
    setPage,
  };
}
