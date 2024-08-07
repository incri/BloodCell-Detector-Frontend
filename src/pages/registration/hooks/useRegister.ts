import { useState } from "react";
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
  const [customError, setCustomError] = useState<Record<string, string[]> | null>(null);

  const registerUser = async (userData: UserData) => {
    try {
      const response = await mutation.mutateAsync({
        url: "/auth/users/",
        method: "POST",
        data: userData,
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        console.error('Error registering user:', error);
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
    registerUser, 
    response: mutation.data // Accessing response data from useMutation
  };
};
