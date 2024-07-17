import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  uid: string;
  token: string;
  new_password: string;
}

export const useResetPasswordConfirmation = () => {
  const mutation = usePostData();

  const resetPasswordConfirmation = async (userData: UserData) => {
    try {
      const response = await mutation.mutateAsync({
        url: "/auth/users/reset_password_confirm/",
        method: "POST",
        data: userData,
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error resetting password confirmation:', error.message);
        throw error;
      } else {
        console.error('Unknown error occurred:', error);
        throw new Error('An unknown error occurred.');
      }
    }
  };

  return { 
    loading: mutation.isPending, // Accessing loading state from useMutation
    error: mutation.error as Error | undefined, // Accessing error state from useMutation
    resetPasswordConfirmation,
  };
};
