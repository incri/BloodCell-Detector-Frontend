import { useUserPostData } from "../../../hooks/useUserPostData";
import { BloodTest } from "./usePatients";
import { useQueryClient } from "@tanstack/react-query";

export const useAddBloodTest = () => {
  const mutation = useUserPostData();
  const queryClient = useQueryClient(); // Access query client


  const profileBloodTest = async (id: string, bloodTestData: BloodTest) => {
    try {
      const response = await mutation.mutateAsync({
        url: `/patients/${id}/blood-tests/`,
        method: "POST",
        data: bloodTestData,
      });

      const queryKey = ['data',`patients/${id}/`]
      console.log(queryKey)
      queryClient.invalidateQueries({
        queryKey: queryKey
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding blood test:', error.message);
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
    profileBloodTest,
    response: mutation.data, // Accessing response data from useMutation
  };
};
