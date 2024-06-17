import { useData } from "./useData";

interface UserData {
  uid: string;
  token: string;
  new_password: string;
}

export const useResetPasswordConfirmation = () => {
  const { loading, error, fetchData } = useData();

  const resetPasswordConfirmation = async (userData: UserData) => {
    return await fetchData<void>(
      "/auth/users/reset_password_confirm/",
      "POST",
      userData
    );
  };

  return { loading, error, resetPasswordConfirmation };
};
