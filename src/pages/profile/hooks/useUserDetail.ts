import { UUID } from "crypto";
import useFetchResponseData from "../../../hooks/useFetchResponseData";

export interface User {
  id: UUID;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

const useUserDetail = () => useFetchResponseData<User>("/auth/users/me/");

export default useUserDetail;