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

  // Define the base links
  const baseLinks = [
    { name: "Overview", path: "/", icon: GrOverview },
    {name: "Patients", path: "?tab=patients", icon: FaUser}
  ];

  // Define the authenticated-only links
  const adminLinks = [
    { name: "Hospitals", path: "?tab=hospitals", icon: GiHospitalCross },
    { name: "Users", path: "?tab=users", icon: FaUser }
  ];

  // Combine the links based on authentication status
  const links = user.is_superuser || user.is_hospital_admin ? [...baseLinks, ...adminLinks] : baseLinks;

  return (
    <VStack width="100%" align="flex-start">
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
        links={links}
      />
    </VStack>
  );
};

export default Navbar;
