import useFetchData from "../../../hooks/useFetchData";

export interface Hospital {
    id: string;
    name: string;
    address: string;
    phone_number: string;
  }


export interface User {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    hospital: Hospital;
    is_hospital_admin: boolean;
  }  

  const useUsersDetail = (query: string, sortField: string | null, sortOrder: 'asc' | 'desc') => 
    useFetchData<User>("/auth/users/", query, sortField, sortOrder);


export default useUsersDetail;
