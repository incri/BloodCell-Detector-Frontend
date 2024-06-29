import useUserFetchResponseData from "../../../hooks/useUserFetchResponseData";
import { PatientData } from "./usePatients";

const usePatientDetail = (id: string) => {
  const endpoint = `patients/${id}/`;
  return useUserFetchResponseData<PatientData>(endpoint);
};

export default usePatientDetail;
