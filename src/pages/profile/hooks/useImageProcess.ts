import { useUserPostData } from "../../../hooks/useUserPostData";

export const useImageProcess = () => {
  const { loading, error, fetchData, response } = useUserPostData();

  const sendProcess = async (id: string, bloodtest_id: string) => {
    try {
      const result = await fetchData<void>(
        `/patients/${id}/blood-tests/${bloodtest_id}/data-images/images-for-bloodtest/`,
        "POST",
        { bloodtest_id }
      );
      return result;
    } catch (error) {
      console.error("Error processing blood test images:", error);
      throw error;
    }
  };

  return { loading, error, sendProcess, response };
};
