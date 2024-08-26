import { useQuery } from "@tanstack/react-query";
import useApiClient from "../services/api-client";

const useFetchResponseData = <T>(endpoint: string) => {
  const apiClient = useApiClient(); // Get the API client instance using the custom hook

  // Function to fetch the data
  const fetchResponseData = async () => {
    const response = await apiClient.get<T>(endpoint);
    return response.data;
  };

  // Use react-query to manage the fetching and state
  const { data, error, isLoading, refetch } = useQuery<T, Error>({
    queryKey: ["data", endpoint], // Unique query key
    queryFn: fetchResponseData,   // Function to fetch data
  });

  return { data, error: error?.message ?? "", isLoading, refetch };
};

export default useFetchResponseData;
