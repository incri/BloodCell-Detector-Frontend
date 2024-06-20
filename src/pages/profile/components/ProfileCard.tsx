import React from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Image,
  Divider,
  useBreakpointValue,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import useUserDetail from '../hooks/useUserDetail';

interface ProfileCardProps {
  onEdit: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onEdit }) => {
  const profileInfoWidth = useBreakpointValue({ base: '100%', lg: '70%' });
  const { data: userDetail, error, isLoading } = useUserDetail();

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
        <Box
          boxSize="200px"
          borderRadius="full"
          overflow="hidden"
          border="3px solid"
          borderColor="gray.200"
          boxShadow="lg"
        >
          <Image src={"https://via.placeholder.com/150"} boxSize="100%" objectFit="cover" />
        </Box>
        <VStack align="flex-start" spacing={2} width={profileInfoWidth}>
          <Text fontSize="2xl" fontWeight="bold">
            {`${userDetail.first_name} ${userDetail.last_name}`}
          </Text>
          <Text fontSize="lg" color="gray.500">
            {userDetail.username}
          </Text>
          <Button width="100%" colorScheme="teal" variant="solid" onClick={onEdit}>
            Edit Profile
          </Button>
          <Divider orientation="horizontal" />
        </VStack>
      </VStack>
    </Box>
  );
};

export default ProfileCard;
