import { useState } from 'react';
import usePostData from '../../hooks/help/usePostData';

interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  hospital: string | null;
  isHospitalAdmin: boolean;
}

const useRegistration = () => {
  const [isHospitalValid, setIsHospitalValid] = useState(true);
  const { postData, isLoading, error } = usePostData<{ message: string }>('auth/users/');

  const register = async (formData: RegistrationData) => {
    if (!formData.hospital) {
      setIsHospitalValid(false);
      throw new Error('Please select a valid hospital.');
    }

    try {
      await postData(formData);
      alert('Registration successful');
    } catch (err) {
      console.error('Error registering:', err);
      alert('Registration failed');
    }
  };

  return {
    register,
    isHospitalValid,
    setIsHospitalValid,
    isLoading,
    error,
  };
};

export default useRegistration;
