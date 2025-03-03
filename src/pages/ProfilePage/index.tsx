import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/app/store";
import {
  Box,
  Container,
  Flex,
  Text,
  VStack // <-- Импортируем VStack
} from '@chakra-ui/react';
import Navbar from "@/widgets/Navbar";
import Sidebar from "@/widgets/Sidebar";

// Импорты наших карточек:
import InfoForm from '@/features/UserProfile/ui/InfoForm';
import PersonalInfo from '@/features/UserProfile/ui/PersonalInfo';
import AddressCard from '@/features/UserProfile/ui/AddressCard';

const ProfilePage: React.FC = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);

  let content;

  if (!authUser) {
    // Если пользователь не авторизован
    content = (
      <Box p={4}>
        <Text>Пожалуйста, авторизуйтесь, чтобы увидеть данные профиля.</Text>
      </Box>
    );
  } else {
    // Преобразуем данные из authUser под наши компоненты
    const userData = {
      id: authUser.id,
      firstName: authUser.FirstName,
      lastName: authUser.SecondName,
      email: authUser.email,
      phone: authUser.phone || 'Не указан',
      role: authUser.role || 'Пользователь',
      country: authUser.country || 'Не указан',
      city: authUser.city || 'Не указан',
      address: authUser.address || 'Не указан',
      accessRooms: authUser.accessRooms || [],
      photos:
        authUser.photos && authUser.photos.length > 0
          ? authUser.photos
          : ['https://via.placeholder.com/150'],
    };

    content = (
      <Box p={4}>
        {/* Вертикальный стек с отступом между элементами */}
        <VStack spacing={6} align="stretch">
          {/* Карточка «My Profile» с аватаром */}
          <InfoForm
            user={{
              firstName: userData.firstName,
              lastName: userData.lastName,
              role: userData.role,
              city: userData.city,
              country: userData.country,
              avatarUrl: userData.photos[0], // берём первое фото как аватар
            }}
          />

          {/* Карточка с личной информацией (имя, фамилия, e-mail, телефон, роль) */}
          <PersonalInfo user={userData} />

          {/* Карточка с адресом (страна, город, полный адрес) */}
          <AddressCard user={userData} />
        </VStack>
      </Box>
    );
  }

  return (
    <Flex>
      <Sidebar />
      <Box flex="1" ml="248px">
        <Navbar title="Профиль" />
        <Box flex="1" mt="64px">
          <Container maxW="container.xl" py="6">
            {content}
          </Container>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
