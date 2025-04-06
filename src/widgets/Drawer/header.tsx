import React from "react";
import { Box } from "@chakra-ui/react";

export interface HeaderItem {
  to: string;
  label: string;
}

export const HeaderButton: React.FC<HeaderItem> = ({ to, label }) => (
  <Box
    as="a"
    href={to}
    borderRadius="12px"
    bg="#F5F5F5"
    margin="12px 16px 24px 16px"
    fontSize="lg"
    fontWeight="bold"
    padding="4px 1px 4px 10px"
    gap={8}
    border="none"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    _hover={{ bg: "#E0E0E0" }}
  >
    {label}
  </Box>
);

export const Header: React.FC<{ label: string }> = ({ label }) => (
  <Box
    as="h3"
    fontSize="20px"
    fontWeight="bold"
    color="#333"
    padding="12px 16px"
    borderBottom="1px solid #E0E0E0"
  >
    {label}
  </Box>
);
