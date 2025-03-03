import React from 'react';
import { Box, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  country: string;
  city: string;
  address: string;
  accessRooms: string[];
  photos: string[];
}

interface PersonalInfoProps {
  user: User;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={cardBg} p={4} borderRadius="md"  mb={6}>
      <SimpleGrid columns={[1, 2]} spacing={4}>
        <Box>
          <Text fontWeight="semibold" fontSize="sm">
            Имя
          </Text>
          <Text fontSize="md">{user.firstName}</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold" fontSize="sm">
            Фамилия
          </Text>
          <Text fontSize="md">{user.lastName}</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold" fontSize="sm">
            Электронная почта
          </Text>
          <Text fontSize="md">{user.email}</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold" fontSize="sm">
            Номер телефона
          </Text>
          <Text fontSize="md">{user.phone}</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold" fontSize="sm">
            Роль
          </Text>
          <Text fontSize="md">{user.role}</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default PersonalInfo;
