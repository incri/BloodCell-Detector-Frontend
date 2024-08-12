import axios from 'axios';
import { useAuth } from '../components/authContext';
import swal from 'sweetalert2';

const useApiClientUser = () => {
  const { user, logout } = useAuth();

  const apiClientUser = axios.create({
    baseURL: user ? `http://127.0.0.1:8000/hospitals/${user.hospital_id}/` : '',
  });

  const handleSessionExpiration = () => {
    swal.fire({
      title: "Session Expired",
      text: "Your session has been expired! Please login again.",
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
      // You can add more configurations here if needed
    })
  };

  // Request interceptor to add the access token to the headers
  apiClientUser.interceptors.request.use(
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
  apiClientUser.interceptors.response.use(
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
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClientUser(originalRequest);
        } catch (refreshError) {
          logout(); // Assuming logout is a method in your auth context to handle user logout
          handleSessionExpiration();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClientUser;
};

export default useApiClientUser;
