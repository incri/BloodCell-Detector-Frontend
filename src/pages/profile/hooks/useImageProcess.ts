import { useUserPostData } from "../../../hooks/useUserPostData";
import { useQueryClient } from "@tanstack/react-query";
import { useWebSocket } from "./useProgressWebSocket";

export const useImageProcess = () => {
  const mutation = useUserPostData();
  const queryClient = useQueryClient();
  const { progress, connectionStatus } = useWebSocket(); // Access WebSocket state

  const sendProcess = async (id: string, bloodtest_id: string) => {
    try {
      // Send POST request with bloodtest_id
      const response = await mutation.mutateAsync({
        url: `/patients/${id}/blood-tests/${bloodtest_id}/data-images/images-for-bloodtest/`,
        method: "POST",
        data: { bloodtest_id },
      });

      // Invalidate relevant queries after successful mutation
      const queryKey = ['data', `patients/${id}/blood-tests/${bloodtest_id}/`];
      queryClient.invalidateQueries({ queryKey });

      return response?.data; // Assuming mutateAsync returns data directly
    } catch (error) {
      console.error("Error processing blood test images:", error);
      throw error; // Rethrow error to be handled by the caller
    }
  };

  return { 
    isLoading: mutation.isPending, // Use isLoading for clarity
    error: mutation.error as Error | undefined, // Accessing error state from useMutation
    sendProcess,
    responseData: mutation.data, // Ensure type safety for response data
    progress, // Include progress from WebSocket
    connectionStatus // Include WebSocket connection status
  };
};
