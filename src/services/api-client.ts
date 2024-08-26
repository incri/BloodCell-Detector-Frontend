import axios from 'axios';
import { useAuth } from '../components/authContext';
import swal from 'sweetalert2';

const createApiClient = (baseURL: string) => {
  const { logout } = useAuth();

  const apiClient = axios.create({
    baseURL,
  });

  const handleSessionExpiration = () => {
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
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `BEARER ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle token expiration and refresh logic
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Check if the error is due to an expired access token and it's not a retry
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', { refresh: refreshToken });
          
          const newAccessToken = response.data.access;
          localStorage.setItem('authToken', newAccessToken);

          // Update the original request with the new access token and retry
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
const useApiClientUser = () => {
  const { user } = useAuth();
  const baseURL = user ? `http://127.0.0.1:8000/hospitals/${user.hospital_id}/` : '';
  return createApiClient(baseURL);
};

const useApiClient = () => {
  return createApiClient('http://127.0.0.1:8000/');
};

export { useApiClientUser, useApiClient };
