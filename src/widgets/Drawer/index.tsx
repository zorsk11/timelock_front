import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useLayoutContext } from '@/shared/context/LayoutContext';

interface DiscountDrawerProps {
  headerTitle: string;
  children?: React.ReactNode;
}

const DiscountDrawer: React.FC<DiscountDrawerProps> = ({ headerTitle, children }) => {
  const { isDrawerOpen, toggleDrawer } = useLayoutContext();

  return (
    <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{headerTitle}</DrawerHeader>
        <DrawerBody>
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DiscountDrawer;
