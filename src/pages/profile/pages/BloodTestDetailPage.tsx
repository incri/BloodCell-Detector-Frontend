import React, { useCallback, useMemo, useState } from 'react';
import { Box, Text, Image, Heading, SimpleGrid, Divider, Button, Flex, Badge, Icon, IconButton } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useDropzone, Accept } from 'react-dropzone';
import { FaEdit, FaImage, FaNotesMedical } from 'react-icons/fa';
import { BloodTest, ImageData, Result } from '../hooks/usePatients';
import { useAddBloodTestImageData } from '../hooks/useAddBloodTestImageData';
import { MdBloodtype } from 'react-icons/md';
import EditBloodTestModal from '../components/EditBloodTestModal';

interface BloodTestDetailPageProps {
  test?: BloodTest;
}

const BloodTestDetailPage: React.FC<BloodTestDetailPageProps> = () => {
  const location = useLocation();
  const { patientId, bloodTest } = location.state || {};

  const [files, setFiles] = useState<File[]>([]);
  const { profileBloodTestImageData, loading, error } = useAddBloodTestImageData(); // Use the custom hook

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  }, [files]);

  const accept: Accept = useMemo(() => ({
    'image/*': ['.jpeg', '.jpg', '.png']
  }), []);

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop,
  });

  const handleUpload = async () => {
    if (!bloodTest || !patientId) return;

    const formData = new FormData();
    files.forEach(file => formData.append('image', file));

    try {
      await profileBloodTestImageData(patientId, bloodTest.id, formData); // Pass the formData to the hook
      console.log('Files uploaded successfully');
      setFiles([]); // Clear files after successful upload
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleClear = () => {
    setFiles([]);
  };

  const renderAlbum = (images: ImageData[]) => {
    const previewImages = images.slice(0, 3);
    const extraImagesCount = images.length - previewImages.length;

    return (
      <Box position="relative" overflow="hidden" boxShadow="sm" width="200px" height="220px">
        {previewImages.map((image, index) => (
          <Box
            key={image.id}
            position="absolute"
            top={`${index * 10}px`}
            left={`${index * 10}px`}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
            transform={`rotate(${index * 5}deg)`}
          >
            <Image src={image.image} alt={`Result image ${image.id}`} width="160px" height="180px" objectFit="cover" />
          </Box>
        ))}
        {extraImagesCount > 0 && (
          <Badge
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            borderRadius="full"
            px="4"
            py="2"
            fontSize="md"
            colorScheme="blue"
          >
            +{extraImagesCount}
          </Badge>
        )}
      </Box>
    );
  };

  if (!bloodTest) {
    return <Text>No blood test data available</Text>;
  }

  return (
    <Box p={4} mx="15%">
      <Box
        p={6}
        borderRadius="lg"
        mb={4}
      >
        <Flex align="center" mb={4}>
          <Icon as={MdBloodtype} fontSize="2xl" color="teal.500" mr={2} />
          <Text fontSize="2xl" fontWeight="bold" mr={2}>{bloodTest.title}</Text>
          <IconButton
            aria-label="Edit patient"
            icon={<FaEdit />}
            colorScheme="teal"
            variant="ghost"
            size="sm"
            onClick={() => setIsEditModalOpen(true)} // Open the modal
          />
        </Flex>
        <Flex align="center">
          <Text fontSize="lg">{bloodTest.description}</Text>
        </Flex>
      </Box>

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

          {/* Result Section */}
          <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={4}>
            <Heading as="h3" size="md" mb={4}>
              Results
            </Heading>
            <Divider mb={4} />
            {bloodTest.results.length > 0 ? (
              <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
                {bloodTest.results.map((result: Result) => (
                  <Box key={result.id} mb={4} borderWidth="1px" borderRadius="lg" p={4} boxShadow="sm">
                    <Text mb={2}><strong>ID:</strong> {result.id}</Text>
                    {result.result_images.length > 0 ? (
                      <Flex justifyContent="center">
                        {renderAlbum(result.result_images)}
                      </Flex>
                    ) : (
                      <Flex direction="column" alignItems="center" justifyContent="center" height="100%">
                        <FaImage size="50px" color="gray" />
                        <Text>No images available</Text>
                      </Flex>
                    )}
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Text>No results available</Text>
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
              <Button colorScheme="blue" onClick={handleUpload} mr={2} isLoading={loading}>
                Upload Images
              </Button>
              <Button colorScheme="red" onClick={handleClear}>
                Clear
              </Button>
            </Flex>
            {error && <Text color="red.500" mt={2}>{error}</Text>}
          </Box>
        </Box>
      </Flex>

      <EditBloodTestModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient_id={ patientId } // Pass the patient data
        blood_test={bloodTest}
      />
    </Box>
  );
};

export default BloodTestDetailPage;
