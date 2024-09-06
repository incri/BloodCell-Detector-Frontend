import useFetchData from "../../../hooks/useFetchData";

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const useHospital = (
  query: string,
  sortField: string | null,
  sortOrder: 'asc' | 'desc',
  page: number // Add page parameter
) => useFetchData<Hospital>("/hospitals/", query, sortField, sortOrder, false, page);

export default useHospital;
