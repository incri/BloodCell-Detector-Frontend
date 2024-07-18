import { usePostData } from "../../../hooks/usePostData";
import { useQueryClient } from "@tanstack/react-query";

interface HospitalData {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export const useHospitalCreate = () => {
  const mutation = usePostData();
  const queryClient = useQueryClient(); // Access query client


  const createHospital = async (hospitalData: HospitalData) => {
    try {
      const response = await mutation.mutateAsync({
        url: "/hospitals/",
        method: "POST",
        data: hospitalData,
      });

      const queryKey = ['fetchData',"/hospitals/"]
      console.log(queryKey)
      queryClient.invalidateQueries({
        queryKey: queryKey
      });

      return response?.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating hospital:', error.message);
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
    createHospital, 
    response: mutation.data // Accessing response data from useMutation
  };
};
