import React, { useState } from 'react';
import { Box, Spinner, Alert, AlertIcon, SimpleGrid, Button, HStack } from '@chakra-ui/react';
import useHospital, { Hospital } from '../../registration/hooks/useHospital';
import HospitalCard from '../components/HospitalCard';
import ExtraActivityBar from '../components/ExtraActivityBar';
import CreateHospitalModal from '../components/CreateHospitalModal';
import EditHospitalModal from '../components/EditHospitalModel';

const HospitalDetailPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1); // Add page state
  const { data, error, isLoading } = useHospital(searchQuery, sortField, sortOrder, page);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const handleEdit = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedHospital(null);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
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

  // Handle pagination
  const handleNextPage = () => {
    if (data?.next) setPage((prevPage) => prevPage + 1); // Increment page only if there is a next page
  };

  const handlePreviousPage = () => {
    if (data?.previous) setPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrement page only if there is a previous page
  };

  return (
    <Box p={4}>
      <ExtraActivityBar
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onNewClick={handleOpenCreateModal}
        sortableFields={['name']}
      />

      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {data?.results.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} onEdit={handleEdit} />
            ))}
          </SimpleGrid>

          {/* Pagination Controls */}
          <HStack justifyContent="center" mt={4}>
            <Button onClick={handlePreviousPage} isDisabled={!data?.previous}>
              Previous
            </Button>
            <Button onClick={handleNextPage} isDisabled={!data?.next}>
              Next
            </Button>
          </HStack>
        </>
      )}

      <EditHospitalModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} hospital={selectedHospital} />
      <CreateHospitalModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
    </Box>
  );
};

export default HospitalDetailPage;
