import React, { useEffect } from "react";
import { Box, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { ExitIcon } from "@/shared/assets";
import { useLayout } from "@/shared/context/LayoutContext";

const SettingsPage: React.FC = () => {
  const { setTitle, setButtons } = useLayout();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    // Здесь можно добавить логику выхода из приложения, если потребуется.
    console.log("Пользователь вышел из системы");
    onClose();
  };

  useEffect(() => {
    setTitle("Настройки");
    setButtons(
      <Box>
        <Button rightIcon={<ExitIcon />} variant="navbar" onClick={onOpen}>
          Выйти
        </Button>
      </Box>
    );
  }, [setTitle, setButtons, onOpen]);

  return (
    <>
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
    </>
  );
};

export default SettingsPage;
