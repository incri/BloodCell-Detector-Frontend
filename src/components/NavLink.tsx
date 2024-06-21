import React from 'react';
import { HStack, Link as ChakraLink, useColorModeValue, Box, Icon } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { IconType } from 'react-icons'; // Import this for type checking

interface NavLinksProps {
  username: string;
  links: { name: string, path: string, icon: IconType }[]; // Add icon type
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
              display="flex"
              alignItems="center"
            >
              <Icon as={link.icon} mr={2} /> {/* Add the Icon component */}
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
