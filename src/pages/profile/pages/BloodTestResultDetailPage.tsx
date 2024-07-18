import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, Text, Image, SimpleGrid, Button, VStack } from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';
import { BloodTest, PatientData, Result } from '../hooks/usePatients';
import useBloodTestResult from '../hooks/useBloodTestResult';

const BloodTestResultDetailPage: React.FC = () => {
  const location = useLocation();
  const { result, patient, blood_test } = location.state as {result: Result, patient: PatientData, blood_test: BloodTest};

  if (!result) {
    return <Text>No result data available</Text>;
  }

  const { data: reportData, isLoading, refetch } = useBloodTestResult(patient.id, blood_test.id, result.id );

  const handleDownloadReport = async () => {
    try {
      // Refetch to ensure the latest data
      await refetch();

      console.log(reportData)

      // Assuming useBloodTestResult returns the data correctly for report download
      if (reportData) {
        // Create a blob URL for the PDF blob data received
        const blob = new Blob([reportData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Trigger download using an anchor tag
        const a = document.createElement('a');
        a.href = url;
        a.download = `blood-test-report-${result.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Release the object URL
        window.URL.revokeObjectURL(url);
      }

    } catch (error) {
      console.error('Error downloading report:', error);
      // Handle error state or show a notification to the user
    }
  };

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
      </Box>

      <Button
        leftIcon={<FaDownload />}
        colorScheme="blue"
        variant="ghost"
        size="sm"
        onClick={handleDownloadReport}
        isLoading={isLoading} // Show loading state while downloading
      >
        Download Report
      </Button>
    </VStack>
  );
};

export default BloodTestResultDetailPage;
