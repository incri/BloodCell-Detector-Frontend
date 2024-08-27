import useFetchResponseData from "../../../hooks/useFetchResponseData";
import { PatientData } from "./usePatients";

const usePatientDetail = (id: string) => {
  const endpoint = `patients/${id}/`;
  return useFetchResponseData<PatientData>(endpoint,{}, true);
};

export default usePatientDetail;
