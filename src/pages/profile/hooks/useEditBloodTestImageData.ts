import { useUserPostData } from "../../../hooks/useUserPostData";

export const useEditBloodTestImageData = () => {
  const { loading, error, fetchData, response } = useUserPostData();

  const EditBloodTestImageData = async (id: string, blood_test_id: string, formData: FormData) => {
    return await fetchData<void>(
      `/patients/${id}/blood-tests/${blood_test_id}/data-images/batch-delete/`, 
      "POST", 
      formData,
      { 'Content-Type': 'multipart/form-data' }
    );
  };

  return { loading, error, EditBloodTestImageData, response };
};
