import React, { useState } from 'react';
import { Grid, GridItem, Box, useBreakpointValue } from '@chakra-ui/react';
import ProfileCard from './ProfileCard';
import ProfileEditForm from './ProfileEditForm';

const ProfileGrid: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Determine the grid template columns based on the breakpoint
  const gridTemplateColumns = useBreakpointValue({
    base: '1fr', // Single column for small and medium devices
    lg: '2fr 3fr', // 2:3 ratio for large devices and up
  });

  const handleEdit = (details: { firstName: string; lastName: string; email:string}) => {
    setUserDetails(details);
    setIsEditing(true);
  };

  const handleSave = (details: { firstName: string; lastName: string; email : string}) => {
    // Implement save logic here, if needed
    setUserDetails(details);
    setIsEditing(false);
  };

  return (
    <Grid templateColumns={gridTemplateColumns} gap={4} p={4}>
      <GridItem>
        <Box bg="transparent" p={4} borderRadius="md">
          {isEditing ? (
            <ProfileEditForm
              onSave={handleSave}
              firstName={userDetails.firstName}
              lastName={userDetails.lastName}
              email = {userDetails.email}
            />
          ) : (
            <ProfileCard onEdit={handleEdit} />
          )}
        </Box>
      </GridItem>
      <GridItem display={{ base: 'none', lg: 'block' }}>
        <Box bg="gray.200" p={4} borderRadius="md">
          {/* Profile detail section content here */}
          Profile Detail Section
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProfileGrid;
