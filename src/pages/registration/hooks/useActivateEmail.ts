import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  uid: string;
  token: string;
}

export const useActivateEmail = () => {
  const mutation = usePostData();

  const activateEmail = async (userData: UserData) => {
    try {
      const response = await mutation.mutateAsync({
        url: "/auth/users/activation/",
        method: "POST",
        data: userData,
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error activating email:', error.message);
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
    activateEmail, 
    response: mutation.data // Accessing response data from useMutation
  };
};
