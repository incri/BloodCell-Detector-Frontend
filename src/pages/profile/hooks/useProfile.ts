import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  first_name: string;
  last_name: string;
  email: string
}

export const useProfile = () => {
  const { loading, error, fetchData, response } = usePostData();

  const profileUser = async (userData: UserData) => {
    return await fetchData<void>("/auth/users/me/", "PUT", userData);
  };

  return { loading, error, profileUser, response };
};
