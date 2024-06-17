import { useData } from "./useData";

interface UserData {
  email: string;
}

export const useResetPasswordEmail = () => {
  const { loading, error, fetchData, response } = useData();

  const resetPasswordEmail = async (userData: UserData) => {
    return await fetchData<void>(
      "/auth/users/reset_password/",
      "POST",
      userData
    );
  };

  return { loading, error, resetPasswordEmail, response };
};
