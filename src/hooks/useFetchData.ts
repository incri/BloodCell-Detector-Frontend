import { useQuery } from '@tanstack/react-query';
import {useApiClient} from '../services/api-client';

interface FetchResponse<T> {
  count: number;
  results: T[];
}

// Define the fetchData function with proper TypeScript generics and types
const fetchData = async <T>(
  apiClient: ReturnType<typeof useApiClient>, 
  endpoint: string, 
  query: string = "", 
  sortField: string | null = null, 
  sortOrder: 'asc' | 'desc' = 'asc'
): Promise<T[]> => {
  let url = `${endpoint}?search=${query}`;
  if (sortField) {
    url += `&ordering=${sortOrder === 'asc' ? '' : '-'}${sortField}`;
  }

  const { data } = await apiClient.get<FetchResponse<T>>(url);
  return data.results;
};

// Define the useFetchData hook with proper TypeScript generics and types
const useFetchData = <T>(
  endpoint: string, 
  query: string = "", 
  sortField: string | null = null, 
  sortOrder: 'asc' | 'desc' = 'asc'
) => {
  const apiClient = useApiClient(); // Get the API client instance using the custom hook

  return useQuery<T[], Error>({
    queryKey: ['fetchData', endpoint, query, sortField, sortOrder],
    queryFn: () => fetchData<T>(apiClient, endpoint, query, sortField, sortOrder),
  });
};

export default useFetchData;
