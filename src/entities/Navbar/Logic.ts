// src/entities/Navbar/logic.ts
import { useState } from "react";

export const useNavbarLogic = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  };
};
