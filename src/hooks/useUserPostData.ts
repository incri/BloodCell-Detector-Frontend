import { useState } from "react";
import axios, { AxiosError } from "axios";
import useApiClientUser from "../services/api-client-user";

interface ApiResponse<T> {
  data?: T;
  status?: number;
  error?: string;
}

export const useUserPostData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<ApiResponse<any> | null>(null);
  const apiClientUser = useApiClientUser();

  const fetchData = async <T>(
    url: string,
    method: string,
    data?: any,
    headers?: { [key: string]: string }
  ): Promise<ApiResponse<T> | undefined> => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const response = await apiClientUser.request({
        url,
        method,
        data,
        headers,
      });

      setLoading(false);
      setResponse({
        data: response.data,
        status: response.status,
      });

      return response;
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response?.data) {
          setResponse({
            data: axiosError.response.data,
            status: axiosError.response.status,
          });
        } else {
          setError("An error occurred.");
        }
      } else {
        setResponse(null);
        setError("An error occurred during registration.");
      }

      console.error("API Error:", error);
    }
  };

  return { loading, error, fetchData, response };
};
