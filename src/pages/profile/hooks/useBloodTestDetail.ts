import useUserFetchResponseData from "../../../hooks/useUserFetchResponseData";
import { BloodTest } from "./usePatients";

const useBloodTestDetail = (id: string, bloodTestId: string) => {
  const endpoint = `patients/${id}/blood-tests/${bloodTestId}/`;
  return useUserFetchResponseData<BloodTest>(endpoint);
};

export default useBloodTestDetail;
