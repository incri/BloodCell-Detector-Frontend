import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, Text, Image, SimpleGrid, Button, VStack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';
import { BloodTest, DetectionData, PatientData, Result } from '../hooks/usePatients';
import useBloodTestResult from '../hooks/useBloodTestResult';

const BloodTestResultDetailPage: React.FC = () => {
  const location = useLocation();
  const { result, patient, blood_test } = location.state as { result: Result, patient: PatientData, blood_test: BloodTest };

  if (!result) {
    return <Text>No result data available</Text>;
  }

  const { data: reportData, isLoading, refetch } = useBloodTestResult(patient.id, blood_test.id, result.id);

  const handleDownloadReport = async () => {
    try {
      await refetch();
      console.log(reportData);

      if (reportData) {
        const blob = new Blob([reportData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `blood-test-report-${result.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  // Filter detections with non-zero values
  const filteredDetections: DetectionData[] = result.detections.filter(
    (detection: DetectionData) => detection.detection_value !== 0
  );


  return (
    <VStack>
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

        {/* Dynamic Table for Detections */}
        {filteredDetections.length > 0 && (
          <Box mt={6} w="100%" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
          <Heading as="h3" size="md" mb={4} p={2} borderBottom="1px" borderColor="gray.200">
            Detections
          </Heading>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th fontWeight="bold" py={3}>
                  Cell Type
                </Th>
                <Th fontWeight="bold" py={3}>
                  Count
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredDetections.map((detection: DetectionData) => (
                <Tr key={detection.id} >
                  <Td py={3}>{detection.detection_type.replace(/_/g, ' ')}</Td>
                  <Td py={3}>{detection.detection_value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        
        )}
      </Box>

      <Button
        leftIcon={<FaDownload />}
        colorScheme="blue"
        variant="ghost"
        size="sm"
        onClick={handleDownloadReport}
        isLoading={isLoading}
      >
        Download Report
      </Button>
    </VStack>
  );
};

export default BloodTestResultDetailPage;
