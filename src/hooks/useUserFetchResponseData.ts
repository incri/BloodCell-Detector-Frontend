import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import useApiClientUser from "../services/api-client-user";

const useFetchResponseData = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const apiClientUser = useApiClientUser();


  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    apiClientUser
      .get(endpoint, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [endpoint]);

  return { data, error, isLoading };
};

export default useFetchResponseData;