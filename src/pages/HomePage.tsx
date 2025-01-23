import { Box, Container, Heading, Text, SimpleGrid, Image, Card, CardBody, Button, Stack } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Container maxW="7xl" py={10}>
      {/* Header Section */}
      <Box textAlign="center" mb={12}>
        <Heading as="h1" size="3xl" color="teal.600">
          Blood Cell Detection System
        </Heading>
        <Text fontSize="lg" color="gray.600">
          A Advance machine learning system for detecting blood cells and Leukocytes count using YOLO, with real-time results.
        </Text>
      </Box>

      {/* Blood Cell Count Section */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Blood Cell Count Detection
            </Heading>
            <Stack spacing={6}>
              <Box>
                <Heading size="sm" mb={2}>Confusion Matrix</Heading>
                <Image 
                  src="src\assets\confusion_matrix.png" 
                  alt="Blood Cell Confusion Matrix" 
                  borderRadius="md" 
                  boxSize="100%" 
                />
              </Box>
              
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Detected Blood Cells
            </Heading>
            <SimpleGrid columns={2} spacing={4}>
              <Image 
                src="src\assets\train_batch0.jpg" 
                alt="Detected Blood Cell 1" 
                borderRadius="md" 
                boxSize="100%" 
              />
              <Image 
                src="src\assets\train_batch1.jpg" 
                alt="Detected Blood Cell 2" 
                borderRadius="md" 
                boxSize="100%" 
              />
            </SimpleGrid>
            <Box>
                <Heading size="sm" mb={2}>Accuracy Over Time</Heading>
                <Image 
                  src="src\assets\results.png" 
                  alt="Blood Cell Accuracy Graph" 
                  borderRadius="md" 
                  boxSize="100%" 
                />
              </Box>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Leukocytes Count Section */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} mt={12}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Leukocytes Count Detection
            </Heading>
            <Stack spacing={6}>
              <Box>
                <Heading size="sm" mb={2}>Confusion Matrix</Heading>
                <Image 
                  src="src\assets\2_confusion_matrix.png" 
                  alt="Leukocytes Confusion Matrix" 
                  borderRadius="md" 
                  boxSize="100%" 
                />
              </Box>
              
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Detected Leukocytes
            </Heading>
            <SimpleGrid columns={2} spacing={4}>
              <Image 
                src="src\assets\2_train_batch0.jpg" 
                alt="Detected Leukocyte 1" 
                borderRadius="md" 
                boxSize="100%" 
              />
              <Image 
                src="src\assets\2_train_batch1.jpg" 
                alt="Detected Leukocyte 2" 
                borderRadius="md" 
                boxSize="100%" 
              />
            </SimpleGrid>
            <Box>
                <Heading size="sm" mb={2}>Leukocytes Count Graph</Heading>
                <Image 
                  src="src\assets\2_results.png" 
                  alt="Leukocytes Count Graph" 
                  borderRadius="md" 
                  boxSize="100%" 
                />
              </Box>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
