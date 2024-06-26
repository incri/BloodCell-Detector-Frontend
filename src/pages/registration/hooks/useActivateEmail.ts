import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  uid: string;
  token: string;
}

export const useActivateEmail = () => {
  const { loading, error, fetchData, response } = usePostData();

  const activateEmail = async (userData: UserData) => {
    return await fetchData<void>("/auth/users/activation/", "POST", userData);
  };

  return { loading, error, activateEmail, response };
};
