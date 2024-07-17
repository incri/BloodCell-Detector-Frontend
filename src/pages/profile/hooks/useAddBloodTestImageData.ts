import { useQueryClient } from "@tanstack/react-query";
import { useUserPostData } from "../../../hooks/useUserPostData";

export const useAddBloodTestImageData = () => {
  const mutation = useUserPostData();
  const queryClient = useQueryClient(); // Access query client


  const profileBloodTestImageData = async (id: string, blood_test_id: string, formData: FormData) => {

    try {
      const response = await mutation.mutateAsync({
        url: `/patients/${id}/blood-tests/${blood_test_id}/data-images/`,
        method: "POST",
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const queryKey = ['data', `patients/${id}/`]
      console.log(queryKey)
      queryClient.invalidateQueries({
        queryKey: queryKey
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error adding blood test image data:', error.message);
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
    profileBloodTestImageData,
    response: mutation.data, // Accessing response data from useMutation
  };
};
