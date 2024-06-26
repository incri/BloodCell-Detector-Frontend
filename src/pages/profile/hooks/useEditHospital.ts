import { usePostData } from "../../../hooks/usePostData";

interface HospitalData {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export const useEditHospital = () => {
  const { loading, error, fetchData, response } = usePostData();

  const profileUser = async (id: string, hospitalData: HospitalData) => {
    return await fetchData<void>(`/hospitals/${id}/`, "PUT", hospitalData);
  };

  return { loading, error, profileUser, response };
};