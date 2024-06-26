import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  email: string;
}

export const useResetPasswordEmail = () => {
  const { loading, error, fetchData, response } = usePostData();

  const resetPasswordEmail = async (userData: UserData) => {
    return await fetchData<void>(
      "/auth/users/reset_password/",
      "POST",
      userData
    );
  };

  return { loading, error, resetPasswordEmail, response };
};
