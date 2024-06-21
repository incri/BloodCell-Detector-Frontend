import React from 'react';
import { Box, Spinner, Alert, AlertIcon, SimpleGrid } from '@chakra-ui/react';
import useHospital from '../../registration/hooks/useHospital';
import HospitalCard from '../components/HospitalCard';

const HospitalDetailPage = () => {
  const { data, error, isLoading } = useHospital('');

  return (
    <Box p={4}>
      {isLoading && <Spinner />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {!isLoading && !error && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {data.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default HospitalDetailPage;
