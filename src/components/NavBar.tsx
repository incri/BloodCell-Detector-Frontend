// components/Navbar.tsx
import { HStack, Image, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { useAuth } from "./authContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <HStack justifyContent="space-between" padding={5}>
      <Link to="/">
        <Image src={Logo} boxSize="60px" />
      </Link>
      <HStack spacing={4}>
        <ColorModeSwitch />
        {isAuthenticated && (
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
