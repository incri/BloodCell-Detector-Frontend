import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BloodTest, PatientData } from '../hooks/usePatients'; // Assuming BloodTest type is imported

interface BloodTestCardProps {
  test: BloodTest;
  patient: PatientData;
}

const BloodTestCard: React.FC<BloodTestCardProps> = ({ test, patient }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/patients/${patient.id}/blood-test/${test.id}`, { state: {patient:patient, bloodTest: test} });
  };

  return (
    <Box
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p="4"
      mt="2"
      onClick={handleCardClick}
      cursor="pointer"
    >
      <Flex direction="column">
        <Text fontSize="lg" fontWeight="bold">{test.title}</Text>
        <Text mt={2}>{test.description}</Text>
        <Text mt={2} color="gray.500">Results: {test.results.length}</Text>
      </Flex>
    </Box>
  );
};

export default BloodTestCard;
