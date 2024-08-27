import { useQuery } from "@tanstack/react-query";
import { CanceledError } from "axios";
import { useApiClient, useApiClientUser } from "../services/api-client";

type ApiClientType = ReturnType<typeof useApiClient> | ReturnType<typeof useApiClientUser>;

const fetchData = async <T>(
  apiClient: ApiClientType,
  endpoint: string,
  params: Record<string, string> = {},
  signal: AbortSignal
): Promise<T> => {
  const url = new URL(endpoint, apiClient.defaults.baseURL);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const { data } = await apiClient.get<T>(url.toString(), { signal });
  return data;
};

const useFetchResponseData = <T>(
  endpoint: string,
  params: Record<string, string> = {},
  useUserClient: boolean = false,
  includeResultId: boolean = false
) => {
  const apiClient = useUserClient ? useApiClientUser() : useApiClient();

  const fetchFunc = async (): Promise<T> => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const modifiedParams = { ...params };
      if (includeResultId && params.resultId) {
        modifiedParams.result_id = params.resultId;
      }
      return await fetchData<T>(apiClient, endpoint, modifiedParams, signal);
    } catch (err) {
      if (err instanceof CanceledError) {
        console.log("Request was canceled");
      }
      throw err;
    } finally {
      controller.abort();
    }
  };

  return useQuery<T, Error>({
    queryKey: ["data", endpoint, params], // Unique query key based on endpoint and params
    queryFn: fetchFunc,
  });
};

export default useFetchResponseData;
