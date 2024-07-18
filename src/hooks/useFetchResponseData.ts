import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

const useFetchResponseData = <T>(endpoint: string) => {
  const fetchResponseData = async () => {
    const response = await apiClient.get<T>(endpoint);
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery<T, Error>({
    queryKey: ["data", endpoint], // Unique query key
    queryFn: fetchResponseData,   // Function to fetch data
  });

  return { data, error: error?.message ?? "", isLoading, refetch };
};

export default useFetchResponseData;
