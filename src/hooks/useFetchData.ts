import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { CanceledError } from 'axios';
import { useApiClient, useApiClientUser } from '../services/api-client';

interface FetchResponse<T> {
  count: number;
  results: T[];
  next:string;
  previous:string;
}

type ApiClientType = ReturnType<typeof useApiClient> | ReturnType<typeof useApiClientUser>;

// Update the fetchData function to handle pagination
const fetchData = async <T>(
  apiClient: ApiClientType,
  endpoint: string,
  query: string = "",
  sortField: string | null = null,
  sortOrder: 'asc' | 'desc' = 'asc',
  page: number = 1,  // page parameter for pagination
  signal: AbortSignal
): Promise<FetchResponse<T>> => {
  let url = `${endpoint}?page=${page}&search=${query}`;
  if (sortField) {
    url += `&ordering=${sortOrder === 'asc' ? '' : '-'}${sortField}`;
  }

  const { data } = await apiClient.get<FetchResponse<T>>(url, { signal });
  return data;
};

// Update useFetchData to handle pagination state
const useFetchData = <T>(
  endpoint: string,
  query: string = "",
  sortField: string | null = null,
  sortOrder: 'asc' | 'desc' = 'asc',
  useUserClient: boolean = false,
  page: number = 1 // Add page parameter
) => {
  const apiClient = useUserClient ? useApiClientUser() : useApiClient();

  const fetchFunc = async (): Promise<FetchResponse<T>> => { // Return FetchResponse
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      return await fetchData<T>(apiClient, endpoint, query, sortField, sortOrder, page, signal);
    } catch (err) {
      if (err instanceof CanceledError) {
        console.log('Request was canceled');
      }
      throw err;
    } finally {
      controller.abort();
    }
  };

  return useQuery<FetchResponse<T>, Error>({
    queryKey: [useUserClient ? 'userFetchData' : 'fetchData', endpoint, query, sortField, sortOrder],
    queryFn: fetchFunc,
    placeholderData: keepPreviousData, // Keep previous data while fetching new data
  });
};


export default useFetchData;
