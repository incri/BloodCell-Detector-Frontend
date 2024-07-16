import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { Result } from '../hooks/usePatients';

const BloodTestResultDetailPage: React.FC = () => {
  const location = useLocation();
  const { result } = location.state as { result: Result };

  if (!result) {
    return <Text>No result data available</Text>;
  }

  return (
    <Box p={4} mx="15%">
      <Heading as="h2" size="lg" mb={4}>Result Detail</Heading>
      <Text mb={4}><strong>ID:</strong> {result.id}</Text>
      <Text mb={4}><strong>Description:</strong> {result.description}</Text>

      {result.result_images.length > 0 ? (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {result.result_images.map((image) => (
            <Box key={image.id} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
              <Image src={image.image} alt={`Result image ${image.id}`} boxSize="100%" objectFit="cover" />
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No images available</Text>
      )}
    </Box>
  );
};

export default BloodTestResultDetailPage;
