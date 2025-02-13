import React from "react";
import { Box } from "@chakra-ui/react";
import LoginForm from "@/features/UserRegistration/ui/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minH="100vh"
    bgColor="fillSecondary"
  >
  
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        w={{ base: "100%", "2xl": "700px" }}
        minW={{ base: "100%", sm: "700px" }}
        p="0px"
      >
        <Box
          p={{ base: "24px", sm: "40px" }}
          w={{ base: "100%", sm: "600px" }}
          bg="white"
          borderRadius="24px"
        >
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
