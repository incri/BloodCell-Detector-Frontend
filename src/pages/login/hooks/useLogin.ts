// hooks/useLogin.ts
import { useAuth } from "../../../components/authContext";
import { useData } from "./useData";

interface UserData {
  username: string;
  password: string;
}

export const useLogin = () => {
  const { loading, error, fetchData, response } = useData();
  const { login } = useAuth();

  const loginUser = async (userData: UserData) => {
    const result = await fetchData<{ access: string }>("/auth/jwt/create/", "POST", userData);
    if (result?.data?.access) {
      login(result.data.access);
      return true;
    }
    return false;
  };

  return { loading, error, loginUser, response };
};
