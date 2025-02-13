import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { ExitIcon } from "@/shared/assets";
import Navbar from "@/widgets/Navbar/index";

const SettingsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Удаляем токен и, если нужно, сбрасываем глобальное состояние авторизации
    localStorage.removeItem("token");
    console.log("Пользователь вышел из системы");
    onClose();
    // Перенаправляем на страницу логина
    navigate("/login");
  };

  return (
    <>
      <Navbar
        title="Настройки"
        buttonLabel="Выйти"
        onButtonClick={onOpen}
      />

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
