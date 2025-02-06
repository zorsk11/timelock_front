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
}

const DiscountDrawer: React.FC<DiscountDrawerProps> = ({ headerTitle }) => {
  const { isDrawerOpen, toggleDrawer } = useLayoutContext();

  return (
    <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{headerTitle}</DrawerHeader>
        <DrawerBody>
          {/* Content goes here */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DiscountDrawer;
