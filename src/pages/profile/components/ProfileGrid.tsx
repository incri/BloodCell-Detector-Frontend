import React, { useState } from 'react';
import {
  Grid,
  GridItem,
  Box,
  useBreakpointValue,
  VStack,
  Button,
  Image,
  Input,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import useUserDetail from '../hooks/useUserDetail';
import { useProfile } from '../hooks/useProfile';
import { profileFormSchema } from '../validations/profileFormSchema';
import { useQueryClient } from '@tanstack/react-query';

interface ProfileGridProps {
  TabComponent: React.FC;
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ TabComponent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // State for image preview

  const gridTemplateColumns = useBreakpointValue({
    base: '1fr',
    lg: '2fr 3fr',
  });

  const { data: userDetail, error, isLoading } = useUserDetail();
  const { loading: saving, updateUserProfile } = useProfile();

  const handleEdit = () => {
    if (userDetail) {
      setUserDetails({
        firstName: userDetail.first_name,
        lastName: userDetail.last_name,
        email: userDetail.email,
      });
      setAvatarPreview(userDetail.profile_image || null); // Set preview from existing image
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      // Validate the form data
      await profileFormSchema.parseAsync({
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        email: userDetails.email,
        profile_image: avatar, // Include profile_image in validation
      });

      // Create FormData for submission
      const formData = new FormData();
      formData.append('first_name', userDetails.firstName);
      formData.append('last_name', userDetails.lastName);
      formData.append('email', userDetails.email);

      if (avatar) {
        formData.append('profile_image', avatar); // Append the profile image if available
      }

      await updateUserProfile(formData); // Pass FormData containing the image
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['data', '/auth/users/me/'] });
    } catch (err) {
      console.error('Validation Error:', err);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatar(file); // Set the selected file
      setAvatarPreview(URL.createObjectURL(file)); // Set the preview URL for the selected image
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatar(null); // Clear the selected image
    setAvatarPreview(null); // Clear the image preview
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
          {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Grid templateColumns={gridTemplateColumns} gap={4} p={4}>
      <GridItem>
        <Box p={4} borderRadius="md">
          {isEditing ? (
            <Box
              position="relative"
              bgSize="cover"
              bgPosition="center"
              p={8}
              borderRadius="md"
              width="100%"
              maxWidth="800px"
              mx="auto"
            >
              <IconButton
                aria-label="Cancel"
                icon={<CloseIcon />}
                position="absolute"
                top="2"
                right="2"
                size="sm"
                borderRadius="full"
                onClick={handleCancel}
                variant="outline"
                colorScheme="red"
              />
              <VStack spacing={6}>
                <Box
                  position="relative"
                  boxSize="200px"
                  borderRadius="full"
                  overflow="hidden"
                  border="3px solid"
                  borderColor="gray.200"
                  boxShadow="lg"
                >
                  <Image
                    src={avatarPreview || userDetail?.profile_image || ''} // Use preview if available, fallback to existing image
                    boxSize="100%"
                    objectFit="cover"
                  />
                  <Input
                    type="file"
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    opacity="0"
                    cursor="pointer"
                    onChange={handleAvatarChange}
                  />
                </Box>
                <VStack align="flex-start" spacing={2} width="60%">
                  <Input
                    placeholder="First Name"
                    value={userDetails.firstName}
                    onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                  />
                  <Input
                    placeholder="Last Name"
                    value={userDetails.lastName}
                    onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    hidden
                  />
                  <Button
                    width="100%"
                    colorScheme="teal"
                    variant="solid"
                    onClick={handleSave}
                    isLoading={saving}
                  >
                    Save Profile
                  </Button>
                  <Divider orientation="horizontal" />
                </VStack>
              </VStack>
            </Box>
          ) : (
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
                <Box
                  boxSize="200px"
                  borderRadius="full"
                  overflow="hidden"
                  border="3px solid"
                  borderColor="gray.200"
                  boxShadow="lg"
                >
                  <Image src={userDetail?.profile_image || ''} boxSize="100%" objectFit="cover" />
                </Box>
                <VStack align="flex-start" spacing={2} width="60%">
                  <Text fontSize="2xl" fontWeight="bold">
                    {`${userDetail?.first_name} ${userDetail?.last_name}`}
                  </Text>
                  <Text fontSize="lg" color="gray.500">
                    {userDetail?.username}
                  </Text>
                  <Button width="100%" colorScheme="teal" variant="solid" onClick={handleEdit}>
                    Edit Profile
                  </Button>
                  <Divider orientation="horizontal" />
                </VStack>
              </VStack>
            </Box>
          )}
        </Box>
      </GridItem>
      <GridItem>
        <Box p={4} borderRadius="md">
          <VStack width="100%" align="flex-start">
            <TabComponent />
          </VStack>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProfileGrid;
