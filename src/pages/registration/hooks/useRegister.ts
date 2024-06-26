import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  hospital: string | null;
  is_hospital_admin: boolean; 
}

export const useRegister = () => {
  const { loading, error, fetchData, response } = usePostData();

  const registerUser = async (userData: UserData) => {
    return await fetchData<void>("/auth/users/", "POST", userData);
  };

  return { loading, error, registerUser, response };
};
