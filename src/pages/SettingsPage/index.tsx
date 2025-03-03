import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/widgets/Sidebar";
import Navbar from "@/widgets/Navbar";

const SettingsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Flex>
      <Sidebar />

      <Box flex="1" ml="248px">
        <Navbar title="Настройки" buttonLabel="Выйти" onButtonClick={onOpen} />ы
        <Box flex="1" mt="64px">
          <Container maxW="container.xl" py="6">
          </Container>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Подтверждение</ModalHeader>
          <ModalBody>Вы уверены, что хотите выйти?</ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Отмена
            </Button>
            <Button colorScheme="red" onClick={handleLogout} ml={3}>
              Выйти
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default SettingsPage;
