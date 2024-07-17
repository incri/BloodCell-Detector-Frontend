import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import useApiClientUser from '../services/api-client-user';

export interface ApiResponse<T> {
  data?: T;
  status?: number;
  error?: string;
}

export const useUserPostData = () => {
  const apiClientUser = useApiClientUser();
  const mutation = useMutation({
    mutationFn: async ({ url, method, data, headers }: { url: string; method: string; data?: any; headers?: { [key: string]: string } }) => {
      const response = await apiClientUser.request({
        url,
        method,
        data,
        headers,
      });

      return {
        data: response.data,
        status: response.status,
      };
    },
    onError: (error: AxiosError) => {
      console.error('API Error:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response?.data) {
          throw new Error(axiosError.response.data.error || 'An error occurred.');
        } else {
          throw new Error('An error occurred.');
        }
      } else {
        throw new Error('An error occurred during API call.');
      }
    },
    onSettled: () => {
      // window.location.reload();
    },
  });

  return mutation;
};
