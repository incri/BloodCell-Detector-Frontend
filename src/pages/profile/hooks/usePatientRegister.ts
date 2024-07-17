import { useUserPostData } from "../../../hooks/useUserPostData";


export interface PatientDataRegister {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;

}

export const usePatientRegister = () => {
  const mutation = useUserPostData();

  const registerPatient = async (patientData: PatientDataRegister) => {
    try {
      const response = await mutation.mutateAsync({
        url: "patients/",
        method: "POST",
        data: patientData,
      });

      return response?.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error registering patient:', error.message);
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
    registerPatient,
    response: mutation.data, // Accessing response data from useMutation
  };
};
