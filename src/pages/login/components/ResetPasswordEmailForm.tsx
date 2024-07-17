import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useResetPasswordEmail } from "../hooks/useResetPasswordEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EmailFormData, emailFormSchema } from "../validations/emailSchema";
import SucessMessageGrid from "../../../components/SucessMessageGrid";

const ResetPasswordForm: React.FC = () => {
  const { loading, error, resetPasswordEmail, response } =
    useResetPasswordEmail();

  const { status } = response || {};

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
  });

  const onSubmit = async (formData: EmailFormData) => {
    const result = await resetPasswordEmail(formData);

    if (!result) {
      console.log("Reset password failed.");
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <Box
      p={6}
      borderWidth={1}
      borderRadius="3xl"
      width={{ base: "100%", md: "500px" }}
    >
      <Heading as="h4" size="md" mb={4}>
        Reset Password
      </Heading>
      <Divider orientation="horizontal" />
      <Flex justifyContent="space-between" alignItems="baseline" mt={4} mb={8}>
        <Text display="flex" alignItems="baseline">
          <Text mr={2}>
            Please enter your email to request a password reset for your
            account.
          </Text>
        </Text>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6} align="stretch">
          <FormControl id="email">
            <Input
              type="email"
              placeholder="johndoe@example.com"
              {...register("email")}
            />
            {(errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )) ||
              (status === 400 && (
                <Text color="red.500">
                  Incorrect email. no active account.{" "}
                </Text>
              ))}
          </FormControl>

          <Flex justify="flex-end">
            <Button
              type="submit"
              colorScheme="green"
              width="100%"
              isLoading={loading}
            >
              Reset Password
            </Button>
          </Flex>
          {error && <Text color="red.500">{error.message}</Text>}

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

      {isSuccessModalOpen && status === 204 && (
        <SucessMessageGrid
          isOpen={isSuccessModalOpen}
          onClose={closeSuccessModal}
          title="Password Reset Instructions Sent!"
          message={
            "Email has been sent to supplied email address. Follow the instruction in the email to reset your password"
          }
          buttonText="OK"
        />
      )}
    </Box>
  );
};

export default ResetPasswordForm;
