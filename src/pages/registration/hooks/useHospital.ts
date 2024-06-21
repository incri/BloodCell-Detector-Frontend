import useFetchData from "./useFetchData";

export interface Hospital {
  id: string;
  name: string;
  address:string;
  phone:string;
  email:string
}

const useHospital = (query: string) => useFetchData<Hospital>("/hospitals/", query);

export default useHospital;