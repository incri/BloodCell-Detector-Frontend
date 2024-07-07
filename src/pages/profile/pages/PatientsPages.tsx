import React, { useState } from 'react';
import { Box, Spinner, Alert, AlertIcon, VStack } from '@chakra-ui/react';
import PatientCard from '../components/PatientCard';
import ExtraActivityBar from '../components/ExtraActivityBar';
import usePatients, { PatientData } from '../hooks/usePatients';
import { useNavigate } from 'react-router-dom';

const PatientsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { data, error, isLoading } = usePatients(searchQuery, sortField, sortOrder);
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
          {error}
        </Alert>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <VStack spacing={4} width="100%">
          {data?.map((patient) => (
            <PatientCard key={patient.id} patient={patient} onEdit={handleEdit} />
          ))}
        </VStack>
      )}

      {/* <EditPatientModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} patient={selectedPatient} /> */}
    </Box>
  );
};

export default PatientsPage;
