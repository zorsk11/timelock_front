import React from "react";
import { useNavigate } from "react-router";
import { Box, Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { colors } from "./Sidebar.styles";

export interface HeaderItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

export const headerItems: HeaderItem[] = [
  {
    to: "/profile",
    icon: ChevronRightIcon,
    label: "Азамат Тайжанов",
  },
];

export const HeaderButton: React.FC<HeaderItem> = ({ to, icon, label }) => (
  <Box
    as="a"
    href={to}
    borderRadius="12px"
    bg="#F5F5F5"
    margin="1px 16px 1px 16px"
    borderColor={colors.borderColor}
    fontSize="sm"
    fontWeight="bold"
    padding="10px 4px 10px 8px"
    border="none"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    _hover={{ bg: "#E0E0E0" }}
  >
    {label}
    <Icon as={icon} color="#AEAEB2" boxSize="24px" />
  </Box>
);

