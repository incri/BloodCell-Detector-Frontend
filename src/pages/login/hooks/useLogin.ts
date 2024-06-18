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
    const result = await fetchData<{ access: string, user: any }>("/auth/jwt/create/", "POST", userData);
    if (result?.data?.access && result?.data?.user) {
      const { access, user } = result.data;
      login(access, user); // Pass token and user data to login method
      return true;
    }
    return false;
  };

  return { loading, error, loginUser, response };
};
