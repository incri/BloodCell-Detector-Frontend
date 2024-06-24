import React from 'react';
import { Box, Input, Button, Menu, MenuButton, MenuList, MenuItem, Flex, VStack, HStack, InputGroup, InputRightElement, useBreakpointValue, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { MdAddchart } from "react-icons/md";

interface ExtraActivityBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  handleSort: (field: string) => void;
  sortField: string | null;
  sortOrder: 'asc' | 'desc';
  onNewClick: () => void;
}

const ExtraActivityBar: React.FC<ExtraActivityBarProps> = ({ handleSearch, searchQuery, handleSort, sortField, sortOrder, onNewClick }) => {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  return (
    <Box p={4} borderRadius="md">
      {isLargeScreen ? (
        <Flex align="center" justify="space-between">
          <InputGroup maxW="60%" flex="3">
            <Input placeholder="Search..." onChange={handleSearch} value={searchQuery} />
            <InputRightElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
          </InputGroup>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={2} flex="1">
              Sort
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleSort('name')}>
                Sort by Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </MenuItem>
              <MenuItem onClick={() => handleSort('date')}>
                Sort by Date {sortField === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={2} flex="1">
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem>Filter by Category</MenuItem>
              <MenuItem>Filter by Status</MenuItem>
            </MenuList>
          </Menu>

          <Button colorScheme="teal" ml={2} flex="1" leftIcon={<Icon as={MdAddchart} />} onClick={onNewClick}>
            New
          </Button>
        </Flex>
      ) : (
        <VStack align="stretch" spacing={4}>
          <Button colorScheme="teal" width="100%" leftIcon={<Icon as={MdAddchart} />} onClick={onNewClick}>
            New
          </Button>

          <InputGroup maxW="100%">
            <Input placeholder="Search..." onChange={handleSearch} value={searchQuery} />
            <InputRightElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
          </InputGroup>

          <HStack spacing={2} width="100%">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} flex="1">
                Sort
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleSort('name')}>
                  Sort by Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </MenuItem>
                <MenuItem onClick={() => handleSort('date')}>
                  Sort by Date {sortField === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} flex="1">
                Filter
              </MenuButton>
              <MenuList>
                <MenuItem>Filter by Category</MenuItem>
                <MenuItem>Filter by Status</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default ExtraActivityBar;
