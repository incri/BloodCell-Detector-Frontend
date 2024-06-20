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
} from '@chakra-ui/react';
import useUserDetail from '../hooks/useUserDetail';
import { useProfile } from '../hooks/useProfile';
import { profileFormSchema } from '../validations/profileFormSchema';

interface ProfileEditFormProps {
  onSave: (details: { firstName: string; lastName: string; email: string; }) => void;
  firstName: string;
  lastName: string;
  email: string;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ onSave, firstName, lastName, email }) => {
  const profileInfoWidth = useBreakpointValue({ base: '100%', lg: '50%' });
  const { error, isLoading } = useUserDetail();
  const { loading: saving, profileUser } = useProfile(); // Use the useProfile hook
  const [currentFirstName, setCurrentFirstName] = useState(firstName);
  const [currentLastName, setCurrentLastName] = useState(lastName);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      await profileFormSchema.parseAsync({ first_name: currentFirstName, last_name: currentLastName, email: currentEmail });
      await profileUser({ first_name: currentFirstName, last_name: currentLastName, email: currentEmail });
      onSave({
        firstName: currentFirstName,
        lastName: currentLastName,
        email : currentEmail
      });
    } catch (err) {
      console.error('Validation Error:', err);
    }
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
          <Image src={avatar ? URL.createObjectURL(avatar) : "https://via.placeholder.com/150"} boxSize="100%" objectFit="cover" />
          <Input type="file" position="absolute" top="0" left="0" width="100%" height="100%" opacity="0" cursor="pointer" onChange={handleAvatarChange} />
        </Box>
        <VStack align="flex-start" spacing={2} width={profileInfoWidth}>
          <Input
            placeholder="First Name"
            value={currentFirstName}
            onChange={(e) => setCurrentFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={currentLastName}
            onChange={(e) => setCurrentLastName(e.target.value)}
          />

            <Input
            placeholder="Email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            hidden
          />
          
          <Button width="100%" colorScheme="teal" variant="solid" onClick={handleSave} isLoading={saving}>
            Save Profile
          </Button>
          <Divider orientation="horizontal" />
        </VStack>
      </VStack>
    </Box>
  );
};

export default ProfileEditForm;
