// src/ProfileGrid.tsx
import React from 'react';
import { Grid, GridItem, Box, useBreakpointValue } from '@chakra-ui/react';
import ProfileCard from './ProfileCard';

const ProfileGrid: React.FC = () => {
  // Determine the grid template columns based on the breakpoint
  const gridTemplateColumns = useBreakpointValue({
    base: '1fr', // Single column for small and medium devices
    lg: '2fr 3fr', // 2:3 ratio for large devices and up
  });

  return (
    <Grid templateColumns={gridTemplateColumns} gap={4} p={4}>
      <GridItem>
        <Box bg="transparent" p={4} borderRadius="md">

        <ProfileCard
          />
          
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
