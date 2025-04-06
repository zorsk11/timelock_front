import React, { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextProps {
  title: string;
  setTitle: (title: string) => void;
  buttons?: React.ReactNode;
  setButtons: (buttons: React.ReactNode) => void;
  isNavbarVisible: boolean;
  toggleNavbarVisibility: () => void; 
  isDrawerOpen: boolean; 
  toggleDrawer: () => void; 
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>("Default Title");
  const [buttons, setButtons] = useState<React.ReactNode>(null);

  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleNavbarVisibility = () => {
    setNavbarVisible(prevState => !prevState);
  };

  const toggleDrawer = () => {
    setDrawerOpen(prevState => !prevState);
  };

  return (
    <LayoutContext.Provider
      value={{
        title,
        setTitle,
        buttons,
        setButtons,
        isNavbarVisible,
        toggleNavbarVisibility,
        isDrawerOpen,
        toggleDrawer,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

// Хук для доступа к значениям из первого кода (title и buttons)
export const useLayout = (): Omit<LayoutContextProps, "isNavbarVisible" | "toggleNavbarVisibility" | "isDrawerOpen" | "toggleDrawer"> => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  const { title, setTitle, buttons, setButtons } = context;
  return { title, setTitle, buttons, setButtons };
};

// Хук для доступа к значениям из второго кода (navbar и drawer)
export const useLayoutContext = (): Pick<LayoutContextProps, "isNavbarVisible" | "toggleNavbarVisibility" | "isDrawerOpen" | "toggleDrawer"> => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  const { isNavbarVisible, toggleNavbarVisibility, isDrawerOpen, toggleDrawer } = context;
  return { isNavbarVisible, toggleNavbarVisibility, isDrawerOpen, toggleDrawer };
};
