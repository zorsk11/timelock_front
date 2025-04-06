import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Sidebar from "@/widgets/Sidebar";

const MainLayout: React.FC = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname.startsWith("/auth");

  return (
    <Box >
      { !isAuthPage && <Sidebar /> }
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;