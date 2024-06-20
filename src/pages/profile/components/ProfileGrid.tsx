import React, { useState } from 'react';
import { Grid, GridItem, Box, useBreakpointValue } from '@chakra-ui/react';
import ProfileCard from './ProfileCard';
import ProfileEditForm from './ProfileEditForm';

const ProfileGrid: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Determine the grid template columns based on the breakpoint
  const gridTemplateColumns = useBreakpointValue({
    base: '1fr', // Single column for small and medium devices
    lg: '2fr 3fr', // 2:3 ratio for large devices and up
  });

  return (
    <Grid templateColumns={gridTemplateColumns} gap={4} p={4}>
      <GridItem>
        <Box bg="transparent" p={4} borderRadius="md">
          {isEditing ? (
            <ProfileEditForm onSave={() => setIsEditing(false)} />
          ) : (
            <ProfileCard onEdit={() => setIsEditing(true)} />
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
