import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "../services/api-client";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useFetchData = <T>(endpoint: string, query: string = "", sortField: string | null = null, sortOrder: 'asc' | 'desc' = 'asc') => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    let url = `${endpoint}?search=${query}`;
    if (sortField) {
      url += `&ordering=${sortOrder === 'asc' ? '' : '-'}${sortField}`;
    }

    apiClient
      .get<FetchResponse<T>>(url, { signal: controller.signal })
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [endpoint, query, sortField, sortOrder]);

  return { data, error, isLoading };
};

export default useFetchData;
