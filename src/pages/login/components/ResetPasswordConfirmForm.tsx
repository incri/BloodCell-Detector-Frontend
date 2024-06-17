import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResetPasswordConfirmation } from "../hooks/useResetPasswordConfirmation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordFormData,
  passwordSchema,
} from "../validations/passwordSchema";

const ResetPasswordConfirmForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const {
    loading: resetPasswordLoading,
    error: resetPasswordError,
    resetPasswordConfirmation,
  } = useResetPasswordConfirmation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit: SubmitHandler<PasswordFormData> = async (data) => {
    if (uid && token) {
      try {
        const userData = {
          uid: uid,
          token: token,
          new_password: data.newPassword,
        };
        const result = await resetPasswordConfirmation(userData);

        if (!result) {
          console.log("Password reset request failed.");
        } else {
          navigate("/login ");
        }
      } catch (error) {
        console.error("Password reset error:", error);
      }
    } else {
      console.error("UID or token is missing.");
    }
  };

  return (
    <Box
      p={6}
      borderWidth={1}
      borderRadius="3xl"
      width={{ base: "100%", md: "500px" }}
    >
      <Heading as="h4" size="md" mb={4}>
        Change Your Password
      </Heading>
      <Divider orientation="horizontal" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6} mt={4} align="stretch">
          <FormControl id="password">
            <FormLabel mb={2} fontWeight="bold">
              New Password
            </FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                {...register("newPassword")}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                />
              </InputRightElement>
            </InputGroup>
            {errors.newPassword && (
              <Text color="red.500">{errors.newPassword.message}</Text>
            )}
          </FormControl>

          <Flex justify="flex-end">
            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              isLoading={resetPasswordLoading}
            >
              Change Password
            </Button>
          </Flex>
          {resetPasswordError && (
            <Text color="red.500">{resetPasswordError}</Text>
          )}
          <Link to="/login">
            <Flex alignItems="flex-start">
              <Text fontSize="sm" as="span" color="green.500">
                <ArrowBackIcon boxSize={5} />
                Back
              </Text>
            </Flex>
          </Link>
        </VStack>
      </form>
    </Box>
  );
};

export default ResetPasswordConfirmForm;
