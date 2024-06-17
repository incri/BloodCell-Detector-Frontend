import {
  Flex,
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
} from '@chakra-ui/react';
import HospitalSearchInput from './HospitalSearchInput';
import { useState } from 'react';
import useRegistration from '../../hooks/help/useRegistration';

const RegistrationForm: React.FC = () => {
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [isHospitalAdmin, setIsHospitalAdmin] = useState(false);
  const { register, isHospitalValid, setIsHospitalValid, isLoading, error } = useRegistration();

  const handleHospitalSelect = (hospitalId: string) => {
    setSelectedHospitalId(hospitalId);
    setIsHospitalValid(true);  // Reset the validation error when a hospital is selected
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsHospitalAdmin(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      hospital: selectedHospitalId,
      isHospitalAdmin: isHospitalAdmin,
    };

    try {
      await register(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex flex="1" align="center" justify="center">
      <VStack as="form" spacing={6} w="full" maxW="md" p={8} onSubmit={handleSubmit}>
        <Heading as="h1" size="xl" textAlign="center">
          Register
        </Heading>
        
        <HStack spacing={4} w="full">
          <FormControl id="first_name" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input name="first_name" placeholder="First name" />
          </FormControl>
          <FormControl id="last_name" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input name="last_name" placeholder="Last name" />
          </FormControl>
        </HStack>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" placeholder="Enter your email" />
        </FormControl>

        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input name="username" placeholder="Enter your username" />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" placeholder="Enter your password" />
        </FormControl>

        <FormControl id="hospital" isRequired>
          <FormLabel>Hospital</FormLabel>
          <HospitalSearchInput onHospitalSelect={handleHospitalSelect} />
          {!isHospitalValid && (
            <Text color="red.500">Please select a valid hospital from the list.</Text>
          )}
        </FormControl>

        <FormControl id="isHospitalAdmin">
          <Checkbox 
            name="isHospitalAdmin" 
            isChecked={isHospitalAdmin} 
            onChange={handleCheckboxChange}>
            Is Hospital Admin
          </Checkbox>
        </FormControl>

        <Button type="submit" colorScheme="teal" size="lg" width="full" isLoading={isLoading}>
          Register
        </Button>

        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}
      </VStack>
    </Flex>
  );
};

export default RegistrationForm;
