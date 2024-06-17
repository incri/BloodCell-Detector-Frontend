import { useQuery } from "@tanstack/react-query";
import { FetchResponse } from "./useData";
import apiClient from "../../services/api-client";

export interface Hospital {
  id: string;
  name: string;
}

const useHospital = (query: string) => 
  useQuery<FetchResponse<Hospital>, Error>({
    queryKey:['hospitals', query],
    queryFn: ()=> apiClient.get<FetchResponse<Hospital>>('/hospitals/', {
      params: {
        search : query
      }
    })
    .then(res => res.data)
  })
  

export default useHospital;
