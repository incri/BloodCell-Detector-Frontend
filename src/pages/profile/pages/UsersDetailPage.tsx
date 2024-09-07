import React, { useState } from 'react';
import { Box, Spinner, Alert, AlertIcon, SimpleGrid, Button, HStack } from '@chakra-ui/react';
import useUsersDetail, { User } from '../hooks/useUsersDetails';
import ExtraActivityBar from '../components/ExtraActivityBar';
import UsersDetailCard from '../components/UsersDetailCard';

const UsersDetailPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useUsersDetail(searchQuery, sortField, sortOrder, page);

  const handleEdit = (user: User) => {
    // Handle edit user logic
  };

  const handleNextPage = () => {
    if (data?.next) setPage((prevPage) => prevPage + 1); // Increment page only if there is a next page
  };

  const handlePreviousPage = () => {
    if (data?.previous) setPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrement page only if there is a previous page
  };

  const handleOpenCreateModal = () => {
    // Handle open create modal logic
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to the first page on new search
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1); // Reset to the first page on new sort
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
        sortableFields={['username']}
      />

      {error && (
        <Alert status="error">
          <AlertIcon />
          Error has Occurred
        </Alert>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {data && data.results.length > 0 ? (
              data.results.map((user) => (
                <UsersDetailCard key={user.id} user={user} onEdit={handleEdit} />
              ))
            ) : (
              <Alert status="info">
                <AlertIcon />
                No users found.
              </Alert>
            )}
          </SimpleGrid>

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

      {/* <EditUserModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} user={selectedUser} />
      <CreateUserModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} /> */}
    </Box>
  );
};

export default UsersDetailPage;
