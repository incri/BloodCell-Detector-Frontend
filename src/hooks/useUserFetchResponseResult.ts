import { useQuery } from "@tanstack/react-query";
import useApiClientUser from "../services/api-client-user";

const useFetchResponseResult = <T>(endpoint: string, resultId: string) => {
  const apiClientUser = useApiClientUser();

  const fetchResponseResult = async () => {
    const response = await apiClientUser.get<T>(`${endpoint}?result_id=${resultId}`);
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery<T, Error>({
    queryKey: ["data", endpoint], // Unique query key
    queryFn: fetchResponseResult, // Function to fetch data
  });

  return { data, error: error?.message ?? "", isLoading, refetch };
};

export default useFetchResponseResult;
