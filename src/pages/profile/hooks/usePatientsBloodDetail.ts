import useUserFetchResponseData from "../../../hooks/useUserFetchResponseData";
import { PatientData } from "./usePatients";

const usePatientBloodDetail = (id: string) => {
  const endpoint = `patients/${id}/`;
  return useUserFetchResponseData<PatientData>(endpoint);
};

export default usePatientBloodDetail;
