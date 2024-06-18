import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  InputRightElement,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistrationFormData,
  registrationFormSchema,
} from "../validations/registrationFormSchema";
import { useRegister } from "../hooks/useRegister";
import { useEmailStore } from "../state-managements/store/emailStore";
import useHospital, { Hospital } from "../hooks/useHospital";
import {useAuth} from "../../../components/authContext"

const RegistrationFormGrid: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isHospitalAdmin, setIsHospitalAdmin] = useState(false);
  const { loading, error, registerUser, response } = useRegister();
  const {user} = useAuth()
  const navigate = useNavigate();
  const hospitalsData = user && user.is_superuser ? useHospital(query) : { data: [] };
  const { data: hospitals } = hospitalsData;
  

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery.trim() !== "") {
      setSearchResults(hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(newQuery.toLowerCase())
      ));
    } else {
      setSearchResults([]);
    }
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setQuery(hospital.name);
    setSearchResults([]);
  };

  const onSubmit = async (formData: RegistrationFormData) => {
    if(user && user.is_superuser){
        const hospitalId = selectedHospital ? selectedHospital.id : null;
        const result = await registerUser({
            ...formData,
            hospital: hospitalId,
            is_hospital_admin: isHospitalAdmin,
        });
        const userEmail = formData.email;
    
        if (!result) {
            console.log("Registration failed.");
        } else {
            useEmailStore.getState().setUserEmail(userEmail);
            navigate("/onboarding");
        }
    } else if(user) {
        const result = await registerUser({
            ...formData,
            hospital: user.hospital,
            is_hospital_admin: isHospitalAdmin,
        });
        const userEmail = formData.email;
    
        if (!result) {
            console.log("Registration failed.");
        } else {
            useEmailStore.getState().setUserEmail(userEmail);
            navigate("/onboarding");
        }
    }
};


  return (
    <Box
      p={6}
      borderWidth={1}
      borderRadius="3xl"
      width={{ base: "100%", md: "500px" }}
    >
      <Heading as="h3" size="xl" mb={10}>
        Sign up
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6} align="stretch">
          <FormControl id="firstName">
            <FormLabel mb={1}>First Name</FormLabel>
            <Input
              type="text"
              placeholder="John"
              {...register("first_name")}
            />
            {errors.first_name && (
              <Text color="red.500">{errors.first_name.message}</Text>
            )}
          </FormControl>
          <FormControl id="lastName">
            <FormLabel mb={1}>Last Name</FormLabel>
            <Input
              type="text"
              placeholder="Doe"
              {...register("last_name")}
            />
            {errors.last_name && (
              <Text color="red.500">{errors.last_name.message}</Text>
            )}
          </FormControl>
          <FormControl id="email">
            <FormLabel mb={1}>Email</FormLabel>
            <Input
              type="email"
              placeholder="johndoe@example.com"
              {...register("email")}
            />
            {(errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )) ||
              (response && response.status === 400 && response.data.email && (
                <Text color="red.500">Email already in use.</Text>
              ))}
          </FormControl>
          <FormControl id="username">
            <FormLabel mb={1}>Username</FormLabel>
            <Input
              type="text"
              placeholder="johndoe123"
              {...register("username")}
            />
            {(errors.username && (
              <Text color="red.500">{errors.username.message}</Text>
            )) ||
              (response && response.status === 400 && response.data.username && (
                <Text color="red.500">Username already taken.</Text>
              ))}
          </FormControl>
          <FormControl id="password">
            <FormLabel mb={1}>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={handlePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )}
          </FormControl>
          

          <FormControl id="hospital" hidden={!user || !user.is_superuser}>
  <FormLabel mb={1}>Hospital</FormLabel>
  <Input
    {...register("hospital")}
    type="text"
    placeholder="Search for hospital"
    value={query}
    onChange={handleInputChange}
  />
  {searchResults.length > 0 && (
    <Box
      borderWidth={1}
      borderRadius="md"
      borderColor="gray.200"
      bg="green"
      boxShadow="md"
      maxH="48"
      overflowY="auto"
      position="absolute"
      w="full"
      zIndex="1"
    >
      {searchResults.map((hospital) => (
        <Box
          key={hospital.id}
          p={2}
          _hover={{ bg: "gray.100" }}
          cursor="pointer"
          onClick={() => handleHospitalSelect(hospital)}
        >
          {hospital.name}
        </Box>
      ))}
    </Box>
  )}
  {errors.hospital && (
    <Text color="red.500">{errors.hospital.message}</Text>
  )}
</FormControl>

          <FormControl id="isHospitalAdmin">
            <FormLabel mb={1}>Is Hospital Admin</FormLabel>
            <Checkbox
              {...register("is_hospital_admin")}
              isChecked={isHospitalAdmin}
              onChange={(e) => setIsHospitalAdmin(e.target.checked)}
            >
              Are you a hospital admin?
            </Checkbox>
          </FormControl>

          <Flex justify="flex-end">
            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              isLoading={loading}
            >
              Sign up
            </Button>
          </Flex>
          {error && <Text color="red.500">{error}</Text>}
          <Link to="/login">
            <Flex alignItems="flex-start">
              <Text fontSize="sm" mr={2}>
                Already have an account?
              </Text>
              <Text fontSize="sm" as="span" color="green.500">
                Sign in
              </Text>
            </Flex>
          </Link>
        </VStack>
      </form>
    </Box>
  );
};

export default RegistrationFormGrid;
