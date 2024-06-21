// components/ProfileGrid.tsx
import React, { useState } from 'react';
import { Grid, GridItem, Box, useBreakpointValue, VStack } from '@chakra-ui/react';
import ProfileCard from './ProfileCard';
import ProfileEditForm from './ProfileEditForm';
import ExtraActivityBar from './ExtraActivityBar';

interface ProfileGridProps {
  TabComponent: React.FC;
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ TabComponent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const gridTemplateColumns = useBreakpointValue({
    base: '1fr',
    lg: '2fr 3fr',
  });

  const handleEdit = (details: { firstName: string; lastName: string; email: string }) => {
    setUserDetails(details);
    setIsEditing(true);
  };

  const handleSave = (details: { firstName: string; lastName: string; email: string }) => {
    setUserDetails(details);
    setIsEditing(false);
  };

  return (
    <Grid templateColumns={gridTemplateColumns} gap={4} p={4}>
      <GridItem>
        <Box p={4} borderRadius="md">
          {isEditing ? (
            <ProfileEditForm
              onSave={handleSave}
              firstName={userDetails.firstName}
              lastName={userDetails.lastName}
              email={userDetails.email}
            />
          ) : (
            <ProfileCard onEdit={handleEdit} />
          )}
        </Box>
      </GridItem>
      <GridItem>
        <Box p={4} borderRadius="md">
          <VStack width="100%" align="flex-start">
            <Box mt={4} width={"100%"}>
            <ExtraActivityBar />

              <TabComponent />
            </Box>
          </VStack>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProfileGrid;
