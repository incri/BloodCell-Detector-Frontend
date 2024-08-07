import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import axios, { AxiosError } from 'axios';

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
      // window.location.reload(); // Example use case, can be replaced with refetchQueries etc.
    },
  });

  return mutation;
};
