import React from 'react';
import {
  Box,
  Flex,
  Text,
  Avatar,
  useColorModeValue
} from '@chakra-ui/react';

// Интерфейс для данных, необходимых в InfoForm
interface InfoFormUser {
  firstName: string;
  lastName: string;
  role: string;
  city: string;
  country: string;
  avatarUrl?: string;
}

interface InfoFormProps {
  user: InfoFormUser;
}

const InfoForm: React.FC<InfoFormProps> = ({ user }) => {
  // Цвет фона для карточки
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box>
 
      <Box bg={cardBg} p={6} borderRadius="md" >
        <Flex align="center">
          <Avatar
            size="xl"
            name={`${user.firstName} ${user.lastName}`}
            src={user.avatarUrl}
            mr={6}
          />
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              {user.firstName} {user.lastName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {user.role}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {user.city}, {user.country}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default InfoForm;
