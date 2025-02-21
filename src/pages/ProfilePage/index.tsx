import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import Navbar from "@/widgets/Navbar";
import Sidebar from "@/widgets/Sidebar";

const ProfilePage: React.FC = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" ml="248px">
        <Navbar title="Профиль" />
        <Box flex="1" mt="64px">
          <Container maxW="container.xl" py="6">
            <Box>
              аза черт 
            </Box>
          </Container>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
