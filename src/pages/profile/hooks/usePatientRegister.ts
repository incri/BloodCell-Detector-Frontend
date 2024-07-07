import { useUserPostData } from "../../../hooks/useUserPostData";

export interface PatientDataRegister {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;

}

export const usePatientRegister = () => {
  const { loading, error, fetchData, response } = useUserPostData();

  const registerPatient = async (patientData: PatientDataRegister) => {
    return await fetchData<void>("patients/", "POST", patientData);
  };

  return { loading, error, registerPatient, response };
};
