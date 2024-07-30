import { useState } from "react";
import { useParams } from "react-router-dom";
import EmailActivationGrid from "../components/EmailActivationGrid";
import { useActivateEmail } from "../hooks/useActivateEmail";
import { useNavigate } from "react-router-dom";
import SucessMessageGrid from "../../../components/SucessMessageGrid"; // Corrected the import

const EmailActivationPage = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const {
    loading: activateLoading,
    error: activateError,
    response,
    activateEmail,
  } = useActivateEmail();

  const { status } = response || {};

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleActivateClick = async () => {
    if (uid && token) {
      try {
        const userData = { uid: uid, token: token };
        const result = await activateEmail(userData);

        if (!result) {
        } else {
          setIsSuccessModalOpen(true);
        }
      } catch (error) {
        console.error("Error during activation:", error);
      }
    } else {
      console.log("UID or token is missing.");
    }
  };
  const handleLoginClick = async () => {
    navigate("/login");
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      {status === 403 ? (
        <EmailActivationGrid
          title="Email Already Activated"
          description="You can now log in using your email."
          imageSrc="/src/assets/verify.png"
          onActionClick={handleLoginClick}
          actionLabel="Login"
          actionDisabled={false} // You can customize this as needed
        />
      ) : (
        <EmailActivationGrid
          title="Activate Your Email"
          description="Click on the Activate Email button below to activate your email"
          imageSrc="/src/assets/verify.png"
          onActionClick={handleActivateClick}
          actionLabel={activateLoading ? "Loading..." : "Activate Email"}
          actionDisabled={activateLoading}
        />
      )}

      {isSuccessModalOpen && status === 204 && (
        <SucessMessageGrid
          isOpen={isSuccessModalOpen}
          onClose={closeSuccessModal}
          title="Activation Successful"
          message="Your email has been successfully activated."
          buttonText="OK"
        />
      )}
      {activateError && <p style={{ color: "red" }}>{activateError.message}</p>}
    </>
  );
};

export default EmailActivationPage;
