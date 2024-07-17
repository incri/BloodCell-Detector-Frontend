import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  email: string;
}

export const useResetPasswordEmail = () => {
  const mutation = usePostData();

  const resetPasswordEmail = async (userData: UserData) => {
    try {
      const response = await mutation.mutateAsync({
        url: "/auth/users/reset_password/",
        method: "POST",
        data: userData,
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error resetting password:', error.message);
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
    resetPasswordEmail,
    response: mutation.data, // Accessing response data from useMutation
  };
};
