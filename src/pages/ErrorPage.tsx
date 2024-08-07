import { Box, Heading, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <>
      <Box padding={5}>
        <Heading>Oops</Heading>
        <Text>
         
            "This page does not exist."
       
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;
