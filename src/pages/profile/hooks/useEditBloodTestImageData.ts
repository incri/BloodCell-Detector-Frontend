import { useUserPostData } from "../../../hooks/useUserPostData";
import { useQueryClient } from "@tanstack/react-query";

export const useEditBloodTestImageData = () => {
  const mutation = useUserPostData();
  const queryClient = useQueryClient(); // Access query client

  const editBloodTestImageData = async (id: string, blood_test_id: string | undefined, formData: FormData) => {
    try {
      const response = await mutation.mutateAsync({
        url: `/patients/${id}/blood-tests/${blood_test_id}/data-images/batch-delete/`,
        method: "POST",
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' } // Ensure proper headers for FormData
      });

      // Example: Invalidate relevant queries after mutation
      const queryKey = ['data', `patients/${id}/blood-tests/${blood_test_id}/`]
      queryClient.invalidateQueries({
        queryKey: queryKey
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error editing blood test image data:', error.message);
        throw error;
      } else {
        console.error('Unknown error occurred:', error);
        throw new Error('An unknown error occurred.');
      }
    }
  };

  return {
    isLoading: mutation.isPending,
    error: mutation.error as Error | undefined,
    editBloodTestImageData,
    response: mutation.data,
  };
};
