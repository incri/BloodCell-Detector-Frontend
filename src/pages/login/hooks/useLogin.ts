import { useState } from 'react';
import { useAuth } from "../../../components/authContext";
import { usePostData } from "../../../hooks/usePostData";

interface LoginUserData {
  username: string;
  password: string;
}

export const useLogin = () => {
  const mutation = usePostData();
  const { login } = useAuth();
  const [customError, setCustomError] = useState<Error | null>(null);

  const loginUser = async (userData: LoginUserData) => {
    try {
      const response = await mutation.mutateAsync({
        url: "/auth/jwt/create/",
        method: "POST",
        data: userData,
      });

      if (response?.access && response?.user) {
        const { access, user } = response;
        login(access, user);
        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error logging in:', error.message);
        setCustomError(error); // Store the custom error message
        throw error;
      } else {
        const unknownError = new Error('An unknown error occurred.');
        setCustomError(unknownError);
        throw unknownError;
      }
    }
  };

  return { 
    loading: mutation.isPending,
    error: customError || (mutation.error as Error | undefined), // Use custom error if available
    loginUser,
    response: mutation.data
  };
};
