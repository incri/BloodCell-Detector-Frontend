import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace this with your API base URL
});

// Add a request interceptor to include the token with every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `BEARER ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
