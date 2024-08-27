import { useQuery } from '@tanstack/react-query';
import { CanceledError } from 'axios';
import { useApiClient, useApiClientUser } from '../services/api-client';

interface FetchResponse<T> {
  count: number;
  results: T[];
}

type ApiClientType = ReturnType<typeof useApiClient> | ReturnType<typeof useApiClientUser>;

const fetchData = async <T>(
  apiClient: ApiClientType,
  endpoint: string,
  query: string = "",
  sortField: string | null = null,
  sortOrder: 'asc' | 'desc' = 'asc',
  signal: AbortSignal
): Promise<T[]> => {
  let url = `${endpoint}?search=${query}`;
  if (sortField) {
    url += `&ordering=${sortOrder === 'asc' ? '' : '-'}${sortField}`;
  }

  const { data } = await apiClient.get<FetchResponse<T>>(url, { signal });
  return data.results;
};

const useFetchData = <T>(
  endpoint: string, 
  query: string = "", 
  sortField: string | null = null, 
  sortOrder: 'asc' | 'desc' = 'asc', 
  useUserClient: boolean = false
) => {
  const apiClient = useUserClient ? useApiClientUser() : useApiClient();
  
  const fetchFunc = async (): Promise<T[]> => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      return await fetchData<T>(apiClient, endpoint, query, sortField, sortOrder, signal);
    } catch (err) {
      if (err instanceof CanceledError) {
        console.log('Request was canceled');
      }
      throw err;
    } finally {
      controller.abort();
    }
  };

  return useQuery<T[], Error>({
    queryKey: [useUserClient ? 'userFetchData' : 'fetchData', endpoint, query, sortField, sortOrder],
    queryFn: fetchFunc,
  });
};

export default useFetchData;
