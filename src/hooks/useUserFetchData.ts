import { useQuery } from '@tanstack/react-query';
import { CanceledError } from 'axios';
import useApiClientUser from '../services/api-client-user';

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useUserFetchData = <T>(
  endpoint: string,
  query: string = "",
  sortField: string | null = null,
  sortOrder: 'asc' | 'desc' = 'asc'
) => {
  const apiClientUser = useApiClientUser();

  const fetchFunc = async (): Promise<T[]> => {
    const controller = new AbortController();
    const signal = controller.signal;

    let url = `${endpoint}?search=${query}`;
    if (sortField) {
      url += `&ordering=${sortOrder === 'asc' ? '' : '-'}${sortField}`;
    }

    try {
      const response = await apiClientUser.get<FetchResponse<T>>(url, { signal });
      return response.data.results;
    } catch (err) {
      if (err instanceof CanceledError) {
        console.log('Request was canceled');
      }
      throw err; // Ensure to throw error for React Query to handle
    } finally {
      controller.abort();
    }
  };

  return useQuery<T[], Error>({
    queryKey: ['userFetchData', endpoint],
    queryFn: fetchFunc,
  });
};

export default useUserFetchData;
