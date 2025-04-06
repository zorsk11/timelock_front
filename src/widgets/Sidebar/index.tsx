import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, List, ListItem, Link as ChakraLink, Icon } from "@chakra-ui/react";
import { menuItems } from "@/entities/Sidebar/model";
import { HeaderItems } from "./module"; 
import { colors, linkStyles } from "./Sidebar.styles";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation();

  return (
    <Box
      zIndex={900}
      w="248px"
      h="100vh"
      bg={colors.bg}
      p="24px 24px 0px 24px"
      display="flex"
      flexDirection="column"
      position="fixed"
      border="1px solid"
      borderColor={colors.borderColor}
      left={0}
      top={0}
      gap={6}
      fontFamily="'Arial', sans-serif"
      opacity={1}
    >
      <HeaderItems />

      <List spacing={4} px={4}>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ChakraLink
              as={NavLink}
              to={item.to}
              {...linkStyles}
              _activeLink={{
                color: colors.activeLinkColor,
                bg: colors.hoverBg,
              }}
              _hover={{
                textDecoration: "none",
                bg: colors.hoverBg,
              }}
            >
              <Icon
                as={item.icon}
                color={
                  location.pathname === item.to
                    ? colors.activeIconColor
                    : colors.iconColor
                }
                mr={2}
              />
              {item.label}
            </ChakraLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
