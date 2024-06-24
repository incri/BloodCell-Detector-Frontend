import React, { useState } from 'react';
import { Box, Alert, AlertIcon, SimpleGrid } from '@chakra-ui/react';
import useHospital, { Hospital } from '../../registration/hooks/useHospital';
import HospitalCard from '../components/HospitalCard';
import EditHospitalModal from '../components/EditHospitalModel';
import ExtraActivityBar from '../components/ExtraActivityBar'; // Import the new search bar component

const HospitalDetailPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data, error } = useHospital(searchQuery, sortField, sortOrder); // Pass sorting params to the hook
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

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <Box p={4}>
      {/* Replace the existing search bar with the new one */}
      <ExtraActivityBar
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />
      
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
    </Box>
  );
};

export default HospitalDetailPage;
