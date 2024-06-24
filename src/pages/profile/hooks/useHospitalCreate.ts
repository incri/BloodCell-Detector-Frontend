

import { useData } from "../../registration/hooks/useData";

interface HospitalData {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export const useHospitalCreate = () => {
  const { loading, error, fetchData, response } = useData();

  const createHospital = async (hospitalData: HospitalData) => {
    return await fetchData<void>("/hospitals/", "POST", hospitalData);
  };

  return { loading, error, createHospital, response };
};
