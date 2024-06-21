import { VStack, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useAuth } from "./authContext";
import ProfileDrawer from "./ProfileDrawer";
import NavLinks from "./NavLink";
import { GrOverview } from "react-icons/gr";
import { GiHospitalCross } from "react-icons/gi";
import { FaUser } from "react-icons/fa";


const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  if (!user) return null; // Ensure user is defined before rendering

  return (
    <VStack width="100%" align="flex-start" >
      {/* Logo and Profile Drawer */}
      <HStack justifyContent="space-between" width="100%" padding={2}>
        <Link to="/">
          <Image src={Logo} boxSize="60px" />
        </Link>
        {isAuthenticated && (
          <ProfileDrawer
            src="https://via.placeholder.com/50"
            alt="Profile Image"
          />
        )}
      </HStack>
      {/* Navigation Links */}
      <NavLinks
        username={user.username}
        links={[
          { name: "Overview", path: "/", icon: GrOverview },
          { name: "Hospitals", path: "?tab=hospitals", icon: GiHospitalCross },
          { name: "Users", path: "?tab=users", icon : FaUser }
        ]}
      />
    </VStack>
  );
};

export default Navbar;
