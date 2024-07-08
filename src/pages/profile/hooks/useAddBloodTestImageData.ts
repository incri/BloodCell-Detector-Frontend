import { useUserPostData } from "../../../hooks/useUserPostData";

export const useAddBloodTestImageData = () => {
  const { loading, error, fetchData, response } = useUserPostData();

  const profileBloodTestImageData = async (id: string, blood_test_id: string, formData: FormData) => {
    return await fetchData<void>(
      `/patients/${id}/blood-tests/${blood_test_id}/data-images/`, 
      "POST", 
      formData,
      { 'Content-Type': 'multipart/form-data' }
    );
  };

  return { loading, error, profileBloodTestImageData, response };
};
