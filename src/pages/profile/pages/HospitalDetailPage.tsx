import React, { useState } from 'react';
import { Box, Spinner, Alert, AlertIcon, SimpleGrid } from '@chakra-ui/react';
import useHospital, { Hospital } from '../../registration/hooks/useHospital';
import HospitalCard from '../components/HospitalCard';
import EditHospitalModal from '../components/EditHospitalModel';

const HospitalDetailPage: React.FC = () => {
  const { data, error, isLoading } = useHospital('');
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

  return (
    <Box p={4}>
      {isLoading && <Spinner />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {!isLoading && !error && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {data.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} onEdit={handleEdit} />
          ))}
        </SimpleGrid>
      )}

      <EditHospitalModal isOpen={isModalOpen} onClose={handleClose} hospital={selectedHospital} />
    </Box>
  );
};

export default HospitalDetailPage;
