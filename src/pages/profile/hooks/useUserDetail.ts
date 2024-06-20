import { UUID } from "crypto";
import useFetchData from "./useFetchData";

export interface User {
  id: UUID;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const useUserDetail = () => useFetchData<User>("/auth/users/me/");

export default useUserDetail;
