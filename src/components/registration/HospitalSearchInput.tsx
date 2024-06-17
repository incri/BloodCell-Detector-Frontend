import { Input, List, ListItem, Box } from "@chakra-ui/react";
import useHospital from "../../hooks/help/useHospital";
import { useState } from "react";

interface HospitalSearchInputProps {
  onHospitalSelect: (hospitalId: string) => void;
}

const HospitalSearchInput: React.FC<HospitalSearchInputProps> = ({ onHospitalSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { data } = useHospital(searchTerm);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDropdownVisible(e.target.value.length > 0);
  };

  const handleHospitalSelect = (hospitalId: string, hospitalName: string) => {
    onHospitalSelect(hospitalId);
    setSearchTerm(hospitalName);
    setDropdownVisible(false);
  };

  return (
    <>
      <Input
        placeholder="Search for a hospital"
        value={searchTerm}
        onChange={handleSearch}
      />

      <Box height={2}></Box>
      {isDropdownVisible && data && (
        <List border="1px solid" borderColor="gray.200" borderRadius="md" maxH="200px" overflowY="auto">
          {data?.results.map((hospital) => (
            <ListItem
              key={hospital.id}
              p={2}
              _hover={{ backgroundColor: 'green', cursor: 'pointer' }}
              onClick={() => handleHospitalSelect(hospital.id, hospital.name)}
            >
              {hospital.name}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default HospitalSearchInput;
