import Navbar from "@/widgets/Navbar";
import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import UsersCard from "@/features/StaffProfile/ui/StaffCard";
import Sidebar from "@/widgets/Sidebar"; // Подключаем Sidebar
import DiscountDrawer from "@/widgets/Drawer";
import CreateStaffForm from "@/features/StaffProfile/ui/CreateStaff";

const UsersPage: React.FC = () => {
  return (
    <Flex>
      <Sidebar />

      {/* Контент смещается вправо */}
      <Box flex="1" ml="248px">
        <Navbar title="Преподаватели" buttonLabel="Добавить" />
        <Box flex="1" mt="64px">
          <Container maxW="container.xl" py="6">
            <UsersCard />
          </Container>
        </Box>
      </Box>

      <DiscountDrawer headerTitle="Создать сотрудника">
        <CreateStaffForm />
      </DiscountDrawer>
    </Flex>
  );
};

export default UsersPage;
