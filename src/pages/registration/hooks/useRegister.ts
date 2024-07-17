import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  hospital: string | null;
  is_hospital_admin: boolean; 
}

export const useRegister = () => {
  const mutation = usePostData();

  const registerUser = async (userData: UserData) => {
    try {
      const response = await mutation.mutateAsync({
        url: "/auth/users/",
        method: "POST",
        data: userData,
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error registering user:', error.message);
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
    registerUser, 
    response: mutation.data // Accessing response data from useMutation
  };
};
