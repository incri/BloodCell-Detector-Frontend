import { useAuth } from "../../../components/authContext";
import { usePostData } from "../../../hooks/usePostData";

interface LoginUserData {
  username: string;
  password: string;
}

export const useLogin = () => {
  const mutation = usePostData();
  const { login } = useAuth();

  const loginUser = async (userData: LoginUserData) => {
    try {
      const response = await mutation.mutateAsync({
        url: "/auth/jwt/create/",
        method: "POST",
        data: userData,
      });

      console.log(`Hello, ${response.access}`);

      if (response?.access && response?.user) {
        const { access, user } = response;

        login(access, user);
        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error logging in:', error.message);
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
    loginUser, 
    response: mutation.data // Accessing response data from useMutation
  };
};
