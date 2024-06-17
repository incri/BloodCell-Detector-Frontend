import { useState } from "react";
import { CanceledError } from "axios";
import apiClient from "../../services/api-client";

const usePostData = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const postData = async (postData: any) => {
    const controller = new AbortController();
    setLoading(true);
  
      apiClient.post<T>(endpoint, postData, { signal: controller.signal })
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
  };

  return { data, error, isLoading, postData };
};

export default usePostData;
