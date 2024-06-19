// components/Navbar.tsx
import { HStack, Image, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { useAuth } from "./authContext";
import ProfileDrawer from "./ProfileDrawer";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
    <HStack justifyContent="space-between" padding={5} >
      <Link to="/">
        <Image src={Logo} boxSize="60px" />
      </Link>
      <HStack spacing={4}>
        {isAuthenticated && (
          <ProfileDrawer
          src="https://via.placeholder.com/50"
          alt="Profile Image"
        />

        )}
        
      </HStack>
    </HStack>
    
    </>
    
  );
};

export default Navbar;
