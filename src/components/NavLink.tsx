// components/NavLinks.tsx
import React from 'react';
import { HStack, Link as ChakraLink, useColorModeValue, Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface NavLinksProps {
  username: string;
  links: { name: string, path: string }[];
}

const NavLinks: React.FC<NavLinksProps> = ({ username, links }) => {
  const location = useLocation();
  const activeColor = useColorModeValue("black", "white");
  const inactiveColor = useColorModeValue("gray.600", "gray.400");
  const activeBorderColor = useColorModeValue("black", "white");

  return (
    <HStack spacing={6}>
      {links.map(link => {
        const fullPath = `/${username}${link.path}`;
        const isActive = location.pathname === fullPath || location.search === link.path;

        return (
          <Box key={link.name} position="relative" padding={4} >
            <ChakraLink
            
              as={Link}
              to={fullPath}
              fontWeight={isActive ? "bold" : "normal"}
              color={isActive ? activeColor : inactiveColor}
              _hover={{ textDecoration: "none", color: activeColor }}
              paddingBottom={2}
            >
              {link.name}
            </ChakraLink>
            {isActive && (
              <Box
                position="absolute"
                bottom={0}
                left={0}
                width="100%"
                height="2px"
                bg={activeBorderColor}
                zIndex={-1}
              />
            )}
          </Box>
        );
      })}
    </HStack>
  );
};

export default NavLinks;
