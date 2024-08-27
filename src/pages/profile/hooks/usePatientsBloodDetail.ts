import useFetchResponseData from "../../../hooks/useFetchResponseData";
import { PatientData } from "./usePatients";

const usePatientBloodDetail = (id: string) => {
  const endpoint = `patients/${id}/`;
  return useFetchResponseData<PatientData>(endpoint,{},true);
};

export default usePatientBloodDetail;
