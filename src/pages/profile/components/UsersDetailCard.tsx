import React from 'react';
import { Box, Text, Flex, Button, Badge } from '@chakra-ui/react';
import { FaHospital } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { User } from '../hooks/useUsersDetails';

interface UsersDetailCardProps {
  user: User;
  onEdit: (user: User) => void;
}

const UsersDetailCard: React.FC<UsersDetailCardProps> = ({ user, onEdit }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      position="relative"
    >
      <Button
        position="absolute"
        top="2"
        right="2"
        variant="ghost"
        size="sm"
        colorScheme="teal"
        leftIcon={<AiOutlineEdit />}
        onClick={() => onEdit(user)}
      >
        Edit
      </Button>
      <Box p="6">
        <Flex align="center">
          <Box as={FaHospital} fontSize="2xl" color="teal.500" mr="2" />
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            flex="1"
          >
            {user.hospital ? user.hospital.name : 'No Hospital'}
          </Box>
          {user.is_hospital_admin && (
            <Badge ml="1" colorScheme="green" borderRadius="full" px="2" py="1">
              A
            </Badge>
          )}
        </Flex>

        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
          {user.username}
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {user.first_name} {user.last_name}
        </Box>

        <Flex align="center" mt={2}>
          <Text fontSize="sm" color="gray.600">
            {user.email}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default UsersDetailCard;
