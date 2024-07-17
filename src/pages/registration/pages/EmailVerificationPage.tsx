import { useState } from 'react';
import { Text, Input } from "@chakra-ui/react";
import EmailActivationGrid from "../components/EmailActivationGrid";
import { useResendEmail } from "../hooks/useResendEmail";

const EmailVerificationPage = () => {
  const [resendEmailInput, setResendEmailInput] = useState('');
  const {
    loading: resendLoading,
    resendEmail,
  } = useResendEmail();

  const handleResendClick = async () => {
    try {
      const userData = { email: resendEmailInput };
      await resendEmail(userData);
    } catch (error) {
      console.error('Error resending email:', error);
    }
  };

  return (
    <EmailActivationGrid
      title="Verify Your Email"
      description={
        <>
          Enter the email address to resend the verification email:
          <Input
            type="email"
            value={resendEmailInput}
            onChange={(e) => setResendEmailInput(e.target.value)}
            placeholder="Enter email address"
            mt={2}
          />
          <Text mt={2}>
            We've sent a verification email to{" "}
            <Text color="blue.500" fontWeight="bold" as="span">
              {resendEmailInput}
            </Text>
            . Please check your inbox and click the verification link.
          </Text>
        </>
      }
      imageSrc="src/assets/verify.png"
      onActionClick={handleResendClick}
      actionLabel={resendLoading ? "Resending..." : "Resend Verification Email"}
      actionDisabled={resendLoading || !resendEmailInput}
    />
  );
};

export default EmailVerificationPage;
