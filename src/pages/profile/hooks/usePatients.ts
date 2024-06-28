import useUserFetchData from "../../../hooks/useUserFetchData";


interface Address {
    id: number;
    street: string;
    city: string;
    patient: string;
  }
  
interface Image {
    id: number;
    image: string;
    blood_test?: string;
    result?: string;
  }
  
interface Result {
    id: string;
    created_at: string;
    description: string;
    result_images: Image[];
    bloodtest: string;
  }
  
export interface BloodTest {
    id: string;
    title: string;
    description: string;
    images: Image[];
    results: Result[];
    patient: string;
  }
  
export interface PatientData {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    birth_date: string;
    address: Address;
    blood_tests: BloodTest[];
  }  

  const usePatients = (query: string, sortField: string | null, sortOrder: 'asc' | 'desc') => 
    useUserFetchData<PatientData>("patients/", query, sortField, sortOrder);


export default usePatients;
