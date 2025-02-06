// src/shared/components/Button.tsx
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button = ({ children, ...props }: ButtonProps) => {
  return <ChakraButton {...props}>{children}</ChakraButton>;
};

export default Button;
