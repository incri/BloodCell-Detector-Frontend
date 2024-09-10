import { useNavigate } from "react-router-dom";
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
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PatientRegistrationFormData,
  patientsRegistrationFormSchema,
} from "../validations/PatientRegistrationFormSchema";
import { useAuth } from "../../../components/authContext";
import { usePatientRegister } from "../hooks/usePatientRegister";
import AddressForm from "./AddressForm"; // Import the AddressForm component

const PatientRegistrationForm: React.FC = () => {
  const { loading, error, registerPatient } = usePatientRegister();
  const { user } = useAuth();
  const navigate = useNavigate();

  // UseForm setup
  const methods = useForm<PatientRegistrationFormData>({
    resolver: zodResolver(patientsRegistrationFormSchema),
  });

  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (formData: PatientRegistrationFormData) => {
    if (user) {
      const result = await registerPatient({
        ...formData,
      });

      if (!result) {
        console.log("Registration failed.");
      } else {
        navigate(`/${user.username}?tab=patients`);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Box p={6} borderWidth={1} borderRadius="3xl">
        <Heading as="h3" size="xl" mb={10}>
          Patient Register
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            templateColumns="3fr 2fr"
            gap={6}
            alignItems="end" // Align items to the bottom of the grid cells
          >
            {/* Patient Form Section */}
            <GridItem>
              <Box
                p={6}
                borderWidth={1}
                borderRadius="lg"
                height="100%" // Ensures the height is full within the grid cell
              >
                <VStack spacing={6} align="stretch">
                  <FormControl id="firstName">
                    <FormLabel mb={1}>First Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="John"
                      {...methods.register("first_name")}
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
                      {...methods.register("last_name")}
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
                      {...methods.register("email")}
                    />
                    {(errors.email && (
                      <Text color="red.500">{errors.email.message}</Text>
                    )) || <Text color="red.500">{error?.email}</Text>}
                  </FormControl>

                  <FormControl id="phone">
                    <FormLabel mb={1}>Phone</FormLabel>
                    <Input
                      type="text"
                      placeholder="+977 ------"
                      {...methods.register("phone")}
                    />
                    {errors.phone && (
                      <Text color="red.500">{errors.phone.message}</Text>
                    )}
                  </FormControl>

                  <FormControl id="birth_date">
                    <FormLabel mb={1}>Birth Date</FormLabel>
                    <InputGroup>
                      <Input
                        type="date"
                        placeholder="Enter your DOB"
                        {...methods.register("birth_date")}
                      />
                    </InputGroup>
                    {errors.birth_date && (
                      <Text color="red.500">{errors.birth_date.message}</Text>
                    )}
                  </FormControl>
                </VStack>
              </Box>
            </GridItem>

            {/* Address Form Section */}
            <GridItem>
              <Box
                p={6}
                borderWidth={1}
                borderRadius="lg"
                height="100%" // Ensures the height is full within the grid cell
              >
                <Heading as="h3" size="lg" mb={6}>
                  Address Details
                </Heading>
                <AddressForm />
              </Box>
            </GridItem>
          </Grid>

          {/* Submit Button */}
          <Flex justify="flex-end" mt={6}>
            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              isLoading={loading}
            >
              Submit
            </Button>
          </Flex>
          {error && <Text color="red.500">{error.general}</Text>}
        </form>
      </Box>
    </FormProvider>
  );
};

export default PatientRegistrationForm;
