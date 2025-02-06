import React from "react";
import { Box } from "@chakra-ui/react";

const LoginPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      bgColor="fillSecondary"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        w={{ base: "100%", "2xl": "770px" }}
        minW={{ base: "100%", sm: "770px" }}
        p="0px"
      >
        <Box
          p={{ base: "36px", sm: "56px" }}
          w={{ base: "100%", sm: "660px" }}
          bg="white"
          borderRadius="24px"
        >
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
