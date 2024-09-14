import { usePostData } from "../../../hooks/usePostData";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: File | string;
}

export const useProfile = () => {
  const { isPending: loading, error, mutate: profileUser, data: response } = usePostData();

  const updateUserProfile = async (userData: UserData) => {
    try {
      const formData = new FormData();
      formData.append("first_name", userData.first_name);
      formData.append("last_name", userData.last_name);
      formData.append("email", userData.email);

      if (userData.profile_image instanceof File) {
        formData.append("profile_image", userData.profile_image);
      }

      await profileUser({
        url: "/auth/users/me/",
        method: "PUT",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  return { loading, error, updateUserProfile, response };
};
