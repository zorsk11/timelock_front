import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { useLayoutContext } from '@/shared/context/LayoutContext';
import Button from '@/shared/components/Button';
import DiscountDrawer from '@/widgets/Drawer/index';
import { colors } from "@/widgets/Navbar/Navbar.styles";

interface NavBarProps {
  title: string;
  buttonLabel: React.ReactNode; // изменено с string на React.ReactNode
  buttonIcon?: React.ElementType;
  onButtonClick?: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ title, buttonLabel, buttonIcon, onButtonClick }) => {
  const { isNavbarVisible, toggleDrawer } = useLayoutContext();

  if (!isNavbarVisible) return null;

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={colors.bg}
        border="none"
        marginLeft="248px"
        padding="15px 10px 10px 10px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        zIndex={1000}
      >
        <Box as="h3" fontSize="20px" fontWeight="bold" color="#333">
          {title}
        </Box>
        <Button
          onClick={onButtonClick || toggleDrawer}
          borderRadius="4px"
          bg="#EDF2FD"
          color="Label/Primary"
          margin="6px 24px 6px 0px"
          px={4}
          h="40px"
          border="none"
          display="flex"
          alignItems="center"
          gap="8px"
          fontWeight="normal"
        >
          {buttonLabel}
          {buttonIcon && <Icon as={buttonIcon} color="#4781E9" boxSize={5} />}
        </Button>
      </Box>
      <DiscountDrawer headerTitle={title} />
    </>
  );
};

export default Navbar;
