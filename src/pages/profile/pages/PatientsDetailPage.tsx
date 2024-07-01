import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Flex, Spinner, Alert, AlertIcon, VStack, Grid, GridItem, Icon, IconButton, Divider } from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaHome, FaUser, FaEdit } from 'react-icons/fa';
import usePatientDetail from '../hooks/usePatientsDetail';
import BloodTestCard from '../components/BloodTestCard';

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
    <Box p={4} mx="15%">
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        mb={4}
      >
        <Flex align="center" mb={4}>
          <Icon as={FaUser} fontSize="2xl" color="teal.500" mr={2} />
          <Text fontSize="2xl" fontWeight="bold" mr={2}>{patient.first_name} {patient.last_name}</Text>
          <IconButton
            aria-label="Edit patient"
            icon={<FaEdit />}
            colorScheme="teal"
            variant="ghost"
            size="sm"
            onClick={() => {/* Handle edit action here */}}
          />
        </Flex>
        <Divider orientation="horizontal" mb={4} />

        <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
          <GridItem>
            <Flex align="center">
              <Icon as={FaEnvelope} color="teal.500" mr={2} />
              <Text fontSize="lg">{patient.email}</Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex align="center">
              <Icon as={FaPhone} color="teal.500" mr={2} />
              <Text fontSize="lg">{patient.phone}</Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex align="center">
              <Icon as={FaBirthdayCake} color="teal.500" mr={2} />
              <Text fontSize="lg">{patient.birth_date}</Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex align="center">
              <Icon as={FaHome} color="teal.500" mr={2} />
              <Text fontSize="lg">{patient.address.street}, {patient.address.city}</Text>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold" mb={4}>Blood Tests</Text>
        {patient.blood_tests.length === 0 ? (
          <Text>No blood tests available</Text>
        ) : (
          <VStack spacing={4} width="100%">
            {patient.blood_tests.map((test) => (
              <BloodTestCard key={test.id} test={test} patientId={patient.id} />
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default PatientsDetailPage;