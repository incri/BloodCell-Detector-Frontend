import { usePostData } from "../../../hooks/usePostData";



interface HospitalData {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export const useHospitalCreate = () => {
  const { loading, error, fetchData, response } = usePostData();

  const createHospital = async (hospitalData: HospitalData) => {
    return await fetchData<void>("/hospitals/", "POST", hospitalData);
  };

  return { loading, error, createHospital, response };
};
