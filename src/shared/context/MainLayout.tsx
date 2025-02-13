// Пример в основном компоненте (MainLayout.tsx)
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Sidebar from "@/widgets/Sidebar";

const MainLayout: React.FC = () => {
  const location = useLocation();

  // Предположим, что для пути '/login' или '/auth' сайдбар не нужен:
  const isAuthPage = location.pathname === "/login" || location.pathname.startsWith("/auth");

  return (
    <Box display="flex">
      { !isAuthPage && <Sidebar /> }
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
