import { useUserPostData } from "../../../hooks/useUserPostData";
import { useQueryClient } from "@tanstack/react-query";
import { BloodTest } from "./usePatients";

export const useEditBloodTest = () => {
  const mutation = useUserPostData();
  const queryClient = useQueryClient(); // Access query client

  const profileEditBloodTest = async (id: string, blood_test_id: string, bloodTestData: BloodTest) => {
    try {
      const response = await mutation.mutateAsync({
        url: `/patients/${id}/blood-tests/${blood_test_id}/`,
        method: "PUT",
        data: bloodTestData,
      });

      // Invalidate patient detail query to trigger refetch
      const queryKey = ['data', `patients/${id}/blood-tests/${blood_test_id}/`]
      console.log(queryKey)
      queryClient.invalidateQueries({
        queryKey: queryKey
      });

      return response?.data as BloodTest; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error editing blood test:', error.message);
        throw error;
      } else {
        console.error('Unknown error occurred:', error);
        throw new Error('An unknown error occurred.');
      }
    }
  };

  return { 
    isLoading: mutation.isPending, // Use isLoading for clarity
    error: mutation.error as Error | undefined, // Accessing error state from useMutation
    profileEditBloodTest,
    responseData: mutation.data as BloodTest | undefined, // Ensure type safety for response data
  };
};
