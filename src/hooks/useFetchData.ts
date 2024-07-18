import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const fetchData = async <T>(endpoint: string, query: string = "", sortField: string | null = null, sortOrder: 'asc' | 'desc' = 'asc'): Promise<T[]> => {
  let url = `${endpoint}?search=${query}`;
  if (sortField) {
    url += `&ordering=${sortOrder === 'asc' ? '' : '-'}${sortField}`;
  }

  const { data } = await apiClient.get<FetchResponse<T>>(url);
  return data.results;
};

const useFetchData = <T>(endpoint: string, query: string = "", sortField: string | null = null, sortOrder: 'asc' | 'desc' = 'asc',) => {
  return useQuery<T[], Error>({
    queryKey: ['fetchData', endpoint],
    queryFn: () => fetchData<T>(endpoint, query, sortField, sortOrder),
  });
};

export default useFetchData;
