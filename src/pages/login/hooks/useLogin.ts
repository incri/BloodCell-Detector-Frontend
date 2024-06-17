import { useData } from "./useData";

interface UserData {
  username: string;
  password: string;
}

export const useLogin = () => {
  const { loading, error, fetchData, response } = useData();

  const loginUser = async (userData: UserData) => {
    return await fetchData<void>("/auth/jwt/create/", "POST", userData);
  };

  return { loading, error, loginUser, response };
};
