import React from "react";
import { FC } from "react";
import { Box, Input, Button, VStack, Container, Flex } from "@chakra-ui/react";
import Navbar from "@/widgets/Navbar";
import DiscountDrawer from "@/widgets/Drawer";
import Sidebar from "@/widgets/Sidebar";
import RoomsCard from "@/features/RoomsForm/ui/RoomsCard";

const RoomsPage: FC = () => {
  return (
    <Flex>
      <Sidebar />

      <Box flex="1" ml="248px">
        <Navbar title="Кабинеты" buttonLabel="Добавить" />
        <Box flex="1" mt="64px">
          <Container maxW="container.xl" py="6">
            <RoomsCard />
          </Container>
        </Box>
      </Box>

      <DiscountDrawer headerTitle="Добавить кабинет">
      </DiscountDrawer>
    </Flex>
  );
};

  
export default RoomsPage;
