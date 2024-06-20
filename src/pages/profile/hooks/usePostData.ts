import { useState } from "react";
import apiClient from "../../../services/api-client";
import axios, { AxiosError } from "axios";

interface ApiResponse<T> {
  data?: T;
  status?: number;
  error?: string;
}

export const usePostData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<ApiResponse<any> | null>(null);

  const fetchData = async <T>(
    url: string,
    method: "PUT",
    data?: any
  ): Promise<ApiResponse<T> | undefined> => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const response = await apiClient.request({
        url,
        method,
        data,
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
