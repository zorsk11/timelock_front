import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import  LogsCard  from '@/features/LogsForm/ui/LogsCard';
import DiscountDrawer from '@/widgets/Drawer';
import Navbar from '@/widgets/Navbar';
import Sidebar from '@/widgets/Sidebar';


const LogsPage: React.FC = () => {
  return (
    <Flex>
      <Sidebar />

      {/* Контент смещается вправо */}
      <Box flex="1" ml="248px">
        <Navbar title="Логи" />
        <Box flex="1" mt="64px">
          <Container maxW="container.xl" py="6">
            < LogsCard/>
          </Container>
        </Box>
      </Box>
    </Flex>
  );
};

export default LogsPage;
