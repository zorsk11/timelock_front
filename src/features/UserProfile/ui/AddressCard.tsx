import React from 'react';
import { Box, Flex, Button, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';

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

interface AddressCardProps {
  user: User;
}

const AddressCard: React.FC<AddressCardProps> = ({ user }) => {
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={cardBg} p={4} borderRadius="md">
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold">
          Место приживания
        </Text>
      </Flex>

      <Box mt={4}>
        <SimpleGrid columns={[1, 2]} spacing={4}>
          <Box>
            <Text fontWeight="semibold" fontSize="sm">
              Страна
            </Text>
            <Text fontSize="md">{user.country}</Text>
          </Box>
          <Box>
            <Text fontWeight="semibold" fontSize="sm">
              Город
            </Text>
            <Text fontSize="md">{user.city}</Text>
          </Box>
          <Box>
            <Text fontWeight="semibold" fontSize="sm">
                Адрес
            </Text>
            <Text fontSize="md">{user.address}</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AddressCard;
