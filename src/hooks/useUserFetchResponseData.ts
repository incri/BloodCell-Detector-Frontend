import { useQuery } from "@tanstack/react-query";
import useApiClientUser from "../services/api-client-user";


const useFetchResponseData = <T>(endpoint: string) => {

  const apiClientUser = useApiClientUser();


  const fetchResponseData = async () => {
    const response = await apiClientUser.get<T>(endpoint);
    return response.data;
  };

  const { data, error, isLoading } = useQuery<T, Error>({
    queryKey: ["data", endpoint], // Unique query key
    queryFn: fetchResponseData,   // Function to fetch data
  });

  return { data, error: error?.message ?? "", isLoading };
};

export default useFetchResponseData;
