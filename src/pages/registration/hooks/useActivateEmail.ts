import { useData } from "./useData";

interface UserData {
  uid: string;
  token: string;
}

export const useActivateEmail = () => {
  const { loading, error, fetchData, response } = useData();

  const activateEmail = async (userData: UserData) => {
    return await fetchData<void>("/auth/users/activation/", "POST", userData);
  };

  return { loading, error, activateEmail, response };
};
