import { useUserPostData } from "../../../hooks/useUserPostData";
import { BloodTest } from "./usePatients";

export const useAddBloodTest = () => {
  const { loading, error, fetchData, response } = useUserPostData();

  const profileBloodTest = async (id: string, bloodTestData: BloodTest) => {
    return await fetchData<void>(`/patients/${id}/blood-tests/`, "POST", bloodTestData);
  };

  return { loading, error, profileBloodTest, response };
};