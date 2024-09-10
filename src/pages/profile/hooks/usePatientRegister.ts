import { useState } from "react";
import { useUserPostData } from "../../../hooks/useUserPostData";


export interface PatientDataRegister {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  address:{
    street: string
    city: string
  }

}

export const usePatientRegister = () => {
  const mutation = useUserPostData();
  const [customError, setCustomError] = useState<Record<string, string[]> | null>(null);


  const registerPatient = async (patientData: PatientDataRegister) => {
    try {
      const response = await mutation.mutateAsync({
        url: "patients/",
        method: "POST",
        data: patientData,
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
    error: customError,  // Accessing error state from useMutation
    registerPatient,
    response: mutation.data, // Accessing response data from useMutation
  };
};
