import React, { useState } from 'react';
import {
  Box,
  VStack,
  Button,
  Image,
  Divider,
  useBreakpointValue,
  Input,
  Spinner,
  Alert,
  AlertIcon,
  Text
} from '@chakra-ui/react';
import useUserDetail from '../hooks/useUserDetail';

interface ProfileEditFormProps {
  onSave: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ onSave }) => {
  const profileInfoWidth = useBreakpointValue({ base: '100%', lg: '70%' });
  const { data: userDetail, error, isLoading } = useUserDetail();
  const [firstName, setFirstName] = useState(userDetail?.first_name || '');
  const [lastName, setLastName] = useState(userDetail?.last_name || '');
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // Implement the save functionality here
    console.log('Save button clicked');
    onSave();
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  if (!userDetail) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text>No user data available</Text>
      </Box>
    );
  }

  return (
    <Box
      bgSize="cover"
      bgPosition="center"
      p={8}
      borderRadius="md"
      width="100%"
      maxWidth="800px"
      mx="auto"
    >
      <VStack spacing={6}>
        <Box position="relative" boxSize="200px" borderRadius="full" overflow="hidden" border="3px solid" borderColor="gray.200" boxShadow="lg">
          <Image src={"https://via.placeholder.com/150"} boxSize="100%" objectFit="cover" />
          <Input type="file" position="absolute" top="0" left="0" width="100%" height="100%" opacity="0" cursor="pointer" onChange={handleAvatarChange} />
        </Box>
        <VStack align="flex-start" spacing={2} width={profileInfoWidth}>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button width="100%" colorScheme="teal" variant="solid" onClick={handleSave}>
            Save Profile
          </Button>
          <Divider orientation="horizontal" />
        </VStack>
      </VStack>
    </Box>
  );
};

export default ProfileEditForm;
