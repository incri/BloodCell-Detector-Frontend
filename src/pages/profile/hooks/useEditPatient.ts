import { useUserPostData } from "../../../hooks/useUserPostData";
import { PatientDataRegister } from "./usePatientRegister";

export const useEditPatient = () => {
  const { loading, error, fetchData, response } = useUserPostData();

  const profilePatient = async (id: string, patientData: PatientDataRegister) => {
    return await fetchData<void>(`/patients/${id}/`, "PUT", patientData);
  };

  return { loading, error, profilePatient, response };
};