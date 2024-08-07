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
  const [customError, setCustomError] = useState<Record<string, string[]> | null>(null);

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
      if (typeof error === 'object' && error !== null) {
        console.error('Error logging in:', error);
        setCustomError(error as Record<string, string[]>); // Store the custom error object
        throw error;
      } else {
        const unknownError = { general: ['An unknown error occurred.'] };
        setCustomError(unknownError);
        throw unknownError;
      }
    }
  };

  return { 
    loading: mutation.isPending, // Accessing loading state from useMutation
    error: customError, // Use custom error object
    loginUser,
    response: mutation.data // Accessing response data from useMutation
  };
};
