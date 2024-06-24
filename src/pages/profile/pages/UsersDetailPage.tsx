import React, { useState } from 'react';
import { Box, Spinner, Alert, AlertIcon, SimpleGrid } from '@chakra-ui/react';
import useUsersDetail, { User } from '../hooks/useUsersDetails';
import ExtraActivityBar from '../components/ExtraActivityBar';
import UsersDetailCard from '../components/UsersDetailCard';

const UsersDetailPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { data, error, isLoading } = useUsersDetail(searchQuery, sortField, sortOrder);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
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
        sortableFields={['username']}
      />

      {error && (
        <Alert status="error">
          <AlertIcon />
          "Error has Occurred"
        </Alert>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {data && data.length > 0 ? (
            data.map((user) => (
              <UsersDetailCard key={user.id} user={user} onEdit={handleEdit} />
            ))
          ) : (
            <Alert status="info">
              <AlertIcon />
              No users found.
            </Alert>
          )}
        </SimpleGrid>
      )}

      {/* <EditUserModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} user={selectedUser} />
      <CreateUserModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} /> */}
    </Box>
  );
};

export default UsersDetailPage;
