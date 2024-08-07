// components/LoginForm.tsx
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../validations/loginSchema";

const LoginForm: React.FC = () => {
  const { loading, error, loginUser, response } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { data, status } = response || {};

  const onSubmit = async (data: LoginFormData) => {
    const result = await loginUser(data);

    if (!result) {
      console.log("login failed.");
    } else {
      navigate("/");
    }
  };

  return (
    <Box
      p={6}
      borderWidth={1}
      borderRadius="3xl"
      width={{ base: "100%", md: "500px" }}
    >
      <Flex justifyContent="space-between" alignItems="baseline" mt={2}>
        <Text fontWeight="bold" display="flex" alignItems="baseline">
          <Text mr={2}>Welcome to</Text>
          <Text as="span" color="green.500">
            BCD SYSTEM
          </Text>
        </Text>
      </Flex>
      <Heading as="h3" size="xl" mb={16}>
        Sign in
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6} align="stretch">
          <FormControl id="username">
            <FormLabel mb={1}>Username</FormLabel>
            <Input type="text" placeholder="John" {...register("username")} />
            {errors.username && (
              <Text color="red.500">{errors.username.message}</Text>
            ) 
}
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
            {(errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )) || <Text color="red.500">{error?.non_field_errors}</Text>}

            <Link to="/request-reset-password">
              <Flex alignItems="flex-start" mt={2}>
                <Text fontSize="sm" mr={2} color="green.500">
                  Forgot your password?
                </Text>
              </Flex>
            </Link>
          </FormControl>
          <Flex justify="flex-end">
            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              isLoading={loading}
            >
              Log in
            </Button>
          </Flex>
          {error && <Text color="red.500">{error.general}</Text>}

          <Link to="/register">
            <Flex alignItems="flex-start">
              <Text fontSize="sm" mr={2}>
                Don't have an account?
              </Text>
              <Text fontSize="sm" as="span" color="green.500">
                Sign up
              </Text>
            </Flex>
          </Link>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
