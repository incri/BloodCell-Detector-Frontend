import useFetchResponseData from "../../../hooks/useFetchResponseData";
import { BloodTest } from "./usePatients";

const useBloodTestDetail = (id: string, bloodTestId: string) => {
  const endpoint = `patients/${id}/blood-tests/${bloodTestId}/`;
  return useFetchResponseData<BloodTest>(endpoint, {}, true);
};

export default useBloodTestDetail;
