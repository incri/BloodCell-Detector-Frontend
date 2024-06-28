import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { PatientData } from '../hooks/usePatients';

interface PatientCardProps {
  patient: PatientData;
  onEdit: (patient: PatientData) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/patient/${patient.id}`);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      position="relative"
      onClick={handleCardClick}
      cursor="pointer"
    >
      <Button
        position="absolute"
        top="2"
        right="2"
        variant="ghost"
        size="sm"
        colorScheme="teal"
        leftIcon={<AiOutlineEdit />}
        onClick={(e) => { 
          e.stopPropagation();
          onEdit(patient);
        }}
      >
        Edit
      </Button>
      <Box p="6">
        <Flex align="center">
          <Box as={FaUser} fontSize="2xl" color="teal.500" mr="2" />
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            flex="1"
          >
            {patient.address.street}, {patient.address.city}
          </Box>
        </Flex>

        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
          {patient.first_name} {patient.last_name}
        </Box>

        <Flex align="center" mt={2}>
          <Text fontSize="sm" color="gray.600">
            {patient.phone}
          </Text>
          <Box ml={2} fontSize="sm" color="gray.500">
            {patient.email}
          </Box>
        </Flex>

        <Box mt={2} fontSize="sm" color="gray.500">
          Birth Date: {patient.birth_date}
        </Box>
      </Box>
    </Box>
  );
};

export default PatientCard;
