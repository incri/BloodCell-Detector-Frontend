import React, { useCallback, useState } from 'react';
import { Box, Text, Image, Heading, SimpleGrid, Divider, Button, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useDropzone, Accept } from 'react-dropzone';
import { BloodTest, ImageData } from '../hooks/usePatients';

interface BloodTestDetailPageProps {
  test?: BloodTest;
}

const BloodTestDetailPage: React.FC<BloodTestDetailPageProps> = () => {
  const location = useLocation();
  const { patientId, bloodTest } = location.state || {};

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  }, [files]);

  const accept: Accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif']
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop,
  });

  const handleUpload = () => {
    // Handle the upload logic here
    console.log('Files to upload:', files);
  };

  const handleClear = () => {
    setFiles([]);
  };

  if (!bloodTest) {
    return <Text>No blood test data available</Text>;
  }

  return (
    <Box p={4} mx="15%">
      <Flex>
        <Box flex="7">
          <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={4}>
            <Heading as="h3" size="md" mb={4}>
              Test Dataset
            </Heading>
            <Divider mb={4} />
            {bloodTest.images.length > 0 ? (
              <SimpleGrid columns={{ sm: 1, md: 3, lg: 5 }} spacing={4}>
                {bloodTest.images.map((image: ImageData) => (
                  <Box key={image.id} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
                    <Image src={image.image} alt={`Blood test image ${image.id}`} boxSize="100%" objectFit="cover" />
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Text>No images uploaded</Text>
            )}
          </Box>
        </Box>
        <Box flex="3" ml={4}>
          <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={4}>
            <Heading as="h3" size="md" mb={4}>
              Image Upload
            </Heading>
            <Divider mb={4} />
            <Box {...getRootProps()} p={4} borderWidth="1px" borderRadius="lg" boxShadow="sm" mb={4} cursor="pointer">
              <input {...getInputProps()} />
              <Text>Drag 'n' drop some files here, or click to select files</Text>
            </Box>
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
              {files.map((file) => (
                <Box key={file.name} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm">
                  <Image src={URL.createObjectURL(file)} alt={file.name} boxSize="100%" objectFit="cover" />
                </Box>
              ))}
            </SimpleGrid>
            <Flex mt={4}>
              <Button colorScheme="blue" onClick={handleUpload} mr={2}>
                Upload Images
              </Button>
              <Button colorScheme="red" onClick={handleClear}>
                Clear
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default BloodTestDetailPage;
