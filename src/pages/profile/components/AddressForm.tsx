import { VStack, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { PatientRegistrationFormData } from "../validations/PatientRegistrationFormSchema";

const AddressForm: React.FC = () => {
  // Use form context to share form state
  const { register, formState: { errors } } = useFormContext<PatientRegistrationFormData>();

  return (
    <VStack spacing={6} align="stretch">
      <FormControl id="street">
        <FormLabel mb={1}>Street</FormLabel>
        <Input
          type="text"
          placeholder="123 Main St"
          {...register("address.street")}
        />
        {errors.address?.street && (
          <Text color="red.500">{errors.address.street.message}</Text>
        )}
      </FormControl>
      <FormControl id="city">
        <FormLabel mb={1}>City</FormLabel>
        <Input
          type="text"
          placeholder="Anytown"
          {...register("address.city")}
        />
        {errors.address?.city && (
          <Text color="red.500">{errors.address.city.message}</Text>
        )}
      </FormControl>
    </VStack>
  );
};

export default AddressForm;
