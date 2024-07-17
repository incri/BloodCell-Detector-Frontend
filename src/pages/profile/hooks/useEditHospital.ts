import { usePostData } from "../../../hooks/usePostData";

interface HospitalData {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export const useEditHospital = () => {
  const mutation = usePostData();

  const profileUser = async (id: string, hospitalData: HospitalData) => {
    try {
      const response = await mutation.mutateAsync({
        url: `/hospitals/${id}/`,
        method: 'PUT',
        data: hospitalData,
      });

      return response.data; // Assuming response structure returns data directly
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error editing hospital:', error.message);
        throw error;
      } else {
        console.error('Unknown error occurred:', error);
        throw new Error('An unknown error occurred.');
      }
    }
  };

  return { 
    loading: mutation.isPending, 
    error: mutation.error as Error | undefined, 
    profileUser, 
    response: mutation.data 
  };
};
