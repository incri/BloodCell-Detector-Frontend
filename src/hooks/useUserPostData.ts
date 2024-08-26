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

        let errorMessages: Record<string, string[]> = {};

        if (axiosError.response?.data) {
          const errorData = axiosError.response.data;

          if (typeof errorData === 'object') {
            for (const key in errorData) {
              if (Array.isArray(errorData[key])) {
                errorMessages[key] = errorData[key];
              } else if (typeof errorData[key] === 'string') {
                errorMessages[key] = [errorData[key]];
              }
            }
          } else if (typeof errorData === 'string') {
            errorMessages['general'] = [errorData];
          }
        } else {
          errorMessages['general'] = [axiosError.message || 'An error occurred.'];
        }

        throw errorMessages;
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
