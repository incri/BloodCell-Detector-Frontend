import React, { useCallback, useMemo, useState } from 'react';
import { Box, Text, Image, Heading, SimpleGrid, Divider, Button, Flex, IconButton, Icon, Badge } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useDropzone, Accept } from 'react-dropzone';
import { FaEdit, FaImage, FaTrashAlt } from 'react-icons/fa';
import { MdBloodtype } from 'react-icons/md';
import { BloodTest, ImageData, Result } from '../hooks/usePatients';
import { useAddBloodTestImageData } from '../hooks/useAddBloodTestImageData';
import EditBloodTestModal from '../components/EditBloodTestModal';
import { useEditBloodTestImageData } from '../hooks/useEditBloodTestImageData';
import { useNavigate } from 'react-router-dom';

interface BloodTestDetailPageProps {
  test?: BloodTest;
}

const BloodTestDetailPage: React.FC<BloodTestDetailPageProps> = () => {
  const location = useLocation();
  const { patientId, bloodTest } = location.state || {};

  const [files, setFiles] = useState<File[]>([]);
  const { profileBloodTestImageData, loading } = useAddBloodTestImageData();
  const { loading: editLoading, EditBloodTestImageData } = useEditBloodTestImageData();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedImages, setEditedImages] = useState<ImageData[]>(bloodTest?.images || []);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleResultClick = (result: Result) => {
    navigate(`/patients/${patientId}/blood-test/${bloodTest.id}/result-detail`, { state: { result } });
  };

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
      await profileBloodTestImageData(patientId, bloodTest.id, formData);
      console.log('Files uploaded successfully');
      setFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleClear = () => {
    setFiles([]);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedImages(bloodTest?.images || []);
  };

  const handleDeleteImage = (imageId: number) => {
    setEditedImages(editedImages.filter(image => image.id !== imageId));
    setDeletedImageIds([...deletedImageIds, imageId]);
  };

  const handleUpdate = async () => {
    if (!bloodTest || !patientId) return;

    const formData = new FormData();
    deletedImageIds.forEach(id => formData.append('image_ids', id.toString()));

    try {
      await EditBloodTestImageData(patientId, bloodTest.id, formData);
      console.log('Images updated successfully');
      setEditMode(false);
      setDeletedImageIds([]); // Clear the deleted image IDs after successful update
    } catch (error) {
      console.error('Error updating images:', error);
    }
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
      <Box p={6} borderRadius="lg" mb={4}>
        <Flex align="center" mb={4}>
          <Icon as={MdBloodtype} fontSize="2xl" color="teal.500" mr={2} />
          <Text fontSize="2xl" fontWeight="bold" mr={2}>{bloodTest.title}</Text>
          <IconButton
            aria-label="Edit title"
            icon={<FaEdit />}
            colorScheme="teal"
            variant="ghost"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
          />
        </Flex>
        <Flex align="center">
          <Text fontSize="lg">{bloodTest.description}</Text>
        </Flex>
      </Box>

      <Flex>
        <Box flex="7">
          <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={4}>
            <Flex justifyContent={'space-between'}>
              <Heading as="h3" size="md" mb={4}>
                Test Dataset
              </Heading>
              {!editMode && (
                <IconButton
                  aria-label="Edit images"
                  icon={<FaEdit />}
                  colorScheme="teal"
                  variant="ghost"
                  size="sm"
                  onClick={handleEditClick}
                />
              )}
            </Flex>
            <Divider mb={4} />
            {editedImages.length > 0 ? (
              <SimpleGrid columns={{ sm: 1, md: 3, lg: 5 }} spacing={4}>
                {editedImages.map((image: ImageData) => (
                  <Box key={image.id} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm" position="relative">
                    <Image src={image.image} alt={`Blood test image ${image.id}`} boxSize="100%" objectFit="cover" />
                    {editMode && (
                      <IconButton
                        aria-label="Delete image"
                        icon={<FaTrashAlt />}
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        position="absolute"
                        top="5px"
                        right="5px"
                        onClick={() => handleDeleteImage(image.id)}
                      />
                    )}
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Text>No images uploaded</Text>
            )}
            {editMode && (
              <Flex mt={4} justifyContent="flex-end">
                <Button colorScheme="gray" mr={2} onClick={handleCancelClick}>
                  Cancel
                </Button>
                <Button colorScheme="teal" onClick={handleUpdate} isLoading={editLoading}>
                  Update
                </Button>
              </Flex>
            )}
          </Box>

          <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" mb={4}>
            <Heading as="h3" size="md" mb={4}>
              Results
            </Heading>
            <Divider mb={4} />
            {bloodTest.results.length > 0 ? (
              <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
                {bloodTest.results.map((result: Result) => (
                <Box
                  key={result.id}
                  mb={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  boxShadow="sm"
                  cursor="pointer"
                  onClick={() => handleResultClick(result)}
                >
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
              Upload Images
            </Heading>
            <Divider mb={4} />
            <Box {...getRootProps()} p={4} border="2px dashed" borderRadius="md" cursor="pointer">
              <input {...getInputProps()} />
              <Text textAlign="center">Drag and drop images here, or click to select files</Text>
            </Box>
            {files.length > 0 && (
              <Box mt={4}>
                <Text fontWeight="bold" mb={2}>Files ready for upload:</Text>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
                  {files.map((file, index) => (
                    <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="sm" p={2}>
                      <Image src={URL.createObjectURL(file)} alt={file.name} boxSize="100%" objectFit="cover" />
                      <Text mt={2}>{file.name}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
                <Flex mt={4} justifyContent="flex-end">
                  <Button colorScheme="red" mr={2} onClick={handleClear}>
                    Clear
                  </Button>
                  <Button colorScheme="teal" onClick={handleUpload} isLoading={loading}>
                    Upload
                  </Button>
                </Flex>
              </Box>
            )}
          </Box>
        </Box>
      </Flex>

      <EditBloodTestModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient_id={patientId}
        blood_test={bloodTest}
      />
    </Box>
  );
};

export default BloodTestDetailPage;
