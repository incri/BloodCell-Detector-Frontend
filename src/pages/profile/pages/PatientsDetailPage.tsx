import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Flex, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import usePatientDetail from '../hooks/usePatientsDetail';

const PatientsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: patient, error, isLoading } = usePatientDetail(id!);

  if (isLoading) return <Spinner />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  );

  if (!patient) return null;

  return (
    <Box p={4}>
      <Flex direction="column">
        <Text fontSize="xl" fontWeight="bold">{patient.first_name} {patient.last_name}</Text>
        <Text>Email: {patient.email}</Text>
        <Text>Phone: {patient.phone}</Text>
        <Text>Birth Date: {patient.birth_date}</Text>
        <Text>Address: {patient.address.street}, {patient.address.city}</Text>
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">Blood Tests</Text>
          {patient.blood_tests.length === 0 ? (
            <Text>No blood tests available</Text>
          ) : (
            patient.blood_tests.map((test) => (
              <Box key={test.id} mt={2} p={2} borderWidth="1px" borderRadius="md">
                <Text>Title: {test.title}</Text>
                <Text>Description: {test.description}</Text>
                <Text>Results: {test.results.length}</Text>
              </Box>
            ))
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default PatientsDetailPage;
