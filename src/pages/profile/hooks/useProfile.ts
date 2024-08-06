import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

export const useProfile = () => {
  const { isPending : loading, error, mutate: profileUser, data: response } = usePostData();


  

  const updateUserProfile = async (userData: UserData) => {
    try {
      await profileUser({
        url: "/auth/users/me/",
        method: "PUT",
        data: userData,
      });


      
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  

  return { loading, error, updateUserProfile, response };
};
