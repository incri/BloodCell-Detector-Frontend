import { Text } from "@chakra-ui/react";
import EmailActivationGrid from "../components/EmailActivationGrid";
import { useEmailStore } from "../state-managements/store/emailStore";
import { useResendEmail } from "../hooks/useResendEmail";

const EmailVerificationPage = () => {
  const userEmail = useEmailStore((state) => state.userEmail);

  // Use the useResendEmail hook to get the resendEmail function
  const {
    loading: resendLoading,
    error: resendError,
    resendEmail,
  } = useResendEmail();

  const handleResendClick = async () => {
    try {
      const userData = { email: userEmail }; // Prepare the email data
      await resendEmail(userData); // Call the resendEmail function
    } catch (error) {
      console.log(resendError);
    }
  };

  return (
    <EmailActivationGrid
      title="Verify Your Email"
      description={
        <>
          We've sent a verification email to{" "}
          <Text color="blue.500" fontWeight="bold" as="span">
            {userEmail}
          </Text>
          . Please check your inbox and click the verification link.
        </>
      }
      imageSrc="src/assets/verify.png"
      onActionClick={handleResendClick}
      actionLabel={resendLoading ? "Resending..." : "Resend Verification Email"}
      actionDisabled={resendLoading}
    />
  );
};

export default EmailVerificationPage;
