import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import axios, { AxiosError } from 'axios';

export interface ApiResponse<T> {
  data?: T;
  status?: number;
  error?: string;
}

export const usePostData = () => {
  const mutation = useMutation({
    mutationFn: async ({ url, method, data }: { url: string; method: string; data?: any }) => {
      const response = await apiClient.request({
        url,
        method,
        data,
      });
      return response.data;
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
