import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { colors } from "./Sidebar.styles";

export interface HeaderItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

export const HeaderButton: React.FC<HeaderItem> = ({ to, icon, label }) => (
  <Box
    as="a"
    href={to}
    borderRadius="12px"
    bg="#F5F5F5"
    margin="1px 16px"
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
    <Icon as={ChevronRightIcon} color="#AEAEB2" boxSize="24px" />
  </Box>
);

export const HeaderItems: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const userName =
    user?.FirstName && user?.SecondName
      ? `${user.FirstName} ${user.SecondName}`
      : "Профиль";

  const dynamicHeaderItems: HeaderItem[] = [
    {
      to: "/profile",
      icon: ChevronRightIcon,
      label: userName,
    },
  ];

  return (
    <>
      {dynamicHeaderItems.map((item, index) => (
        <HeaderButton key={index} {...item} />
      ))}
    </>
  );
};
