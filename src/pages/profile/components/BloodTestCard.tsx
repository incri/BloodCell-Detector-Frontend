import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { BloodTest } from '../hooks/usePatients';



interface BloodTestCardProps {
  test: BloodTest;
}

const BloodTestCard: React.FC<BloodTestCardProps> = ({ test }) => {
  return (
    <Box
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p="4"
      mt="2"
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
