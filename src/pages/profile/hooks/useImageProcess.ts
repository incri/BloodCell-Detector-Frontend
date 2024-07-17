import { useUserPostData } from "../../../hooks/useUserPostData";
import { useQueryClient } from "@tanstack/react-query";

export const useImageProcess = () => {
  const mutation = useUserPostData();
  const queryClient = useQueryClient(); // Access query client

  const sendProcess = async (id: string, bloodtest_id: string) => {
    try {
      const response = await mutation.mutateAsync({
        url: `/patients/${id}/blood-tests/${bloodtest_id}/data-images/images-for-bloodtest/`,
        method: "POST",
        data: { bloodtest_id },
      });

      // Invalidate any relevant queries after successful mutation
      const queryKey = ['data', `patients/${id}/blood-tests/${bloodtest_id}`];
      queryClient.invalidateQueries({ queryKey });

      return response?.data; // Assuming `mutateAsync` returns data directly
    } catch (error) {
      console.error("Error processing blood test images:", error);
      throw error;
    }
  };

  return { 
    isLoading: mutation.isPending, // Use isLoading for clarity
    error: mutation.error as Error | undefined, // Accessing error state from useMutation
    sendProcess,
    responseData: mutation.data, // Ensure type safety for response data
  };
};
