// src/ProfileDrawer.tsx
import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  Box,
  Image,
  Text,
  HStack,
  Icon,
  Divider,
} from '@chakra-ui/react';

import { useAuth } from './authContext';
import MenuButton from './MenuButtons';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ColorModeSwitch from './ColorModeSwitch';

interface ProfileDrawerProps {
  src: string;
  alt: string;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ src, alt }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLDivElement>(null);
  const {user, logout} = useAuth()
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Box
        boxSize="50px"
        borderRadius="full"
        overflow="hidden"
        border="2px"
        borderColor="gray.200"
        cursor="pointer"
        onClick={onOpen}
      >
        <Image src={src} alt={alt} boxSize="100%" objectFit="cover" />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerHeader>

          <HStack spacing={4}>
              <Box
                boxSize="40px"
                overflow="hidden"
                borderRadius={100}
                border="2px"
                borderColor="gray.200"
              >
                <Image src={src} alt={alt} boxSize="100%" objectFit="cover" />
              </Box>
                <VStack align={'flex-start'} spacing={1}>
                <Text fontSize={"sm"}>{user?.username}</Text>
                <Text fontSize={"xs"} color={'gray.500'}>{user?.full_name}</Text>
                </VStack>
              
              </HStack>

          </DrawerHeader>

          <DrawerBody>
            
              <VStack spacing={1} align={'flex-start'}>
              <ColorModeSwitch /> 
              <Divider orientation='horizontal' />
              <MenuButton icon={FaUser} text="Profile" to={"/me"}/>
              <Divider orientation='horizontal' />

              <MenuButton icon={FaCog} text="Settings" to={"/me"}/>

              <Button
                w="100%"
                bg="transparent"
                justifyContent="flex-start"
                textAlign="left"
                fontWeight="semilight"
                fontSize="sm"
                onClick={handleLogout}
                >
                <HStack spacing={4}>
                    <Icon as={FaSignOutAlt} boxSize={'1.3em'} />
                    <Text>Sign out</Text>
                </HStack>
            </Button>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
