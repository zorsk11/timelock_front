import SchedulesCard from "@/features/SchedulesCard/ui/SchedulesCard";
import Navbar from "@/widgets/Navbar";
import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import DiscountDrawer from "@/widgets/Drawer/index";
import Sidebar from "@/widgets/Sidebar";
// Импортируйте компонент, который хотите показать в дровере
import MyDrawerButton from "@/features/SchedulesCard/ui/MyButton";

const SchedulesPage: React.FC = () => {
  return (
    <Flex>
      <Sidebar />

      {/* Контент смещается вправо */}
      <Box flex="1" ml="248px">
        <Navbar title="Преподаватели" buttonLabel="Добавить" />
        <Box flex="1" mt="64px">
          <Container maxW="container.xl" py="6">
            <SchedulesCard />
          </Container>
        </Box>
      </Box>

      {/* Дровер с кастомным содержимым для страницы расписаний */}
      <DiscountDrawer headerTitle="Добавить расписание">
        <MyDrawerButton />
      </DiscountDrawer>
    </Flex>
  );
};

export default SchedulesPage;
