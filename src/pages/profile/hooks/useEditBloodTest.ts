import { useUserPostData } from "../../../hooks/useUserPostData";
import { BloodTest } from "./usePatients";

export const useEditBloodTest = () => {
  const { loading, error, fetchData, response } = useUserPostData();

  const profileEditBloodTest = async (id: string, blood_test_id : string,  bloodTestData: BloodTest) => {
    return await fetchData<void>(`/patients/${id}/blood-tests/${blood_test_id}/`, "PUT", bloodTestData);
  };

  return { loading, error, profileEditBloodTest, response };
};