import { HStack, Image } from "@chakra-ui/react";
import Logo from "../assets/Logo.png";
import ColorModeSwitch from "./ColorModeSwitch";

const Navbar = () => {
  return (
    <HStack justifyContent="space-between" padding={5}>
      <Image src={Logo} boxSize="60px" />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
