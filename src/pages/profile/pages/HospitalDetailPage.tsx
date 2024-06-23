import React, { useState } from 'react';
import { Box, Alert, AlertIcon, SimpleGrid, VStack, Divider } from '@chakra-ui/react';
import useHospital, { Hospital } from '../../registration/hooks/useHospital';
import HospitalCard from '../components/HospitalCard';
import EditHospitalModal from '../components/EditHospitalModel';
import ExtraActivityBar from '../components/ExtraActivityBar'; // Import the new search bar component

const HospitalDetailPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error } = useHospital(searchQuery);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const handleEdit = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedHospital(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box p={4} >

      <VStack  align="flex-start" spacing={8} width="100%">


      <ExtraActivityBar handleSearch={handleSearch} searchQuery={searchQuery} />

      <Divider orientation='horizontal' />
 
      
      
{error && (
  <Alert status="error">
    <AlertIcon />
    {error}
  </Alert>
)}
{!error && (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
    {data.map((hospital) => (
      <HospitalCard key={hospital.id} hospital={hospital} onEdit={handleEdit} />
    ))}
  </SimpleGrid>
)}

<EditHospitalModal isOpen={isModalOpen} onClose={handleClose} hospital={selectedHospital} />


      </VStack>
      
      
    </Box>
  );
};

export default HospitalDetailPage;
