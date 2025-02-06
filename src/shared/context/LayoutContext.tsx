import React, { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextProps {
  // Из первого кода
  title: string;
  setTitle: (title: string) => void;
  buttons?: React.ReactNode;
  setButtons: (buttons: React.ReactNode) => void;
  // Из второго кода
  isNavbarVisible: boolean; // Состояние видимости Navbar
  toggleNavbarVisibility: () => void; // Функция для переключения видимости Navbar
  isDrawerOpen: boolean; // Состояние видимости Drawer
  toggleDrawer: () => void; // Функция для переключения видимости Drawer
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Состояния из первого кода
  const [title, setTitle] = useState<string>("Default Title");
  const [buttons, setButtons] = useState<React.ReactNode>(null);

  // Состояния из второго кода
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
