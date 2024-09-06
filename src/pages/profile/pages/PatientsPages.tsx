import React, { useState } from 'react';
import { Box, Spinner, Alert, AlertIcon, VStack, HStack, Button } from '@chakra-ui/react';
import PatientCard from '../components/PatientCard';
import ExtraActivityBar from '../components/ExtraActivityBar';
import usePatients, { PatientData } from '../hooks/usePatients';
import { useNavigate } from 'react-router-dom';
import EditPatientModal from '../components/EditPatientModel';

const PatientsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePatients(searchQuery, sortField, sortOrder,page);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const navigate = useNavigate();


  const handleEdit = (patient: PatientData) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPatient(null);
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

  const handleNewPatient = () => {
    navigate('/patient-register');
  };

  const handleNextPage = () => {
    if (data?.next) setPage((prevPage) => prevPage + 1); // Increment page only if there is a next page
  };

  const handlePreviousPage = () => {
    if (data?.previous) setPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrement page only if there is a previous page
  };



  return (
    <Box p={4} width="70%">
      <ExtraActivityBar
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onNewClick={handleNewPatient}
        sortableFields={['first_name', 'last_name']}
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
        <VStack spacing={4} width="100%">
          {data?.results.map((patient) => (
            <PatientCard key={patient.id} patient={patient} onEdit={handleEdit} />
          ))}
        </VStack>
      )}

          <HStack justifyContent="center" mt={4}>
            <Button onClick={handlePreviousPage} isDisabled={!data?.previous}>
              Previous
            </Button>
            <Button onClick={handleNextPage} isDisabled={!data?.next}>
              Next
            </Button>
          </HStack>

      

      <EditPatientModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} patient={selectedPatient} />
    </Box>
  );
};

export default PatientsPage;
