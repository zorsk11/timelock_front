// src/app/providers/AppProviders.tsx
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/store'; // adjust this import path if needed

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export { AppProviders };
