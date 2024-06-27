import axios from 'axios';
import { useAuth } from '../components/authContext';

const useApiClientUser = () => {
  const { user } = useAuth();

  const apiClientUser = axios.create({
    baseURL: user ? `http://127.0.0.1:8000/hospitals/${user.hospital_id}/` : '',
  });

  apiClientUser.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `BEARER ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return apiClientUser;
};

export default useApiClientUser;
