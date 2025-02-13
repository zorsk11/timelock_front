import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import { LayoutProvider } from "@shared/context/LayoutContext";
import theme from "@/app/styles/theme";
import { store, persistor } from "@/app/store"; // убедись, что путь корректный

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <LayoutProvider>{children}</LayoutProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export { AppProviders };
