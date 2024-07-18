import { useUserPostData } from "../../../hooks/useUserPostData";
import { PatientDataRegister } from "./usePatientRegister";
import { useQueryClient } from "@tanstack/react-query";


export const useEditPatient = () => {
  const mutation = useUserPostData();
  const queryClient = useQueryClient(); // Access query client


  const profilePatient = async (id: string, patientData: PatientDataRegister) => {
    try {
      const response = await mutation.mutateAsync({
        url: `/patients/${id}/`,
        method: "PUT",
        data: patientData,
      });

      const queryKey = ['userFetchData',`patients/`]
      console.log(queryKey)
      queryClient.invalidateQueries({
        queryKey: queryKey
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating patient profile:', error.message);
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
    profilePatient,
    response: mutation.data, // Accessing response data from useMutation
  };
};
