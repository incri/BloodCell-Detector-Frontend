import React, { useState } from 'react';
import { Box, Spinner, Alert, AlertIcon, SimpleGrid } from '@chakra-ui/react';
import PatientCard from '../components/PatientCard';
import ExtraActivityBar from '../components/ExtraActivityBar';
import usePatients, { PatientData } from '../hooks/usePatients';

const PatientsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { data, error, isLoading } = usePatients(searchQuery, sortField, sortOrder);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);

  const handleEdit = (patient: PatientData) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPatient(null);
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

  return (
    <Box p={4}>
      <ExtraActivityBar
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onNewClick={handleOpenCreateModal}
        sortableFields={['first_name', 'last_name']}
      />

      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {data?.map((patient) => (
            <PatientCard key={patient.id} patient={patient} onEdit={handleEdit} />
          ))}
        </SimpleGrid>
      )}

      {/* <EditPatientModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} patient={selectedPatient} />
      <CreatePatientModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} /> */}
    </Box>
  );
};

export default PatientsPage;
