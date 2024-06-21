import React from 'react';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { Hospital } from '../../registration/hooks/useHospital';
import { FaHospital } from 'react-icons/fa'; // Importing the hospital icon
import { AiOutlineEdit } from 'react-icons/ai'; // Importing the edit icon

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      position="relative" // Added position relative for absolute positioning of the edit button
    >
      <Button
        position="absolute"
        top="2"
        right="2"
        variant="ghost"
        size="sm"
        colorScheme="teal"
        leftIcon={<AiOutlineEdit />}
      >
        Edit
      </Button>
      <Box p="6">
        <Flex align="center">
          <Box as={FaHospital} fontSize="2xl" color="teal.500" mr="2" /> {/* Hospital icon */}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            flex="1"
          >
            {hospital.address}
          </Box>
        </Flex>

        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
          {hospital.name}
        </Box>

        <Flex align="center" mt={2}>
          <Text fontSize="sm" color="gray.600">
            {hospital.phone}
          </Text>
          <Box ml={2} fontSize="sm" color="gray.500">
            {hospital.email}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default HospitalCard;
