import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from '../components/authContext';
import swal from 'sweetalert2';

// Define the structure of the API response for the refresh token
interface RefreshTokenResponse {
  access: string;
}

// Extend AxiosRequestConfig to include the _retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Custom function to create an Axios client with interceptors
const createApiClient = (baseURL: string): AxiosInstance => {
  const { logout } = useAuth();

  const apiClient = axios.create({
    baseURL,
  });

  const handleSessionExpiration = (): void => {
    swal.fire({
      title: "Session Expired",
      text: "Your session has expired! Please login again.",
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    });
  };

  // Request interceptor to add the access token to the headers if available
  apiClient.interceptors.request.use(
    (config: CustomAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `BEARER ${token}`;
      }
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
  );

  // Response interceptor to handle token expiration and refresh logic
  apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError): Promise<AxiosResponse | AxiosError> => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // Check if the error is due to an expired access token and it's not a retry
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post<RefreshTokenResponse>(
            'http://127.0.0.1:8000/auth/jwt/refresh/',
            { refresh: refreshToken }
          );
          
          const newAccessToken = response.data.access;
          localStorage.setItem('authToken', newAccessToken);

          // Update the original request with the new access token and retry
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `BEARER ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          logout(); // Log out the user in case of refresh token failure
          handleSessionExpiration(); // Show session expiration alert
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

// Factory functions to create specific API clients
const useApiClientUser = (): AxiosInstance => {
  const { user } = useAuth();
  const baseURL = user ? `http://127.0.0.1:8000/hospitals/${user.hospital_id}/` : '';
  return createApiClient(baseURL);
};

const useApiClient = (): AxiosInstance => {
  return createApiClient('http://127.0.0.1:8000/');
};

export { useApiClientUser, useApiClient };
