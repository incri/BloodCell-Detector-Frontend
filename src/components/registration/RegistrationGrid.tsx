
import { Box, Flex } from '@chakra-ui/react';
import RegistrationForm from './RegistrationForm';
import RegistrationImage from './RegistrationImage';


const RegistrationGrid = () => {
  return (
    <Flex minHeight="100vh">
      {/* Left side with the image placeholder */}
      <Box flex="1" display={{ base: 'none', md: 'block' }}>
        <RegistrationImage />
      </Box>

      {/* Right side with the content placeholder */}
      <Flex flex="1" align="center" justify="center">
        <RegistrationForm />
      </Flex>
    </Flex>
  )
}

export default RegistrationGrid




