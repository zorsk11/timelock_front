// src/pages/SettingsPage/SettingsPage.tsx
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
import EmailCard from "@/features/SettingsCard/ui/SettingsCard";
import PhoneCard from "@/features/SettingsCard/ui/PhoneCard";

const SettingsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // Стейты для почты
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Стейты для телефона
  const [oldPhone, setOldPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // Загружаем текущие данные пользователя при монтировании
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Пример: получение текущего пользователя
    // (Путь /api/user/me — условный, замените на ваш реальный эндпоинт)
    fetch("http://localhost:8080/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Предположим, что сервер возвращает объект { email, phone, ... }
        setOldEmail(data.email);
        setOldPhone(data.phone);
      })
      .catch((err) => console.error("Ошибка при получении данных пользователя", err));
  }, []);

  // Логика выхода из системы
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Пользователь вышел из системы");
    onClose();
    navigate("/login");
  };

  // Сохранение новой почты
  const handleEmailSave = () => {
    const token = localStorage.getItem("token");
    fetch("/api/user/updateEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: newEmail }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Email updated", result);
        // Обновляем старое значение и очищаем поле для нового
        setOldEmail(newEmail);
        setNewEmail("");
      })
      .catch((err) => console.error("Ошибка при обновлении почты", err));
  };

  // Сохранение нового телефона
  const handlePhoneSave = () => {
    const token = localStorage.getItem("token");
    fetch("/api/user/updatePhone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ phone: newPhone }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Phone updated", result);
        // Обновляем старое значение и очищаем поле для нового
        setOldPhone(newPhone);
        setNewPhone("");
      })
      .catch((err) => console.error("Ошибка при обновлении телефона", err));
  };

  return (
    <Flex>
      <Sidebar />

      <Box flex="1" ml="248px">
        <Navbar title="Настройки" buttonLabel="Выйти" onButtonClick={onOpen} />

        <Box flex="1" mt="64px">
          <Container maxW="container.xl" py="6">
            {/* Размещаем две карточки рядом */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {/* Карточка изменения почты */}
              <EmailCard
                oldEmail={oldEmail}
                newEmail={newEmail}
                onNewEmailChange={setNewEmail}
                onSave={handleEmailSave}
              />

              {/* Карточка изменения телефона */}
              <PhoneCard
                oldPhone={oldPhone}
                newPhone={newPhone}
                onNewPhoneChange={setNewPhone}
                onSave={handlePhoneSave}
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
