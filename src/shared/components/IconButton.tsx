// src/shared/components/IconButton.tsx
import { IconButton as ChakraIconButton, IconButtonProps } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const IconButton = ({ onClick }: IconButtonProps) => {
  return (
    <ChakraIconButton
      aria-label="Add"
      icon={<AddIcon color="#4781E9" />}
      onClick={onClick}
      variant="ghost"
      size="lg"
    />
  );
};

export default IconButton;
