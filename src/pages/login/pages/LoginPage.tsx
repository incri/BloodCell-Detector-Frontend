import React from 'react';
import { Center } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../../../components/authContext";
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Center>
      <LoginForm />
    </Center>
  );
};

export default LoginPage;
