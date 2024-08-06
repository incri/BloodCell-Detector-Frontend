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
          // If the backend sends a specific error message, extract it
          const errorMessage = axiosError.response.data.error || 
                               axiosError.response.data.non_field_errors?.[0] || 
                               'An error occurred.';
          throw new Error(errorMessage);
        } else {
          throw new Error(axiosError.message || 'An error occurred.');
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
