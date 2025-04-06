import React, { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import Sidebar from "@/widgets/Sidebar";
import Navbar from "@/widgets/Navbar";
import EmailCard from "@/features/SettingsCard/ui/EmailCard";
import PhoneCard from "@/features/SettingsCard/ui/PhoneCard";
import { updateUserContact } from "@/features/UserRegistration/model/authSlice";

const SettingsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Извлекаем пользователя из состояния, чтобы показать текущую почту и телефон
  const user = useAppSelector((state) => state.auth.user);

  // Локальное состояние для редактирования значений
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleLogout = () => {
    navigate("/login");
  };

  // Функция обновления почты: отправляем новый email, оставляя текущий телефон без изменений
  const handleSaveEmail = () => {
    console.log("Сохранена почта:", newEmail);
    if (user) {
      dispatch(updateUserContact({ email: newEmail }));
    }
  };

  // Функция обновления телефона: отправляем новый телефон, оставляя текущую почту без изменений
  const handleSavePhone = () => {
    console.log("Сохранён телефон:", newPhone);
    if (user) {
      dispatch(updateUserContact({ phone: newPhone }));
    }
  };

  return (
    <Flex>
      <Sidebar />

      <Box flex="1" ml="248px">
        <Navbar title="Настройки" buttonLabel="Выйти" onButtonClick={onOpen} />
        <Box flex="1" mt="64px">
          <Container maxW="container.xl" py="6">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <EmailCard
                // Передаём текущую почту из Redux
                oldEmail={user ? user.email : ""}
                newEmail={newEmail}
                onNewEmailChange={setNewEmail}
                onSave={handleSaveEmail}
              />
              <PhoneCard
                oldPhone={user ? user.phone : ""}
                newPhone={newPhone}
                onNewPhoneChange={setNewPhone}
                onSave={handleSavePhone}
              />
            </SimpleGrid>
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
