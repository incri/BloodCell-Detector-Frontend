import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  email: string;
}

export const useResendEmail = () => {
  const { loading, error, fetchData, response } = usePostData();

  const resendEmail = async (userData: UserData) => {
    return await fetchData<void>(
      "/auth/users/resend_activation/",
      "POST",
      userData
    );
  };

  return { loading, error, resendEmail, response };
};
