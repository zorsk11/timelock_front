// AuthLayout.tsx
import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
