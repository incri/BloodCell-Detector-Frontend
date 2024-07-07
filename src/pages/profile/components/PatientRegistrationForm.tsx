import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PatientRegistrationFormData,
  patientsRegistrationFormSchema,
} from "../validations/PatientRegistrationFormSchema";
import {useAuth} from "../../../components/authContext"
import { usePatientRegister } from "../hooks/usePatientRegister";

const PatientRegistrationForm: React.FC = () => {
  const { loading, error, registerPatient, response } = usePatientRegister();
  const {user} = useAuth()
  const navigate = useNavigate();
  

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PatientRegistrationFormData>({
    resolver: zodResolver(patientsRegistrationFormSchema),
  });

  const onSubmit = async (formData: PatientRegistrationFormData) => {
     if(user) {
        const result = await registerPatient({
            ...formData,
        });
    
        if (!result) {
            console.log("Registration failed.");
        } else {
            navigate("/");
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
        Patient Register
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
          <FormControl id="phone">
            <FormLabel mb={1}>Phone</FormLabel>
            <Input
              type="text"
              placeholder="+977 ------"
              {...register("phone")}
            />
            {(errors.phone && (
              <Text color="red.500">{errors.phone.message}</Text>
            ))}
          </FormControl>
          <FormControl id="birth_date">
            <FormLabel mb={1}>Birth Date</FormLabel>
            <InputGroup>
              <Input
                type= "date"
                placeholder="Enter your DOB"
                {...register("birth_date")}
              />
            </InputGroup>
            {errors.birth_date && (
              <Text color="red.500">{errors.birth_date.message}</Text>
            )}
          </FormControl>

          <Flex justify="flex-end">
            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              isLoading={loading}
            >
              Submit
            </Button>
          </Flex>
          {error && <Text color="red.500">{error}</Text>}
        </VStack>
      </form>
    </Box>
  );
};

export default PatientRegistrationForm;
