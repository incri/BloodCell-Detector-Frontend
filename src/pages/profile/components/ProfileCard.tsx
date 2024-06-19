// src/ProfileCard.tsx
import React from 'react';
import { Box, VStack, Text, Button, Image, Divider, useBreakpointValue } from '@chakra-ui/react';

interface ProfileCardProps {
  profilePicture: string;
  fullName: string;
  username: string;
  onEditProfile: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profilePicture, fullName, username, onEditProfile }) => {

    const profileInfoWidth = useBreakpointValue({ base: '100%', lg: '50%' });
  return (
    <VStack
      p={6}
      borderRadius="md"
      width="100%"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Box
        boxSize="250px"
        borderRadius="full"
        overflow="hidden"
        border="2px"
        borderColor="gray.200"
        cursor="pointer"
      >
        <Image src={profilePicture} boxSize="100%" objectFit="cover" />
      </Box>
      <VStack align="flex-center" spacing={2} width={profileInfoWidth}>
        <Text fontSize="xl" fontWeight="bold">{fullName}</Text>
        <Text fontSize="md" color="gray.500">@{username}</Text>
        <Button colorScheme="teal" onClick={onEditProfile}>Edit Profile</Button>
        <Box boxSize={4} />

      <Divider orientation="horizontal" />
      </VStack>
      
    </VStack>
  );
};

export default ProfileCard;
