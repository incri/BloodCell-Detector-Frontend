import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import useApiClient from '../services/api-client';

interface PostDataParams {
  url: string;
  method: string;
  data?: any;
}

// Function to handle API errors
const handleApiError = (error: AxiosError) => {
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
};

export const usePostData = () => {
  const apiClient = useApiClient(); // Get the API client instance using the custom hook

  const mutation = useMutation({
    mutationFn: async ({ url, method, data }: PostDataParams) => {
      const response = await apiClient.request({
        url,
        method,
        data,
      });
      return response.data;
    },
    onError: (error: AxiosError) => {
      handleApiError(error);
    },
    onSettled: () => {
      // Example use case, can be replaced with refetchQueries etc.
    },
  });

  return mutation;
};
