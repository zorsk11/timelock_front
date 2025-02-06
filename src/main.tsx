// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "@widgets/Navbar";
import Sidebar from "@widgets/Sidebar";
import { AppRouter } from "@/app/routes/AppRouter";
import theme from "./app/styles/theme";
import { LayoutProvider } from "@shared/context/LayoutContext"; 

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <LayoutProvider> {/* Оборачиваем приложение в LayoutProvider */}
          <Box display="flex" flexDirection="column" h="100vh">
            <Box display="flex" flex="1">
              <Sidebar /> {/* Sidebar */}
              <Box as="main" flex="1" p={4} ml="250px" mt="80px">
                <AppRouter /> {/* Основной контент */}
              </Box>
            </Box>
          </Box>
        </LayoutProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
