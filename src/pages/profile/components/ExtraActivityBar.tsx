import React from 'react';
import {
  Box,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  VStack,
  HStack,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
  Icon
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { MdAddchart } from "react-icons/md";

const ExtraActivityBar = () => {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  return (
    <Box p={4} borderRadius="md">
      {isLargeScreen ? (
        <Flex align="center" justify="space-between">
          {/* Search Bar */}
          <InputGroup maxW="400px" flex="1">
            <Input placeholder="Search..." />
            <InputRightElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
          </InputGroup>

          {/* Dropdown for Sorting */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={4}>
              Sort
            </MenuButton>
            <MenuList>
              <MenuItem>Sort by Name</MenuItem>
              <MenuItem>Sort by Date</MenuItem>
            </MenuList>
          </Menu>

          {/* Dropdown for Filtering */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={4}>
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem>Filter by Category</MenuItem>
              <MenuItem>Filter by Status</MenuItem>
            </MenuList>
          </Menu>

          {/* Button for Creating New Data */}
          <Button colorScheme="teal" ml={4} leftIcon={<Icon as={MdAddchart} />}>
            New
          </Button>
        </Flex>
      ) : (
        <VStack align="stretch" spacing={4}>
          {/* Button for Creating New Data */}
          <Button colorScheme="teal" width="100%" leftIcon={<Icon as={MdAddchart} />}>
            New
          </Button>

          {/* Search Bar */}
          <InputGroup>
            <Input placeholder="Search..." />
            <InputRightElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
          </InputGroup>

          {/* HStack for Sorting and Filtering */}
          <HStack spacing={4} width="100%">
            {/* Dropdown for Sorting */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} flex="1">
                Sort
              </MenuButton>
              <MenuList>
                <MenuItem>Sort by Name</MenuItem>
                <MenuItem>Sort by Date</MenuItem>
              </MenuList>
            </Menu>

            {/* Dropdown for Filtering */}
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
